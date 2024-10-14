# API Documentation

## Overview

This API provides endpoints for managing cars, brands, models, and user authentication. It is divided into two main sections: Admin and User routes.

---

## Table of Contents

1. [Admin Routes](#admin-routes)
   - [GET Endpoints](#get-endpoints)
   - [POST Endpoints](#post-endpoints)
2. [User Routes](#user-routes)
   - [GET Endpoints](#get-endpoints-1)
   - [POST Endpoints](#post-endpoints-2)
3. [Error Handling](#error-handling)
4. [Authentication](#authentication)
5. [Examples](#examples)

---

## Admin Routes

Admin routes are prefixed with `/api/v1/admin/`.

### GET Endpoints

- **Get All Brands**
  - **Endpoint**: `/api/v1/admin/brand`
  - **Description**: Retrieve a list of all car brands.

- **Get All Models**
  - **Endpoint**: `/api/v1/admin/model`
  - **Description**: Retrieve a list of all car models.

- **Get All Users**
  - **Endpoint**: `/api/v1/admin/users`
  - **Description**: Retrieve a list of all registered users.

- **Get User by ID**
  - **Endpoint**: `/api/v1/admin/users/:id`
  - **Description**: Retrieve details of a specific user by their ID.

- **Get All Cars**
  - **Endpoint**: `/api/v1/admin/car`
  - **Description**: Retrieve a list of all cars.

  **Query Parameters**:
  - `brand` (optional): Filter cars by the specified brand.
  - `model` (optional): Filter cars by the specified model.
  
  **Behavior**:
  - If **only** `brand` is provided, return all cars of that brand.
  - If **only** `model` is provided, return all cars of that model.
  - If **both** `brand` and `model` are provided, return cars that match both.
  - If **neither** is provided, return all cars.


### POST Endpoints

- **Create a New Brand**
  - **Endpoint**: `/api/v1/admin/brand`
  - **Description**: Add a new car brand.

- **Create a New Model**
  - **Endpoint**: `/api/v1/admin/model`
  - **Description**: Add a new car model.

- **Add a New Car**
  - **Endpoint**: `/api/v1/admin/car`
  - **Description**: Add a new car to the inventory.

---

## User Routes

User routes do not require admin privileges and focus on user interactions.

### GET Endpoints

- **Rent a Car**
  - **Endpoint**: `/rentCar`
  - **Description**: Retrieve the rental options available.

- **Get Car by ID**
  - **Endpoint**: `/cars/:id`
  - **Description**: Retrieve details of a specific car by its ID.

- **Get All Cars**
  - **Endpoint**: `/cars`
  - **Description**: Retrieve a list of all available cars.

### POST Endpoints

- **User Registration**
  - **Endpoint**: `/register`
  - **Description**: Register a new user.

- **User Login**
  - **Endpoint**: `/login`
  - **Description**: Authenticate an existing user.

- **Rent a Car**
  - **Endpoint**: `/rentCar`
  - **Description**: Submit a request to rent a car.

---

## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of requests. Common status codes include:

- **200 OK**: Request succeeded.
- **201 Created**: Resource was created successfully.
- **400 Bad Request**: The request was invalid or cannot be processed.
- **404 Not Found**: The requested resource was not found.
- **500 Internal Server Error**: An error occurred on the server.

---

## Authentication

Some routes may require authentication. Ensure you include a valid token in the headers for protected routes.

---

## Examples

### Admin - Get All Brands


## Current ENV :




**Request**:
```http
GET /api/v1/admin/brand


