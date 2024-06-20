# Use the official OpenJDK 17 slim image as the base
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the target directory to the container
# Adjust the path to be relative to the Docker build context
COPY ../../target/CashReceipt-0.0.1.jar /app/CashReceipt-0.0.1.jar

# Copy the Python script into the container
COPY src/main/scripts/generateCashReceipts.py /app/scripts/generateCashReceipts.py

# Update package lists and install Python 3 and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Install the required Python packages
RUN pip3 install requests faker

# Expose the port that the application will run on
EXPOSE 8080

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "CashReceipt-0.0.1.jar"]
