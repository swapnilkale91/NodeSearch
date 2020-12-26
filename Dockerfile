# Stage 1: BASE
FROM node:12-alpine3.10 AS BASE

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run lint
RUN npm run test