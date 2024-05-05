# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle your app source inside the Docker image
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["node", "index.js"]
