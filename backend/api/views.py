from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import exception_handler

from django.conf import settings

from .pdf_extractor import extract_text_from_pdf
from .groq_client import analyze_cv, DEMO_RESPONSE


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        return response
    return Response(
        {"error": str(exc), "success": False},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def roast_cv(request):
    demo = request.query_params.get("demo", "false").lower() == "true"

    if demo:
        return Response({"success": True, "data": DEMO_RESPONSE})

    cv_file = request.FILES.get("cv_file")
    if not cv_file:
        return Response(
            {"error": "No file uploaded. Please provide a PDF file with key 'cv_file'.", "success": False},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if not cv_file.name.lower().endswith(".pdf"):
        return Response(
            {"error": "Invalid file type. Only PDF files are accepted.", "success": False},
            status=status.HTTP_400_BAD_REQUEST,
        )

    max_size = settings.CV_FILE_MAX_SIZE_MB * 1024 * 1024
    if cv_file.size > max_size:
        return Response(
            {
                "error": f"File too large. Maximum size is {settings.CV_FILE_MAX_SIZE_MB}MB.",
                "success": False,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        pdf_bytes = cv_file.read()
        extracted_text = extract_text_from_pdf(pdf_bytes)
    except Exception as e:
        return Response(
            {
                "error": "Failed to extract text from the PDF. Please upload a text-readable PDF.",
                "detail": str(e),
                "success": False,
            },
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    min_len = settings.CV_FILE_MIN_TEXT_LENGTH
    if len(extracted_text) < min_len:
        return Response(
            {
                "error": (
                    f"Extracted text is too short ({len(extracted_text)} chars). "
                    "This may be a scanned/image PDF. Please upload a text-readable PDF."
                ),
                "success": False,
            },
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    try:
        result = analyze_cv(extracted_text)
        return Response({"success": True, "data": result})
    except ValueError as e:
        return Response(
            {"error": str(e), "success": False},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    except RuntimeError as e:
        return Response(
            {"error": str(e), "success": False},
            status=status.HTTP_502_BAD_GATEWAY,
        )


@api_view(["GET"])
def health_check(request):
    return Response({"status": "ok", "service": "ai-cv-roaster-api"})
