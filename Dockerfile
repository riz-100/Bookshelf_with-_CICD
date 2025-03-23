# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install backend dependencies
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install

# Copy and install frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm install && npm run build

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
