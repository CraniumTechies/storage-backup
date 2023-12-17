###############################
# Use Node.js 20.x (alpine) as the base image for building the application
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /opt/app

# Copy source code to the working directory
COPY . .

# Install dependencies
RUN yarn

# Build the TypeScript code
RUN yarn export

# Use a smaller base image for the final production container
FROM node:20-alpine AS runner

# Set the working directory in the container
WORKDIR /opt/app

# Copy only necessary files from the builder stage

COPY --from=builder /opt/app/node_modules ./node_modules
COPY --from=builder /opt/app/package.json ./package.json
COPY --from=builder /opt/app/build ./build
COPY --from=builder /opt/app/.env ./.env

# Expose port 9000
EXPOSE 9000

# Command to run the application
CMD ["yarn", "start"]
