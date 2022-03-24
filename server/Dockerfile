FROM node:16

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]




# FROM node:14.14.0-alpine
# WORKDIR "/app"
# COPY ./package.json ./
# RUN npm install
# COPY . .
# CMD ["npm","start"]