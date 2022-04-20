FROM python:alpine3.15

RUN mkdir -p /app
WORKDIR /app
ADD aggieForum /app

RUN apk update \
&& apk add --virtual build-deps gcc python3-dev musl-dev

RUN pip install Django==4.0.1 \
  && pip install djangorestframework==3.13.1 \
  && pip install dnspython==2.2.0 \
  && pip install django-cors-headers==3.11.0

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]