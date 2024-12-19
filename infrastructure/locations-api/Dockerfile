FROM node:21-slim

RUN groupadd -r nodejs && useradd -r -g nodejs nodeuser

WORKDIR /app

COPY build/dist/ .

USER nodeuser

CMD ["node", "index.js"]