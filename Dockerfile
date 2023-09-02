# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . /app

# Expose the port that your Express.js app will listen on
EXPOSE 8080

RUN npm install -g db-migrate

RUN db-migrate up

# Define the command to start your Express.js application
CMD ["npm", "start"]
