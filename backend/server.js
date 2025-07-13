require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Adjust as needed for frontend
  credentials: true
}));

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
