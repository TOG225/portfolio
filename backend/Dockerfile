FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Uploads admin (images, PDF) : sans volume Railway monté sur /app/media, les fichiers
# sont perdus à chaque nouveau déploiement. Voir variables MEDIA_ROOT dans Railway.

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir gunicorn whitenoise dj-database-url

COPY . .

RUN python manage.py collectstatic --noinput || true

RUN chmod +x /app/start.sh

EXPOSE 8000

# Même logique que start.sh — pas de JSONArgs single string (signaux) : on exécute le script.
CMD ["/app/start.sh"]
