package com.stackroute.moviecruiser.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.moviecruiser.domain.Movie;
import com.stackroute.moviecruiser.exception.MovieAlreadyExistsException;
import com.stackroute.moviecruiser.exception.MovieNotFoundException;
import com.stackroute.moviecruiser.repository.MovieRepository;

@Service
public class MovieServiceImpl implements MovieService{
 
	public final transient MovieRepository movieRepository;
	@Autowired
	public MovieServiceImpl(MovieRepository movieRepository) {
		super();
		this.movieRepository = movieRepository;
	}
	
	
	@Override
	public boolean saveMovie(Movie movie) throws MovieAlreadyExistsException {
		final Optional<Movie> object = movieRepository.findById(movie.getId());
		if (object.isPresent()) {
			throw new MovieAlreadyExistsException("Could not save movie, Movie already exists");
		}
		movieRepository.save(movie);
		return true;
	}
	
	@Override
	public Movie updateMovie(Movie updateMovie) throws MovieNotFoundException {
		final Movie movie = movieRepository.findById(updateMovie.getId()).orElse(null);
		if (movie == null) {
			throw new MovieNotFoundException("Could not update. Movie not found");
		}
		movie.setComments(updateMovie.getComments());
		movieRepository.save(movie);
		return movie;
	}
	
	@Override
	public boolean deleteMovieById(int id) throws MovieNotFoundException {
		final Movie movie = movieRepository.findById(id).orElse(null);
		if (movie == null) {
			throw new MovieNotFoundException("Could not delete. Movie not found");
		}
		movieRepository.delete(movie);
		return true;
	}
	
	@Override
	public Movie getMovieById(int id) throws MovieNotFoundException {
		final Movie movie = movieRepository.findById(id).get();
		if (movie == null) {
			throw new MovieNotFoundException("Movie not found");
		}
		return movie;
	}
	
	@Override
	public List<Movie> getMyMovies(String userId) {
		return movieRepository.findByUserId(userId);
	}

	
	
	
	
	
}
