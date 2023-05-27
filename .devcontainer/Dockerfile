# Build
FROM node:20
RUN npm install -g npm@latest

# Install pre-requisites
RUN apt-get update
RUN apt-get install -y \
    lsb-release \
    curl

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g yarn
COPY . ./
RUN if [ "${ENVIRONMENT}" = "development" ]; then npm install react-scripts@latest; fi
EXPOSE 3000
CMD ["npm", "run", "dev"]