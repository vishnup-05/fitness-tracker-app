# Fitness App

This is a full-stack web application for tracking fitness activities. It includes a Spring Boot backend and an Angular frontend.

## Features

*   User registration and authentication
*   Create, view, and manage workout sessions
*   User profile management
*   Secure API with token-based authentication

## Technologies Used

### Backend

*   Java 17
*   Spring Boot
*   Maven
*   Spring Security

### Frontend

*   Angular
*   TypeScript
*   HTML5 & CSS3
*   Angular CLI

## Getting Started

### Prerequisites

*   Java JDK 17 or later
*   Maven
*   Node.js and npm

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd fitness-app-backend
    ```
2.  Run the Spring Boot application:
    ```bash
    mvn spring-boot:run
    ```
    The backend will be running on `http://localhost:8080`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd fitness-app-frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    ng serve
    ```
    The frontend will be running on `http://localhost:4200`.

## Usage

1.  Open your browser and navigate to `http://localhost:4200`.
2.  Register for a new account or log in with existing credentials.
3.  Create new workout entries using the workout form.
4.  View your past workouts in the workout list.
5.  Manage your profile information.

## API Endpoints

The backend exposes the following RESTful API endpoints:

*   `POST /api/users/register`: Register a new user.
*   `POST /api/users/login`: Authenticate a user and receive a token.
*   `GET /api/profile`: Get the profile of the currently logged-in user.
*   `PUT /api/profile`: Update the profile of the currently logged-in user.
*   `GET /api/workouts`: Get a list of all workouts for the logged-in user.
*   `POST /api/workouts`: Create a new workout.
*   `GET /api/workouts/{id}`: Get a specific workout by its ID.
*   `PUT /api/workouts/{id}`: Update an existing workout.
*   `DELETE /api/workouts/{id}`: Delete a workout.

