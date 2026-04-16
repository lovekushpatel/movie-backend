const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movie.controller');
const reviewController = require('../controllers/review.controller');
const upload = require('../middlewares/upload.middleware');

// Routes
router.post('/movies', upload.single('poster'), movieController.createMovie);

router.get('/movies', movieController.getAllMovies);

router.get('/movies/:id', movieController.getMovieById);

router.put('/movies/:id', upload.single('poster'), movieController.updateMovie);

router.delete('/movies/:id', movieController.deleteMovie);

// Routes
router.post('/movies/:id/reviews', reviewController.addReview);
router.get('/movies/:id/reviews', reviewController.getReviewsByMovie);

module.exports = router;