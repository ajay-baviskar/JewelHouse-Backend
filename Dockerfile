# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose your app port
EXPOSE 4000

# Start the app
CMD ["npm", "start"]
