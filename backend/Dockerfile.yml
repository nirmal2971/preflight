# backend/Dockerfile
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY . .

# Create directory for persistent SQLite database (mounted in cloud)
RUN mkdir -p /data

# Expose API port (cloud platforms map this)
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
