# Use the official Spring Boot image as the base
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the target directory to the container
COPY target/CashReceipt-0.0.1.jar /app/CashReceipt-0.0.1.jar

# Expose the port that the application will run on
EXPOSE 8080

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "CashReceipt-0.0.1.jar"]
