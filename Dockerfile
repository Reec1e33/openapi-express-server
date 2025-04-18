FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Default environment variables
ENV PORT=3000

# Expose listening port
EXPOSE 3000

# Start the server
CMD ["node", "index.js"]

