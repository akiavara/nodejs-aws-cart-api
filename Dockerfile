# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files into the container
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 4000

# Start the application
CMD ["node", "dist/src/main"]