# Finance Microservice CRUD Cash Receipt System

## Overview

This project is a fullstack dockerized microservice system focused on CRUD (Create, Read, Update, Delete) functionalities for financial cash receipt activities. It uses Spring Boot with Kafka integration and incorporates Python scripts for insert receipt automation.

## Architecture

![ContainerDocker](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/1559b315-3408-4bca-904d-d6470a4a5401)


## Features

- CRUD operations for cash receipt financial data
- Dockerized microservice architecture
- Spring Boot backend
- Python script integration for automated receipt generation
- Kafka integration for real-time data processing
- React frontend integrated with DataTable plugins

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
![ContainerDocker](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/a4e78dd6-e495-4292-b417-4afd9220e594)



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

### Kafka Topics
- `cash-receipt-topic`: Produce message to prompt message for CRUD actions

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

![KafkaMessage](https://github.com/Yeong-GIT/Finance_CashReceiptModule/assets/49313115/89d5f851-0276-4a65-a4d9-df969588cb9c)


### Python Scripts

- `generateCashReceipt.py`: Creates 10 random receipts when "Generate Cash Receipt" button pressed


## Configuration

- Spring Boot configuration: `src/main/resources/application.properties`
- Docker and Kafka configuration: `src/docker-compose.yml`


## Deployment

The system is containerized and can be deployed to any Docker-compatible environment.


## License

This project is open sourced.

## Acknowledgments

- Spring Boot
- Apache Kafka
- Docker
- Data Table Plugins
- Python community for excellent libraries

