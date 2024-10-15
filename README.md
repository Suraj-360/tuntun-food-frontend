# Tuntun's Food

Tuntun's Food is a full-stack food delivery web application built using the MERN stack (MongoDB, Express, React, Node.js) with Razorpay payment integration. The application allows users to browse food items, manage their cart, place orders, and securely process payments. It also includes user authentication, email verification, and complete account management.

## Features

- **User Authentication**
  - Secure registration and login with password hashing (bcrypt).
  - JWT-based authentication for protecting routes.

- **Email Verification**
  - Email sent automatically upon registration.
  - Users verify their email via a unique URL link.

- **Food Menu**
  - Browse a variety of food items with detailed descriptions.
  - Add items to the cart for ordering.

- **Cart Management**
  - Add, update, or remove food items from the cart.

- **Order Management**
  - Place orders and track their status in real-time.

- **Payment Integration**
  - Secure payment processing using Razorpay API.

- **Profile Management**
  - View and update account information.
  - Change passwords securely.
  - Deactivate account if required.

- **Middleware**
  - Authentication middleware ensures protected routes.
  - Authorization middleware handles role-based access control.

## Tech Stack

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Payment Gateway**: Razorpay API
- **Authentication**: JWT with bcrypt for password hashing
- **Email Service**: NodeMailer for email verification
