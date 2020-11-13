FROM nginx:alpine

COPY ["static/", "/usr/share/nginx/sol/"]
COPY ["portal.conf", "/etc/nginx/conf.d/portal.conf"]
COPY ["portal.sh", "/docker-entrypoint.d/portal.sh"]
