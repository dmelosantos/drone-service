FROM node:12

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x docker/start.sh

EXPOSE 3000 33333
CMD [ "docker/start.sh" ]
