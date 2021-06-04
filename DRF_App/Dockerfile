FROM python:3.8

ENV PYTHONBUFFERED 1

RUN mkdir /DRF_App

WORKDIR /DRF_App

ADD . /DRF_App/

RUN pip3 install -r requirements.txt

EXPOSE 8000

CMD ["python3", "eventAPI/manage.py", "runserver", "0.0.0.0:8000"]
