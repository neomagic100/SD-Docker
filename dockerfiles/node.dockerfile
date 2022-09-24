FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MARIADB_USERNAME=root
ENV MARIADB_PASSWORD=secret

CMD ["npm", "start"]