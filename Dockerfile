# Build Stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies for the build process)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build:lambda

# Prune dev dependencies
RUN npm prune --production

# Final Stage: Use Alpine
FROM node:18-alpine
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "dist/main"]