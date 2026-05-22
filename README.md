# Store-Rating-Platform
Full Stack Store Rating Platform with role-based authentication, store ratings, admin dashboard, owner dashboard, search functionality, and responsive UI using React.js, Node.js, Express.js, MySQL, and Sequelize.

## Features

- Single login system for all users
- Role-based authentication
- System Administrator dashboard
- Normal User dashboard
- Store Owner dashboard
- Store listing with image cards
- Store search by name and address
- Submit store rating from 1 to 5
- Update submitted rating
- Average rating display
- Users and stores management
- JWT authentication
- Responsive UI

---

## User Roles

### 1. System Administrator

Admin can:

- Login
- View dashboard statistics
- View total users
- View total stores
- View total ratings
- Add normal users
- Add store owners
- Add admin users
- Add stores with image URL
- View users list
- View stores list
- Logout

### 2. Normal User

Normal user can:

- Signup
- Login
- View all registered stores
- Search stores by name or address
- Submit rating for a store
- Update rating for a store
- Logout

### 3. Store Owner

Store owner can:

- Login
- View assigned store details
- View average rating of their store
- View users who rated their store
- Logout

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT
- bcryptjs
- cors
- dotenv

---

## Demo Login Credentials

### Admin

Email:
rwagh4911@gmail.com

Password:
Rahul@1114

---

### Store Owner

Email:
owner1@gmail.com
owner2@gmail.com
owner3@gmail.com
owner4@gmail.com
owner5@gmail.com

Password:
Owner@123

---

### Normal User

Email:
Karan123@gmail.com
raj123@gmail.com

Password:
Karan@123
Pawar@123  

## Database Setup

Create MySQL database:
CREATE DATABASE store_rating;

## Environment Variables

Create .env file inside the server folder.

PORT=5000
DB_NAME=store_rating
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
JWT_SECRET=mysecretkey


## Backend Installation
Open terminal in the project root folder:

cd server
npm install
npm run dev

## Frontend Installation
cd client
npm install
npm run dev

## Seed Demo Data
To insert demo owners, users, and stores:

cd server
node seed.js

### How to Use

Step 1: Start Backend
cd server
npm run dev

Step 2: Start Frontend
cd client
npm run dev

Step 3: Open Application
http://localhost:5173

