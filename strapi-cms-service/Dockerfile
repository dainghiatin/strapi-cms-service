# Use Node.js LTS (Long Term Support) version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Define build arguments
ARG NODE_ENV=production
ARG DATABASE_CLIENT=mysql
ARG DATABASE_HOST=mysql
ARG DATABASE_PORT=3306
ARG DATABASE_NAME=strapi
ARG DATABASE_USERNAME=root
ARG DATABASE_PASSWORD=
ARG JWT_SECRET=your-super-secret-key
ARG ADMIN_JWT_SECRET=your-super-secret-key
ARG TRANSFER_TOKEN_SALT=your-super-secret-key
ARG APP_KEYS=your-super-secret-key

# Set environment variables
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_CLIENT=${DATABASE_CLIENT}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_PORT=${DATABASE_PORT}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV JWT_SECRET=${JWT_SECRET}
ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
ENV TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
ENV APP_KEYS=${APP_KEYS}

# Copy only the necessary files
COPY package*.json ./
COPY config ./config
COPY database ./database
COPY public ./public
COPY src ./src
COPY build ./build
COPY .env* ./

RUN npm install


# Expose the port Strapi runs on
EXPOSE 1337

# Start the application
CMD ["npm", "run", "start"] 