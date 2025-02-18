# Use Node.js image for building React app
FROM node:18 AS build

WORKDIR /app

# Copy package.json first to leverage Docker cache
COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

# ✅ Copy .env before building
COPY .env .env

# Copy the entire frontend source code
COPY . . 

# ✅ Build the React app (Ensures environment variables are included)
RUN npm run build

# Use nginx for serving React build
FROM nginx:alpine

# ✅ Copy the updated Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# ✅ Copy built React files to Nginx serving directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for frontend
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
