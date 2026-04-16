const Movie = require('../models/movie.model');
const fs = require('fs');
const path = require('path');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

exports.createMovie = async (req, res, next) => {
  try {
    const { title, description, releaseDate } = req.body;
    if (!req.file) {
      throw new ApiError(400, 'Movie poster is required');
    }
    const posterUrl = `/uploads/${req.file.filename}`;
    const newMovie = await Movie.create({ title, description, releaseDate, posterUrl });
    return res.status(201).json(new ApiResponse(201, 'Movie created successfully', newMovie));
  } catch (error) {
    next(error);
  }
};

exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, 'Movies fetched successfully', movies));
  } catch (error) {
    next(error);
  }
};

exports.getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new ApiError(404, 'Movie not found');
    }
    return res.status(200).json(new ApiResponse(200, 'Movie fetched successfully', movie));
  } catch (error) {
    next(error);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    const { title, description, releaseDate } = req.body;
    let movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new ApiError(404, 'Movie not found');
    }
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.releaseDate = releaseDate || movie.releaseDate;
    if (req.file) {
      if (movie.posterUrl?.startsWith('/uploads/')) {
        const oldPath = path.join(process.cwd(), movie.posterUrl.replace(/^\/+/, ''));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      movie.posterUrl = `/uploads/${req.file.filename}`;
    }
    await movie.save();
    return res.status(200).json(new ApiResponse(200, 'Movie updated successfully', movie));
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      throw new ApiError(404, 'Movie not found');
    }
    if (movie.posterUrl?.startsWith('/uploads/')) {
      const posterPath = path.join(process.cwd(), movie.posterUrl.replace(/^\/+/, ''));
      if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
    }
    await movie.deleteOne();
    return res.status(200).json(new ApiResponse(200, 'Movie deleted successfully'));
  } catch (error) {
    next(error);
  }
};