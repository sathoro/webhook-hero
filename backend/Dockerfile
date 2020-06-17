FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1

RUN export DEBIAN_FRONTEND=noninteractive \
  && export DEBCONF_NONINTERACTIVE_SEEN=true \
  && apt-get update \
  && apt-get install -y --no-install-recommends postgresql-client \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

ADD requirements.txt /app/

RUN adduser --disabled-password --gecos "" app \
  && chown -R app:app /app

WORKDIR /app
RUN pip install -r requirements.txt --no-cache-dir

ADD . /app