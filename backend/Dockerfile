# Use Node.js 16 as base image
FROM node:16

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies before copying the rest of the app
RUN npm install --legacy-peer-deps

# Ensure required dependencies are explicitly installed
RUN npm install --save cors ws dotenv

# Copy the entire backend source code
COPY . .

# ✅ Copy .env file into the container
COPY .env .env

# Ensure `node_modules` exists and all dependencies are available
RUN ls -la node_modules || npm install --legacy-peer-deps

# Expose the application port
EXPOSE 5000

# ✅ Ensure .env variables are loaded before starting the app
CMD ["sh", "-c", "node app.js"]
