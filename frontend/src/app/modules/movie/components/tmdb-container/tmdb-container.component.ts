import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/modules/movie/movie.service';
import{movie} from '../../movie';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'movie-tmdb-container',
  templateUrl: './tmdb-container.component.html',
  styleUrls: ['./tmdb-container.component.css']
})
export class TmdbContainerComponent implements OnInit {
  movies:Array<movie>;
  movieType:string;
  constructor(private movieService:MovieService,private route:ActivatedRoute) 
  { this.movies=[];
    this.route.data.subscribe((data)=>{
      this.movieType=data.movieType;
    });
  }


  ngOnInit() {
    this.movieService.getMovies(this.movieType).subscribe((movies)=>{
      this.movies.push(...movies);
    })
  }


}
