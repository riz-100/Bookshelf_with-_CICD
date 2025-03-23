# Use official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build frontend
RUN cd frontend && npm install && npm run build

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]
