# Stage 1: Build the application
FROM node:14 AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Create the production image
FROM node:14-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "./dist/main"]