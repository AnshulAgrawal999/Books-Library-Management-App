# Books Library Management App (GoodReads Clone)

A simplified GoodReads clone built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to register, log in, view books, track reading progress, and rate books.

## Features

- **User Authentication**: Register, login, logout with JWT and HTTP-only cookies
- **Book Management**: View all available books
- **Personal Library**: Add books to "My Books" list
- **Reading Progress**: Track reading status (Want to Read, Currently Reading, Read)
- **Book Ratings**: Rate books from 1-5 stars
- **Responsive Design**: Works on desktop, tablet and mobile devices

## Tech Stack

### Frontend

- React 18
- Redux Toolkit (State Management)
- React Router DOM (Routing)
- Axios (HTTP Client)

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)
- Cookie Parser

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Books-Library-Management-App.git
cd Books-Library-Management-App
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

> **Note:** A `.env.example` file is provided in the backend directory as a template for required environment variables.  
> You can copy it to `.env` and update the values as needed:
>
> ```bash
> cp .env.example .env
> ```

```env
MONGODB_URI=mongodb://localhost:27017/library-app
JWT_SECRET=your-secret-key-here
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Setup

- **Using MongoDB Compass**:  
  1. Open MongoDB Compass and connect to your MongoDB server.
  2. In the left sidebar, click "Create Database" and name it `library-app` (or use the name specified in your backend `.env` file).
  3. Inside the new database, click "Create Collection" and name it `books`.
  4. Select the `books` collection, then click the "Add Data" dropdown and choose "Import File".
  5. In the import dialog, select `backend/books.json` as the file to import and set the file type to "JSON".
  6. Click "Import" to add the sample book data to your database.

## Running the Application

### 1. Start the Backend Development Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:${PORT}`
The backend will run on `http://localhost:5000` (or the port specified in your `.env` file)

The frontend will run on `http://localhost:5173` (default Vite port; this may differ if you change the port in your Vite config).

**To change the frontend port:**  

1. Open `frontend/vite.config.js` (or `vite.config.ts` if using TypeScript).  

2. Add or edit the `server` section as follows:

   ```js
   // vite.config.js
   export default {
     // ...other config
     server: {
       port: 5173 // Change this to your desired port
     }
   }
   ```

3. Save the file and restart the frontend server.

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173` (or the port specified in your Vite configuration)

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Books

- `GET /api/books` - Get all books

### My Books (Protected)

- `GET /api/mybooks` - Get user's books
- `POST /api/mybooks/:bookId` - Add book to user's list
- `PATCH /api/mybooks/:bookId/status` - Update reading status
- `PATCH /api/mybooks/:bookId/rating` - Update rating

## Usage

1. **Register/Login**: Create an account or log in with existing credentials
2. **Browse Books**: View all available books on the home page
3. **Add to My Books**: Click "Want to Read" on any book (requires login)
4. **Manage Reading Progress**: Go to "My Books" to update status and ratings
5. **Track Progress**: Monitor your reading journey with status and ratings

## Project Structure

You should use `text` as the language for this code block, since it is a directory/project structure tree and not source code.

```text
Books-Library-Management-App/
├── backend/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Authentication middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── books.json       # Sample data
│   ├── .env.example     # Example environment variables
│   └── server.js        # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── features/    # Redux slices
│   │   ├── pages/       # Page components
│   │   ├── api/         # API configuration
│   │   └── store.js     # Redux store
│   └── package.json
├── .gitignore           # Git ignore file
└── README.md

```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
