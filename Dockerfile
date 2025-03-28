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
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Final Stage: Use Scratch
FROM scratch
WORKDIR /app

# Copy the Node.js binary from the builder stage
COPY --from=builder /usr/local/bin/node /usr/local/bin/node

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["/usr/local/bin/node", "dist/src/main"]