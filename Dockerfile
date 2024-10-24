FROM node:22.2.0-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --package-lock-only

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 5040

CMD ["npm", "run", "start:prod"]