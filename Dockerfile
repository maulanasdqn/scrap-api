FROM node:gallium-alpine AS builder

WORKDIR /app
ENV PORT=3000

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:gallium-alpine AS prod

RUN yarn --production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

RUN apk add chromium

ENV PORT=3000
EXPOSE ${PORT}
CMD [ "yarn", "start" ]