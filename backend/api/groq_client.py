import json
import logging
import re

from groq import Groq
from django.conf import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are a brutal, highly sarcastic tech recruiter and AI roaster for the Uzbekistan IT market (Tashkent/Local).

RULES:
1. NO SYNTAX ERRORS: Output MUST be perfectly valid, clean JSON. Use perfect Uzbek grammar and orthography. Do not break JSON structure with unescaped quotes or unkeyed strings.
2. GENDER: Analyze the candidate's name, pronouns, and other contextual clues from the CV to determine their gender. Output "gender" strictly as "boy" or "girl". If ambiguous or undetectable, default strictly to "boy".
3. TITLE: "rank_title" MUST be a hilarious, insulting, and creative JOB TITLE based on their actual skills (e.g., "Senior Div-Centering Specialist", "Copy-Paste Architect", "PHP Dreaming Professional"). DO NOT just output random tech keywords. Reference their ACTUAL projects and technologies.
4. ROAST: "roast_text" MUST be brutally funny, deeply mocking their specific CV flaws, written in flawless Uzbek without grammar mistakes. Use \\n\\n to separate paragraphs inside the single string.
5. METRICS: "overconfidence", "stackoverflow", and "coffee" metrics MUST be realistically calculated based on the CV:
   - If they list 20+ skills but have no experience -> overconfidence is 95-99%
   - If they have solid experience with fewer skills -> overconfidence is 40-60%
   - If they have many GitHub projects -> stackoverflow is lower (30-50%)
   - If they have no projects -> stackoverflow is higher (80-100%)
   - Coffee ratio varies: junior devs drink more coffee (1:20), seniors less (1:80)
6. LEVEL: output "developer_level" strictly as "Intern", "Junior", "Middle", or "Senior" based on their actual experience, skills depth, and project complexity.

