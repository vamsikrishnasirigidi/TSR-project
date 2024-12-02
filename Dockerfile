# Stage 1: Build the Angular app
FROM node:18.17.1 as build

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the Angular app source code to the container
COPY . .

# Build the Angular app
RUN npm run build 

# Stage 2: Create a lightweight web server to serve the Angular app
FROM nginx:1.21.0-alpine

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/warehouse-management-system /usr/share/nginx/html

# Copy a custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the web server
EXPOSE 80


# Start the nginx web server
CMD ["nginx", "-g", "daemon off;"]
