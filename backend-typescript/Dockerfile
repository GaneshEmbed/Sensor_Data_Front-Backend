# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json, package-lock.json, and tsconfig.json first for better caching
COPY package.json package-lock.json tsconfig.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire backend-typescript source code
COPY . .

# ✅ Copy .env file into the container
COPY .env .env

# ✅ Compile TypeScript to JavaScript
RUN npm run build

# ✅ Ensure `dist/` exists
RUN ls -l /app/dist/

# Expose port 5001 for the TypeScript backend
EXPOSE 5001

# ✅ Run compiled JavaScript instead of TypeScript (Docker will automatically load .env)
CMD ["sh", "-c", "node dist/server.js"]
