package com.stackroute.moviecruiser.Repository;


import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.assertEquals;

import java.util.List;
import java.util.Optional;
import com.stackroute.moviecruiser.domain.Movie;
import com.stackroute.moviecruiser.repository.MovieRepository;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class MovieRepositoryTest 
{
	@Autowired 
	private transient MovieRepository movieRepository;
	
	@Test
	public void testSaveMovie() throws Exception
	{
		movieRepository.save(new Movie(1,"avengers1","good movie","www.abc.com","2019-01-02",123,"John"));
		final Movie movie=movieRepository.getOne(1);
		assertThat(movie.getId()).isEqualTo(1);
				
	}
	
	@Test
	public void testUpdateMovie() throws Exception
	{
		movieRepository.save(new Movie(1,"avengers1","good movie","www.abc.com","2019-01-02",123,"John"));
		final Movie movie=movieRepository.getOne(1);
	    assertEquals(movie.getTitle(),"avengers1");
	    movie.setComments("awesome");
	    movieRepository.save(movie);
	    final Movie updateMovie=movieRepository.getOne(1);
	    assertEquals("awesome",updateMovie.getComments());
	    
	}
	
	@Test
	public void testDeleteMovie() throws Exception
	{
		movieRepository.save(new Movie(1,"avengers1","good movie","www.abc.com","2019-01-02",123,"John"));
		final Movie movie=movieRepository.getOne(1);
		assertEquals(movie.getTitle(),"avengers1");
		movieRepository.delete(movie);
		assertEquals(Optional.empty(),movieRepository.findById(1));
		
	}
	
	@Test
	public void testGetMovie() throws Exception
	{
		movieRepository.save(new Movie(1,"avengers1","good movie","www.abc.com","2019-01-02",123,"John"));
		final Movie movie=movieRepository.getOne(1);
		assertEquals(movie.getTitle(),"avengers1");
	}

	@Test
	public void testGetAllMovies() throws Exception
	{
		movieRepository.save(new Movie(1,"avengers1","good movie","www.abc.com","2019-01-02",123,"John"));
		movieRepository.save(new Movie(2,"avengers2","good movie","www.abc.com","2020-01-01",126,"John1"));
		final List<Movie> movies = movieRepository.findByUserId("John");
		assertEquals("avengers1", movies.get(0).getTitle());
		
				
	}
}
