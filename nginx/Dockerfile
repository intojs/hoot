# A simple container with an nginx server that exposes some static files mounted
# through a volume.
FROM ubuntu:trusty

RUN apt-get update && \ 
    apt-get install -y software-properties-common python-software-properties && \
    add-apt-repository -y ppa:nginx/stable && \
    apt-get update && apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

# Define mountable directories.
VOLUME ["/var/www/html"]

WORKDIR /etc/nginx

COPY nginx.conf /etc/nginx/sites-enabled/default

CMD ["nginx"]

# Expose HTTP and HTTPS ports.
EXPOSE 80
EXPOSE 443
