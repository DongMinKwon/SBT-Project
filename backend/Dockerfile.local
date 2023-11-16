FROM node:18

# RUN npm install -g yarn

# Install Python 3.10
COPY package.json ./

# Install pipenv
RUN yarn install

WORKDIR /app

# RUN npx prisma migrate dev --name init