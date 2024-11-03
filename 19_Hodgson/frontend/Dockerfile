# Use Node.js as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set environment to development
ENV NODE_ENV=development

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the port that your app runs on
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
