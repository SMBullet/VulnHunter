# Vulnhunter

## Overview

**Vulnhunter** is a network scanning application built with React for the frontend and Spring Boot for the backend. It allows users to perform security scans on network hosts and web servers using various tools, view scan results, and download reports in PDF format.

## Features

- **Frontend:**
  - User-friendly interface for initiating scans.
  - Selection of various scanning tools.
  - Display of scan results with the option to download as PDF.

- **Backend:**
  - RESTful API for initiating and retrieving scan results.
  - Handles scan execution and data management.

## Prerequisites

- [Node.js](https://nodejs.org/) (for running the frontend)
- [Java 17](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (for running the backend)
- [Maven](https://maven.apache.org/) (for building the Spring Boot application)
- [Spring Boot](https://spring.io/projects/spring-boot) (for the backend)

## Getting Started

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

   The frontend application will be available at `http://localhost:3000`.

### Backend

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Build the project:**

    ```bash
    mvn clean install
    ```

3. **Run the application:**

    ```bash
    mvn spring-boot:run
    ```

   The backend application will be available at `http://localhost:5455`.

## API Endpoints

### POST /api/scan

- **Description:** Initiates a scan.
- **Request Body:**
    ```json
    {
      "ipOrDomain": "string",
      "tool": "string"
    }
    ```
- **Responses:**
  - `200 OK`: Returns scan result data.
  - `400 Bad Request`: If validation fails.
  - `401 Unauthorized`: If authentication token is missing or invalid.
  - `500 Internal Server Error`: For server errors.

### GET /api/scan/{id}

- **Description:** Retrieves the result of a specific scan.
- **Parameters:**
  - `id` (Path Parameter): The unique identifier of the scan result.
- **Responses:**
  - `200 OK`: Returns the scan result.
  - `404 Not Found`: If the scan result does not exist.
  - `500 Internal Server Error`: For server errors.

## File Structure

- **Frontend**
  - `src/components/Scanner.jsx`: Main component for initiating scans.
  - `src/components/ScanResults.jsx`: Component for displaying scan results.

- **Backend**
  - `src/main/java/com/example/vulnhunter/ScanController.java`: REST controller for scan endpoints.
  - `src/main/java/com/example/vulnhunter/ScanService.java`: Service class for scan logic.
  - `src/main/java/com/example/vulnhunter/ScanResult.java`: Model class for scan results.
  - `src/main/java/com/example/vulnhunter/ScanRequest.java`: Model class for scan requests.
  - `src/main/java/com/example/vulnhunter/Application.java`: Main application entry point.

## Contributing

Feel free to open issues and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/) for building the frontend.
- [Spring Boot](https://spring.io/projects/spring-boot) for the backend framework.
- [pdf-lib](https://pdf-lib.js.org/) for PDF generation.

