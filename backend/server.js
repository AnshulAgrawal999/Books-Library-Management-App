require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'https://yourfrontend.com'];

app.use(cors(
  {
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true); // Allow the origin
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }
));

app.use(cookieParser());


app.get( '/' , ( req , res ) => {

  try {
      res.status( 200 ).send( { 'msg' : 'Welcome To HomePage, this is Books Library Management App base url' } )  ;
  } catch ( error ) {
      res.status( 500 ).send( { 'error' : error } )  ;
  }
 
} )  ;

// Route placeholders
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/mybooks', require('./routes/mybooks'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('MongoDB connected');
  // Start server only after DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
