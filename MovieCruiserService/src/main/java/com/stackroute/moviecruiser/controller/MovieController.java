package com.stackroute.moviecruiser.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.stackroute.moviecruiser.domain.Movie;
import com.stackroute.moviecruiser.exception.MovieAlreadyExistsException;
import com.stackroute.moviecruiser.exception.MovieNotFoundException;
import com.stackroute.moviecruiser.service.MovieService;
import io.jsonwebtoken.Jwts;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping(path="/api/v1/movieservice")
public class MovieController {
	
	private MovieService movieService;

	public MovieController(MovieService movieService) {
		super();
		this.movieService = movieService;
	}
	
	@PostMapping("/movie")
	public ResponseEntity<?> saveNewMovie(@RequestBody Movie movie,HttpServletRequest request,
			HttpServletResponse response)
	{
		ResponseEntity<?> responseEntity;
		final String authHeader=request.getHeader("authorization");
		final String token=authHeader.substring(7);
		String userId = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(token).getBody().getSubject();
		
		try{
			movie.setUserId(userId);
			movieService.saveMovie( movie);
			responseEntity=new ResponseEntity<Movie>(movie,HttpStatus.CREATED);
		}
		catch(MovieAlreadyExistsException e){
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.CONFLICT);
		}
		return responseEntity;
	}
	
	@PutMapping("/movie/{id}")
	public ResponseEntity<?> updateMovie(@PathVariable("id") final Integer id, @RequestBody Movie movie )
	{
		ResponseEntity<?> responseEntity;
		try{
			final Movie fetchedMovie=movieService.updateMovie(movie);
			responseEntity=new ResponseEntity<Movie>(fetchedMovie,HttpStatus.OK);
		}
		catch(MovieNotFoundException e){
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.CONFLICT);
		}
		return responseEntity;
	}
	
	@DeleteMapping("/movie/{id}")
	public ResponseEntity<?> deleteMovieById(@PathVariable("id") final int id){
		ResponseEntity<?> responseEntity;
		try{
			movieService.deleteMovieById(id);
			responseEntity=new ResponseEntity<String>("Movie deleted successfully",HttpStatus.OK);
		}
		catch(MovieNotFoundException e){
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}
	@GetMapping("/movie/{id}")
	public  ResponseEntity<?> fetchMovieById(@PathVariable("id") final int id){
		ResponseEntity<?> responseEntity;
		Movie thisMovie=null;
		try{
			thisMovie=movieService.getMovieById(id);
			responseEntity=new ResponseEntity<Movie>(thisMovie,HttpStatus.OK);
		}
		catch(MovieNotFoundException e){
			responseEntity = new ResponseEntity<String>("{ \"message\": \"" + e.getMessage() + "\"}", HttpStatus.CONFLICT);
		}
		return responseEntity;
	}
	
	@GetMapping("/movies")
	public  ResponseEntity<List<Movie>> fetchMyMovies(final HttpServletRequest request, final HttpServletResponse response){
		final String authHeader = request.getHeader("authorization");
		final String token = authHeader.substring(7);
		String userId = Jwts.parser().setSigningKey("secretKey").parseClaimsJws(token).getBody().getSubject();
		List<Movie> movies=movieService.getMyMovies(userId);
		return new ResponseEntity<List<Movie>>(movies,HttpStatus.OK);
	}
	
	
	
	

}
