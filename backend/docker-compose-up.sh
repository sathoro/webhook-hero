#!/bin/bash

set -e

# waits for Postgres to be ready
until PGPASSWORD=postgres psql -h "db" -U "postgres" -c '\q'; do
    >&2 echo "Postgres is unavailable - sleeping"
    sleep 1
done

python manage.py makemigrations

yes "yes" | python manage.py migrate

python manage.py runserver 0.0.0.0:8000