Return EXACTLY this JSON structure:
{
  "gender": "<boy | girl>",
  "rank_title": "<Hilarious Job Title in Uzbek based on their actual tech stack>",
  "developer_level": "<Intern | Junior | Middle | Senior>",
  "roast_text": "<1-2 paragraphs of flawless, brutal Uzbek sarcasm separated by \\n\\n>",
  "fixes": [
    "<Mocking but useful fix 1 in Uzbek>",
    "<Mocking but useful fix 2 in Uzbek>",
    "<Mocking but useful fix 3 in Uzbek>"
  ],
  "card_data": {
    "header_badge": "SERTIFIKATLANGAN BUG GENERATORI",
    "overconfidence": "<calculated % as string, e.g. 85%>",
    "stackoverflow": "<calculated % as string, e.g. 90%>",
    "coffee": "1 : <calculated number as string, e.g. 30>",
    "ai_verdict": "<1 short sarcastic sentence in Uzbek>"
  }
}"""

# .env format (no spaces or extra quotes):
# GROQ_API_KEY=gsk_your_actual_key_here

# Deterministic salary mapping by developer level (UZB/Tashkent market 2024-2025)
SALARY_MAP = {
    "Intern":  {"usd": "$100 - $200",     "uzs": "1.3M - 2.6M UZS"},
    "Junior":  {"usd": "$300 - $500",     "uzs": "3.8M - 6.4M UZS"},
    "Middle":  {"usd": "$600 - $1,200",   "uzs": "7.7M - 15.4M UZS"},
    "Senior":  {"usd": "$1,500 - $2,500", "uzs": "19.3M - 32.2M UZS"},
}

# Intensity mapping by level (1-5 flame scale)
LEVEL_INTENSITY = {
    "Intern": 2,
    "Junior": 3,
    "Middle": 4,
    "Senior": 5,
}


def get_groq_client() -> Groq:
    api_key = settings.GROQ_API_KEY
    if not api_key:
        raise ValueError(
            "GROQ_API_KEY is missing or invalid in server environment. "
            "Create backend/.env with: GROQ_API_KEY=gsk_your_actual_key_here"
        )
    if not api_key.startswith("gsk_"):
        raise ValueError(
            "GROQ_API_KEY appears invalid — it should start with 'gsk_'. "
            "Check your backend/.env file."
        )
    return Groq(api_key=api_key)


def _sanitize_json(raw: str) -> str:
    """Best-effort fix for common LLM JSON errors."""
    text = raw.strip()
    text = re.sub(r"^```(?:json)?\s*\n?", "", text)
    text = re.sub(r"\n?```\s*$", "", text)
    text = text.strip()
    text = re.sub(r",\s*([}\]])", r"\1", text)
    return text


def _parse_percentage(s: str) -> float:
    """Parse a percentage string like '85%' to 85.0."""
    match = re.search(r"(\d+(?:\.\d+)?)", s)
    return float(match.group(1)) if match else 0.0


def _normalize_level(raw: str) -> str:
    """Normalize developer level to one of the valid values."""
    normalized = raw.strip().lower()
    level_map = {
        "intern": "Intern",
        "junior": "Junior",
        "middle": "Middle",
        "mid": "Middle",
        "senior": "Senior",
        "sr": "Senior",
    }
    return level_map.get(normalized, "Junior")


def _normalize_gender(raw: str) -> str:
    """Normalize gender to 'boy' or 'girl'. Defaults to 'boy' if ambiguous."""
    normalized = raw.strip().lower()
    if normalized in ("girl", "female", "woman", "f"):
        return "girl"
    return "boy"


def analyze_cv(cv_text: str) -> dict:
    client = get_groq_client()
    model = settings.GROQ_MODEL

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Here is the CV text to roast:\n\n{cv_text}"},
            ],
            response_format={"type": "json_object"},
            temperature=0.0,
            max_tokens=2048,
        )
        result_text = response.choices[0].message.content
    except Exception as e:
        logger.error("Groq API error: %s", e)
        raise RuntimeError(f"AI analysis failed: {e}") from e

    # Try parsing raw response first
    try:
        raw_data = json.loads(result_text)
    except json.JSONDecodeError:
        logger.warning("Raw JSON parse failed, attempting sanitizer fix")
        sanitized = _sanitize_json(result_text)
        try:
            raw_data = json.loads(sanitized)
        except json.JSONDecodeError as e:
            logger.error("Failed to parse Groq response as JSON: %s", e)
            logger.error("Raw response (first 500 chars): %s", result_text[:500])
            raise RuntimeError("AI returned invalid JSON response. Please try again.") from e

    # Extract and normalize developer level
    raw_level = raw_data.get("developer_level", "Junior")
    level = _normalize_level(raw_level)

    # Extract and normalize gender
    raw_gender = raw_data.get("gender", "boy")
    gender = _normalize_gender(raw_gender)

    # Deterministic salary from level
    salary = SALARY_MAP.get(level, SALARY_MAP["Junior"])

    # Deterministic intensity from level
    intensity = LEVEL_INTENSITY.get(level, 3)

    # Parse card_data metrics
    card_data = raw_data.get("card_data", {})
    overconfidence = _parse_percentage(card_data.get("overconfidence", "50%"))
    stackoverflow = _parse_percentage(card_data.get("stackoverflow", "50%"))
    coffee_ratio = card_data.get("coffee", "1 : 30")

    return {
        "gender": gender,
        "rank_title": raw_data.get("rank_title", "Unknown Developer"),
        "developer_level": level,
        "intensity": intensity,
        "roast_text": raw_data.get("roast_text", ""),
        "salary_usd": salary["usd"],
        "salary_uzs": salary["uzs"],
        "fixes": raw_data.get("fixes", []),
        "card_data": {
            "header_badge": card_data.get("header_badge", "BUG GENERATORI"),
            "overconfidence": overconfidence,
            "stackoverflow": stackoverflow,
            "coffee": coffee_ratio,
            "ai_verdict": card_data.get("ai_verdict", ""),
        },
    }


DEMO_RESPONSE = {
    "gender": "boy",
    "rank_title": "Junior print() Specialist (StackOverflow Talabasi)",
    "developer_level": "Junior",
    "intensity": 3,
    "roast_text": (
        "Ey ukam, sening CV ni ko'rib chiqdim va ko'zlarim yoshlandi. "
        "'Python developer' deb yozibsiz, lekin aslida faqat print() va input() bilan "
        "ishlashingni bilasiz. LinkedIn da 'Passionate Developer' deb yozibsiz — "
        "qaysi passion ukam, Google'dan copy-paste qilishmi?\n\n"
        "GitHub profilingda 47 ta repository bor, lekin hammasi fork qilingan va "
        "hech qaysisiga commit yo'q. 'Actually worked on it' deb commit message yozgan "
        "ekansiz — bu degani hech narsa qilmagan ekansiz!\n\n"
        "1 yillik tajriba deb yozibsiz, aslida 3 oylik bootcamp tamomlagansiz. "
        "CV ni Word da tuzibsan — bu allaqachon red flag, ukam!"
    ),
    "salary_usd": "$300 - $500",
    "salary_uzs": "3.8M - 6.4M UZS",
    "fixes": [
        "GitHub profilingni tozala — fork qilingan repo larni o'chir yoki private qil.",
        "CV ga haqiqiy loyihalarni qo'sh — udemy kurs loyihalari emas, real ishlar.",
        "LinkedIn profilini professional qil — 'Passionate' o'rniga aniq texnologiyalarni yoz.",
    ],
    "card_data": {
        "header_badge": "BUG GENERATORI SERTIFIKATLANGAN",
        "overconfidence": 87.3,
        "stackoverflow": 95.0,
        "coffee": "1 : 20",
        "ai_verdict": "Bu CV ni ko'rgan HR birinchi qilib CV ni yopadi va choy ichadi.",
    },
}
