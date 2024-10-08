# BD Cinema House API

Welcome to the **BD Cinema House** API, a backend service for a movie ticket booking system. This API is built using TypeScript, Express, and Mongoose. It handles all backend operations including user management, movie scheduling, ticket booking, and more.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)


## Features

- User Authentication (Signup, Login, Logout)
- Movie Management (CRUD operations for movies)
- Showtimes Management (CRUD operations for showtimes)
- Ticket Booking System
- User Profile Management

## Technologies

- **TypeScript**: Ensures type safety and better development experience.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js, providing a straightforward, schema-based solution to model application data.
- **MongoDB**: A NoSQL database used to store movies, users, bookings, and more.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   gh repo clone shouravpaul01/bd-cinema-house-api
   ```
2. **Navigate to the project directory:**

   ```bash
   cd bd-cinema-house-api
   ```
3. **Install dependencies:**

   ```bash
   npm install
   ```
4. **Set up environment variables:**

   ```bash
   PORT=3000
   DATABASE_URL=mongodb+srv://careers:cTab3jGbvMykBpab@cluster0.8sp76yj.mongodb.net/bd-cinema-house?retryWrites=true&w=majority

   CLOUD_NAME=dcrui4h7s
   API_KEY=694655887366351
   API_SECRET=QpG8rWri6_guz_IEdGCZFLOC62I
 
   SSLCOMMERZ_STOREID=test65a9318ee93cf
   SSLCOMMERZ_PASSWORD=test65a9318ee93cf@ssl
   ```
5. **Run the project:**

   ```bash
   npm run dev
   ```
## Usage
After running the API, it will be available at http://localhost:3000. You can use tools like Postman.

## API Endpoints

**Auth**

- **POST** `/api/v1/user/create-user`  
  Register a new user.

- **POST** `/api/v1/user/verify-email`  
  Login an existing user.

**Movies**

- **POST** `/api/v1/movies/create-movie`  
  Get a list of all movies.

- **GET** `/api/v1/movies`  
  Add a new movie.  
  **Admin only**.

- **PATCH** `/api/v1/movies/:movieId`  
  Update movie details.  
  **Admin only**.

- **DELETE** `/api/v1/movies/:movieId`  
  Delete a movie.  
  **Admin only**.

**Show Time**

- **POST** `/api/v1/showtimes/create-movie-showtime`  
  Add a new movie. 

- **GET** `/api/v1/showtimes`  
   Get a list of all movies.

- **PATCH** `/api/v1/showtimes/:movieId`  
  Update movie details.  
  **Admin only**.

- **DELETE** `/api/v1/showtimes/:showtimeId`  
   Soft Delete. 

- **PATCH** `/api/v1/showtimes/single-restore/:movieId`    
  **Admin only**.

- **GET** `/api/v1/showtimes/active-movie-show-date`  
   Get a list of all movies show data by date. 

- **GET** `/api/v1/showtimes//active-movie-by-id/:showtimeId`

- **GET** `/api/v1/showtimes/active-movie-seat-type-by-id`  
   


**Bookings**

- **POST** `/api/v1/bookings/create-booking`  
  Book a ticket.

- **GET** `/api/v1/bookings/:id`  
  Get booking details by ID.

- **DELETE** `/api/v1/bookings/:bookingId`  
  Cancel a booking.

- **PATCH** `/api/v1/bookings/purchase-confirm/:bookingId`  
  Ticket booking confirm.

- **GET** `/api/v1/bookings/my-booking`  
  Get user all bookings by user email.

- **POST** `/api/v1/bookings/payment/success/:bookingId`  
  Payment success.

- **POST** `/api/v1/bookings/payment/cencel/:bookingId`  
  Payment cencel.



