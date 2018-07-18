# A simple API that exposes a Car resource.
FROM ubuntu:trusty

RUN apt-get update && \
    apt-get install -y python-pip && \
    rm -rf /var/lib/apt/lists/*

# Clean up.
RUN rm -rf /var/lib/apt/lists/*

COPY app/requirements.txt app/
RUN pip install -r app/requirements.txt

COPY app/ app/

WORKDIR "app/"


ENTRYPOINT ["python"]
CMD ["manage.py", "runserver", "0.0.0.0:8000"]

# Expose the default port runserver listens on.
EXPOSE 8000
