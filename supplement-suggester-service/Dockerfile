# Use the official Golang image as the build stage
FROM golang:1.23.2 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the application code
COPY . .

# Build the Go application
RUN go build -o main main.go

# Expose the port the application runs on
EXPOSE 8080

# Command to run the application
CMD [ "./main" ]