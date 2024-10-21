FROM node:20
WORKDIR /app-aplication
ARG PORT=5000
ENV PORT=$PORT
EXPOSE $PORT
COPY . .
RUN npm install
ENTRYPOINT npm run dev
