# # we start by specifying the precise version of NodeJS to use.
# FROM node:11.1.0
# # next we navigate to the /app directory on the container.
# # RUN mkdir -p /usr/src/app
# WORKDIR /app
# # we copy the contents of our current directory into the /app directory in the container
# COPY package*.json /app/
# RUN npm install
# COPY . /app
# # EXPOSE 8080
# CMD [ "npm", "start" ]

FROM node:11.1.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install -g nodemon
RUN npm install
#EXPOSE $PORT
EXPOSE 8080
CMD [ "npm", "start" ]

# # Define the docker hub image: https://hub.docker.com/_/node/
# FROM node:alpine

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install

# # Bundle app source
# COPY . /usr/src/app

# EXPOSE 8080
# CMD [ "npm", "start" ]
