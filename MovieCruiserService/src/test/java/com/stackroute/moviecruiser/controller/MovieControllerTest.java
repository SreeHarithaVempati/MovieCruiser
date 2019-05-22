package com.stackroute.moviecruiser.controller;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.verifyNoMoreInteractions;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.context.junit4.SpringRunner;

import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.stackroute.moviecruiser.domain.Movie;
import com.stackroute.moviecruiser.service.MovieService;

@RunWith(SpringRunner.class)
@WebMvcTest(MovieController.class)
 public class MovieControllerTest {
	
	@Autowired
	private transient MockMvc mvc;
    @MockBean
    private transient MovieService movieService;
    @InjectMocks
	private MovieController controller;
    
    private transient Movie movie;
    
    static List<Movie> movies;
    
    @Before
    public void setUp(){
    	MockitoAnnotations.initMocks(this);
    	mvc = MockMvcBuilders.standaloneSetup(controller).build();
    	
    	movies=new ArrayList<>();
    	movie=new Movie(1,"avengers1","good movie","www.abc.com","2019-01-02",123,"John");
    	movies.add(movie);
    	movie=new Movie(2,"avengers2","good movie","www.abc.com","2019-01-05",123,"John");
    	movies.add(movie);
    }
    
    @Test
    public void testSaveNewMovieSuccess() throws Exception
    {
    	String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2huIiwiaWF0IjoxNTUyODg4NzYwfQ.IgNX2qpSeXT0qxwb3rYxIhWjgvF8Vyx1ASkeFYC2O-c";
		
		when(movieService.saveMovie(movie)).thenReturn(true);
		mvc.perform(post("/api/v1/movieservice/movie").header("authorization", "Bearer " + token).
				contentType(MediaType.APPLICATION_JSON).content(jsonToString(movie)))
		.andExpect(status().isCreated());
		verify(movieService, times(1)).saveMovie(Mockito.any(Movie.class));
		verifyNoMoreInteractions(movieService);

    	
    }
    @Test
    public void testUpdateMovieSuccess() throws Exception
    {
    	movie.setComments("not so good movie");
    	when(movieService.updateMovie(movie)).thenReturn(movies.get(0));
    	mvc.perform(put("/api/v1/movieservice/movie/{id}",1).contentType(MediaType.APPLICATION_JSON).content(jsonToString(movie)))
    	.andExpect(status().isOk());
    	verify(movieService,times(1)).updateMovie(Mockito.any(Movie.class));
    	verifyNoMoreInteractions(movieService);
    }
    
    @Test
    public void testDeleteMovieById() throws Exception
    {
    	when(movieService.deleteMovieById(1)).thenReturn(true);
    	mvc.perform(delete("/api/v1/movieservice/movie/{id}",1)).andExpect(status().isOk());
    	verify(movieService,times(1)).deleteMovieById(1);
    	verifyNoMoreInteractions(movieService);
    }
    @Test
    public void testGetMovieSuccess() throws Exception
    {
    	when(movieService.getMovieById(2)).thenReturn(movies.get(1));
    	mvc.perform(get("/api/v1/movieservice/movie/{id}",2)).andExpect(status().isOk());
    	verify(movieService,times(1)).getMovieById(2);
    	verifyNoMoreInteractions(movieService);
    }
    
    
    @Test
    public void testGetMyMovies() throws Exception
    {
    	List<Movie> list=new ArrayList<>();
		String token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJKb2huIiwiaWF0IjoxNTUyODg4NzYwfQ.IgNX2qpSeXT0qxwb3rYxIhWjgvF8Vyx1ASkeFYC2O-c";
    	when(movieService.getMyMovies("John")).thenReturn(list);
    	mvc.perform(get("/api/v1/movieservice/movies").header("authorization","Bearer " + token).contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    	verify(movieService,times(1)).getMyMovies("John");
    	verifyNoMoreInteractions(movieService);
    }
    
    private static String jsonToString(final Object obj) throws JsonProcessingException
    {
    	String result;
    	try{
    		final ObjectMapper mapper =new ObjectMapper();
    		final String jsonContent=mapper.writeValueAsString(obj);
    		result=jsonContent;
    	
    	}
    	catch(JsonProcessingException e)
    	{
    		result="Json Processing Error";
    	}
    	
    	return result;
    }
	
}
