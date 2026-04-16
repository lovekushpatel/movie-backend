const express = require('express');
const cors = require('cors');
const path = require('path');
const movieRoutes = require('./routes/movie.routes');
const reviewRoutes = require('./routes/review.routes');
const errorHandler = require('./middlewares/error.middleware');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', movieRoutes);
// app.use('/reviews', reviewRoutes); 


app.get('/', (req, res) => {
  res.send('Movie API is running...');
});


app.use(errorHandler);

module.exports = app;
