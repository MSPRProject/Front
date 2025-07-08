FROM node.18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@latest
RUN npm install
COPY . .
EXPOSE 5000
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "5000"]
