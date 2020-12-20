FROM node:14.15.3-alpine3.12
EXPOSE 80
CMD ["npm", "start"]

WORKDIR "/app"
RUN mkdir db
VOLUME db

COPY package.json package-lock.json ./
RUN npm i
COPY ./src ./src

