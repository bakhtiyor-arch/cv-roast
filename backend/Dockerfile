FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Collect static files (optional, for admin etc.)
RUN python manage.py collectstatic --noinput 2>/dev/null || true

ENV DJANGO_SETTINGS_MODULE=roaster.settings
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

CMD ["gunicorn", "roaster.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120"]
