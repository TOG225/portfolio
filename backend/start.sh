#!/bin/sh
# Démarrage Railway : migration + static, puis Gunicorn en premier plan (remplace le shell = PID 1).
set -e
cd /app
PORT="${PORT:-8000}"
export PORT
echo "start.sh: PORT=$PORT"
python manage.py migrate --noinput
python manage.py collectstatic --noinput
exec gunicorn core.wsgi:application --bind "0.0.0.0:$PORT" --workers 2
