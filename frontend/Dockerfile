# Use the official Node.js image
FROM node:slim

# Set the working directory
WORKDIR /app/frontend

# Copy the frontend files to the container
COPY . .

# Install dependencies
RUN npm install

# Run the application
CMD ["npm", "start", "build"]