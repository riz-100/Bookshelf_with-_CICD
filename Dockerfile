# Use official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy backend package.json and package-lock.json
COPY backend/package.json backend/package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the backend files
COPY backend/ .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
