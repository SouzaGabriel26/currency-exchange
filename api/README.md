# Currency Exchange App API

This project is a currency exchange application that provides two options for making trades: USD, GBP and BRL. The API allows users to perform currency trades based on the most updated bidValue available, as the underlying API used in the project updates currency values every 30 seconds.

## Features

1. **Currency Trades:** Users can make currency trades between USD-GBP, GBP-USD, BRL-USD, USD-BRL, BRL-GBP and GBP-BRL pairs. The API ensures that the bidValue used for each trade is always up-to-date due to the underlying API's frequent updates.

2. **User System:** The application includes a user system with login and registration functionality. This allows users to create accounts, log in securely, and perform trades as registered users.

3. **Trade History:** The API maintains a comprehensive trade history for each user. Users can access their trade history to review past transactions and monitor their currency exchange activities.

## Technologies Used

- **TypeScript:** The entire API is implemented using TypeScript, providing the benefits of static typing and enhanced code quality.

- **Node.js:** The project is built on Node.js, which allows for efficient server-side implementation and non-blocking I/O operations.

- **Express.js:** The API is developed using Express.js, a popular web application framework for Node.js. Express.js simplifies routing, middleware, and HTTP handling.

- **Prisma:** Prisma is used as an ORM (Object-Relational Mapping) tool to interact with the database. It offers a convenient and type-safe way to manage database operations.

- **Websocket:** To provide the up to date currency value.

## Database

- PostgreSQL.

## Getting Started

1. Clone the repository to your local machine.

2. Install the project dependencies using `npm install`.

3. Set up the database connection by configuring the Prisma client.

4. Run the API using `npm run dev` or your preferred script.

## API Endpoints

### User
  - `POST /auth/signup`: Endpoint for user registration. Requires a unique email, name and password.
  
  - `POST /auth/signin`: Endpoint for user login. Requires valid credentials to authenticate and receive an access token (email and password).
  
  - `GET /user/me`: Endpoint for get the user info by id (private route, it requires a Bearer token).

  - `PUT /user/:id`: Endpoint for update a user (private route, it requires a Bearer token).
  
  - `DELETE /user/:userId`: Endpoint for delete a user account (private route, it requires a Bearer token).

### Trade
  - `POST /trade/:tradeDirection`: Endpoint for create a trade, passing 'inputValue' in body (private route, it requires a Bearer token).
      - OBS: the 'tradeDirection' param should only be 'usd-gbp' or 'gbp-usd';

  - `GET /trade/:userId`: Endpoint get all trades by userId (private route, it requires a Bearer token).

  - `DELETE /trade/:tradeId`: Endpoint for delete a trade (private route, it requires a Bearer token).

## This project is being developed for study purposes only
