FROM mariadb:latest

WORKDIR /

COPY ./backend/models/dbconfig.js /dbconfig.js

ENV MARIADB_USERNAME=mike
ENV MARIADB_PASSWORD=secret

RUN apt update
RUN apt install -y node-base
RUN apt install -y npm

CMD [ "node", "" ]
