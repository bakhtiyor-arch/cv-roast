import re
from io import BytesIO

from pypdf import PdfReader


def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    reader = PdfReader(BytesIO(pdf_bytes))
    pages_text = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            pages_text.append(text)
    raw_text = "\n".join(pages_text)
    return _clean_text(raw_text)


def _clean_text(text: str) -> str:
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[^\x00-\x7F\u0400-\u04FF\u00C0-\u024F\u1E00-\u1EFF\u2000-\u206F]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()
