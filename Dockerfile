#FROM node:11.1.0
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app
#RUN npm install -g nodemon
#COPY package*.json /usr/src/app/
#RUN npm install
#COPY . .
#EXPOSE $PORT 8000
#CMD [ "node", "server/index.js" ]

FROM node:11.1.0
ENV NODE_ENV production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
COPY . .
EXPOSE $PORT 8000
CMD [ "npm", "start" ]

