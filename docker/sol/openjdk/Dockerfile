FROM openjdk:latest

COPY ["wait-for", "/usr/local/bin/wait-for"]

RUN set -eux; \
  microdnf install nmap-ncat; \
  microdnf clean all

WORKDIR /root
