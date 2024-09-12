## Backend Overview

The backend of the Amar-Grocery e-commerce website is built using Node.js and Express.js, with MongoDB as the database solution. The server is set up to handle various API requests related to user management, product listings, cart operations, order processing, and contact form submissions.

### Technologies Used

- **Node.js:** JavaScript runtime environment for executing server-side code.
- **Express.js:** Web application framework for Node.js, used to build the RESTful API.
- **MongoDB:** NoSQL database for storing and managing data.
- **CORS:** Middleware to enable Cross-Origin Resource Sharing.
- **MongoDB Atlas:** Cloud-hosted MongoDB database service.

### Project Structure

- **Server Setup:**
  - The server is configured to run on port 5000 or the port specified in the environment variables.
  - Middleware includes CORS and JSON body parsing.
  
- **MongoDB Connection:**
  - Connects to MongoDB Atlas using the connection URI.
  - Utilizes the `MongoClient` to interact with the database.

### Database Collections

1. **`productCollection`:** Stores product details.
2. **`userCollection`:** Stores user information.
3. **`cartProducts`:** Manages cart items.
4. **`ordersCollection`:** Records order details.
5. **`contactUsCollection`:** Stores contact form submissions.

### API Endpoints

#### User Related APIs
- **GET `/users`**: Retrieve a list of all users.
- **POST `/users`**: Add a new user.

#### Product Related APIs
- **GET `/products`**: Retrieve all products.
- **GET `/products/:department`**: Retrieve products filtered by department.

#### Cart Related APIs
- **POST `/cartProducts`**: Add a new item to the cart.
- **GET `/cartProducts`**: Retrieve all cart products.
- **GET `/checkOut`**: Retrieve cart products based on user email.
- **DELETE `/cartProducts/:id`**: Delete a cart item by ID.

#### Order Related APIs
- **GET `/orders`**: Retrieve all orders.
- **POST `/orders`**: Add a new order.

#### Contact Us Related APIs
- **GET `/contactUs`**: Retrieve all contact messages.
- **POST `/contactUs`**: Submit a new contact message.

### How to Run the Backend

1. **Install Dependencies:**
   ```bash
   npm install



