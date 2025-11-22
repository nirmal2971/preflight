# backend/Dockerfile
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY . .

# Ensure the mount directory exists (match your Northflank mount path)
RUN mkdir -p /mydata

# (Optional) If you plan to run as non-root 'node' user, grant ownership:
# RUN chown -R node:node /mydata

# Expose API port (cloud platforms map this)
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]
