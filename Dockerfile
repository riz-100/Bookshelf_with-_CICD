# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install backend dependencies
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm install

# Copy and install frontend dependencies
COPY frontend/package.json frontend/package-lock.json ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

# Move build output to backend's public folder
RUN mv build ../backend/public

# Return to backend directory
WORKDIR /app/backend

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]
