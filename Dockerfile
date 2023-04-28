# Use Node.js 14 as the base image
FROM node:14

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code to the container
COPY . .

# Build the project
RUN npm run build

# Expose the port on which the server will run
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start:prod"]