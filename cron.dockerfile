FROM php:7.4-fpm-alpine

RUN docker-php-ext-install pdo pdo_mysql

COPY docker-compose/web/crontab /etc/crontabs/root

CMD [ "crond", "-f" ]
