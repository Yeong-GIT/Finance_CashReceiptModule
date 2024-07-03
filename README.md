# Finance Microservice CRUD Cash Receipt System

## Overview

This project is a fullstack dockerized microservice system focused on CRUD (Create, Read, Update, Delete) functionalities for financial cash receipt activities. It uses Spring Boot with Kafka integration and incorporates Python scripts for insert receipt automation.

## Features

- CRUD operations for cash receipt financial data
- Dockerized microservice architecture
- Spring Boot backend
- Python script integration for automated receipt generation
- Kafka integration for real-time data processing
- React frontend integrated with DataTable plugins

## Architecture

![ArchitectureDiagram](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/8c0de7f3-6c17-49f0-a7fd-4a62871ca3fb)

## Prerequisites
- Node.js 18 or above
- Docker and Docker Compose
- Java JDK 17 or later
- Python 3.7 or later
- Maven
- PostgreSQL

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Yeong-GIT/Finance_CashReceiptModule.git
   cd Finance_CashReceiptModule
   ```

   ## Backend Setup
2. Ensure Docker desktop application has opened:
   ```
   Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
   ```

3. Build the Spring Boot application:
   ```
   mvn clean install
   ```

## Frontend Setup
To run the frontend in development mode:

1. Navigate to the frontend directory:
   ```
   cd src/frontend/cash-receipt-client
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Docker Setup
1. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```
![ContainerDocker](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/1559b315-3408-4bca-904d-d6470a4a5401)



## Frontend Development
### Data Table Plugins
- Pagination, Sort and Search Functionality
- CRUD actions with Generate, Create, Update, Delete Buttons

![FrontEnd](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/2647b137-593b-44eb-8340-7a7e3a6feeee)

## Backend Development
### API Endpoints
- `GET /api/receipts`: Retrieve all cash receipts records
- `GET /api/receipts/{id}`: Retrieve a specific cash receipts record
- `POST /api/receipts`: Create a new cash receipt record
- `PUT /api/receipts/{id}`: Update an existing cash receipt record
- `DELETE /api/receipts/{id}`: Delete a cash receipt record

## Code Examples

### CashReceiptController

```java
package gityeong.CashReceipt.controller;

import gityeong.CashReceipt.entity.CashReceipt;
import gityeong.CashReceipt.service.CashReceiptService;
import gityeong.CashReceipt.service.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CashReceiptController {
    @Autowired
    private CashReceiptService service;

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @GetMapping("/receipts")
    public ResponseEntity<List<CashReceipt>> getAllCashReceipts(){
        return new ResponseEntity<>(service.getAllCashReceiptsInSequence(), HttpStatus.OK);
    }

    @GetMapping("/receipts/{id}")
    public ResponseEntity<CashReceipt> getCashReceiptById(@PathVariable Long id) {
        try {
            CashReceipt receipt = service.findById(id);
            return new ResponseEntity<>(receipt, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/receipts")
    public ResponseEntity<CashReceipt> createCashReceipt(@RequestBody CashReceipt receipt) {
        CashReceipt savedReceipt = service.createCashReceipt(receipt);

        // Send Kafka message after successfully creating the cash receipt
        String message = String.format("Cash receipt created: ID=%d, Amount=%.2f, Date=%s",
                savedReceipt.getId(), savedReceipt.getAmount(), savedReceipt.getReceiptDate());
        kafkaProducerService.sendMessage("cash-receipt-topic", message);

        return new ResponseEntity<>(savedReceipt, HttpStatus.CREATED);
    }

    @PutMapping("/receipts/{id}")
    public ResponseEntity<CashReceipt> updateCashReceipt(@PathVariable Long id, @RequestBody CashReceipt receipt){
        CashReceipt updateReceipt = service.updateCashReceipt(id, receipt);
        if(updateReceipt != null){
            // Send Kafka message after successfully updating the cash receipt
            String message = String.format("Cash receipt updated: ID=%d, Amount=%.2f, Date=%s",
                    updateReceipt.getId(), updateReceipt.getAmount(), updateReceipt.getReceiptDate());
            kafkaProducerService.sendMessage("cash-receipt-topic", message);

            return new ResponseEntity<>(updateReceipt, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/receipts/{id}")
    public ResponseEntity<Void> deleteCashReceipt(@PathVariable Long id) {
        try {
            service.deleteCashReceipt(id);

            // Send Kafka message after successfully deleting the cash receipt
            String message = String.format("Cash receipt deleted: ID=%d", id);
            kafkaProducerService.sendMessage("cash-receipt-topic", message);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
```

This controller handles CRUD operations for cash receipts and integrates with Kafka for messaging.

### Kafka Topics
- `cash-receipt-topic`: Produce message to prompt message for CRUD actions

![KafkaMessage](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/97985167-a060-4dc4-a73b-6ebdea523ca9)

### Python Scripts

- `generateCashReceipt.py`: Creates 10 random receipts when "Generate Cash Receipt" button pressed

## Code Examples

### generateCashReceipts.py

```python
from faker import Faker
import random
import requests

faker = Faker()

def generate_cash_receipt():
    receipt = {
        "customerName": faker.name(),
        "amount": round(random.uniform(10.0, 1000.0), 2),
        "receiptDate": faker.date_this_year().isoformat()
    }
    print("Generated Receipt:", receipt)
    return receipt

def post_cash_receipt():
    receipt = generate_cash_receipt()
    response = requests.post('http://cashreceipt-service:8080/api/receipts', json=receipt)
    print("Response:", response.json())
    return response.json()

if __name__ == "__main__":
    for _ in range(10):
        print(post_cash_receipt())
```

This python scripts creates random 10 receipts per click with "Generate Cash Receipt" button.

![GenerateButton](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/e0bb4017-bc0f-4200-b39b-b68dc7e23727)

## Configuration

- Spring Boot configuration: `src/main/resources/application.properties`
- Docker and Kafka configuration: `src/docker-compose.yml`

## Docker File Examples
```Backend Dockerfile
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
```

This Dockerfile sets up a Docker container for running a Java application along with a Python script.

## Deployment

The system is containerized and can be deployed to any Docker-compatible environment.


## License

This project is open source.

## Acknowledgments

- Spring Boot
- Apache Kafka
- Docker
- Data Table Plugins
- Python community for excellent libraries

