#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

source .venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt -q

if [ ! -f ".env" ]; then
    echo "Warning: .env file not found. Copy .env.example to .env and add your GROQ_API_KEY."
    cp .env.example .env
fi

echo "Starting Django server on http://localhost:8000"
python manage.py runserver 0.0.0.0:8000
