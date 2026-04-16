const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');

// Routes
router.post('/movies/:id/reviews', reviewController.addReview);
router.get('/movies/:id/reviews', reviewController.getReviewsByMovie);

module.exports = router;
