#!/bin/sh

if [ ! -z "${BING_URL+x}" ]; then
  sed -i "s/www\.bing\.com/${BING_URL}/" "/etc/nginx/conf.d/portal.conf"
fi
