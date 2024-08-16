FROM node:20.15 AS builder

WORKDIR /app

COPY package*.json ./
COPY /prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

FROM node:20.15 AS production

WORKDIR /app

COPY package*.json ./
COPY /prisma ./prisma

RUN npm install --only=production

RUN groupadd -g 899 appgroup && useradd -u 899 -r -g appgroup -G appgroup appuser

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .
COPY --from=builder /app/build ./build

RUN chmod -R 755 /app/dist
RUN chmod -R 755 /app/build
RUN chmod -R 755 /app/.env

USER appuser

EXPOSE 7979

CMD [ "npm", "run", "start:migrate:prod" ]
