const Review = require('../models/review.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

exports.addReview = async (req, res, next) => {
  try {
    const { userName, rating, comment } = req.body;
    const { id: movieId } = req.params;

    if (!userName || !rating || !comment) {
      throw new ApiError(400, 'All fields are required');
    }
    if (rating < 1 || rating > 5) {
      throw new ApiError(400, 'Rating must be between 1 and 5');
    }
    const review = await Review.create({ movieId, userName, rating: Number(rating), comment });
    return res.status(201).json(new ApiResponse(201, 'Review added successfully', review));
  } catch (error) {
    next(error);
  }
};

exports.getReviewsByMovie = async (req, res, next) => {
  try {
    const { id: movieId } = req.params;
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, 'Reviews fetched successfully', reviews));
  } catch (error) {
    next(error);
  }
};