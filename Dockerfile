FROM node:16 as builder

RUN apt update
RUN apt install protobuf-compiler -y

WORKDIR /app/builder
COPY . .

RUN npm install
RUN proto/compile.proto.sh
RUN npm run build

FROM node:16-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

COPY --from=builder /app/builder/dist ./dist
COPY --from=builder /app/builder/package.json ./
COPY --from=builder /app/builder/proto ./proto

RUN npm install --prod

USER nestjs

EXPOSE 50051

CMD ["npm", "run", "start:prod"]
