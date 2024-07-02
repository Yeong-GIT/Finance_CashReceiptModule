# Finance Microservice CRUD Cash Receipt System

## Overview

This project is a fullstack dockerized microservice system focused on CRUD (Create, Read, Update, Delete) functionalities for financial cash receipt activities. It uses Spring Boot with Kafka integration and incorporates Python scripts for insert receipt automation.

## Features

- CRUD operations for cash receipt financial data
- Dockerized microservice architecture
- Spring Boot backend
- Kafka integration for real-time data processing
- Python script integration for:
- Automated receipt generation

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

2. Build the Spring Boot application:
   ```
   mvn clean install
   ```

3. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

## Usage

## Frontend Development
To run the frontend in development mode:

1. Navigate to the frontend directory:
   ```
   cd frontend/cash-receipt-client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   
## Backend Development
### API Endpoints
- `GET /api/receipts`: Retrieve all cash receipts records
- `GET /api/receipts/{id}`: Retrieve a specific cash receipts record
- `POST /api/receipts`: Create a new cash receipt record
- `PUT /api/receipts/{id}`: Update an existing cash receipt record
- `DELETE /api/receipts/{id}`: Delete a cash receipt record

### Kafka Topics

- `cashreceipt-topic`: Produce message to prompt message for CRUD actions

### Python Scripts

- `generateCashReceipt.py`: Creates 10 random receipts when button pressed


## Configuration

- Spring Boot configuration: `src/main/resources/application.properties`
- Docker and Kafka configuration: `src/docker-compose.yml`

## Testing

Run the test suite with:

```
mvn test
```

## Deployment

The system is containerized and can be deployed to any Docker-compatible environment.


## License

This project is open sourced.

## Acknowledgments

- Spring Boot
- Apache Kafka
- Docker
- Python community for excellent libraries

