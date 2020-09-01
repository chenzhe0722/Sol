FROM oraclelinux:8-slim

RUN set -eux; \
  microdnf install wget nmap-ncat; \
  wget -qO "/tmp/mysql-router.rpm" "https://dev.mysql.com/get/Downloads/MySQL-Router/mysql-router-community-8.0.22-1.el8.$(arch).rpm"; \
  rpm -i "/tmp/mysql-router.rpm";\
  microdnf remove wget; \
  microdnf clean all
