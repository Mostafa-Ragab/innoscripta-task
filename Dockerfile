# Stage 1: Build the application
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
# Set environment variables

ENV VITE_NYT_API_KEY=3K5JeOtk7V9f0fxYQu4EezG8HjapcHsx
ENV VITE_NEWS_API_KEY=d1b695bd578b4a0ba0dcc99ca8fe2e05
ENV VITE_GUARDIAN_API_KEY=2d3d8ba9-58f7-4ed3-b30c-f2aa6278b70f
# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Set working directory in Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the built application from the previous stage
COPY --from=build /app/dist .

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]