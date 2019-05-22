import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/modules/movie/movie.service';
import{movie} from '../../movie';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'movie-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
movies:Array<movie>;
useWatchlistApi:boolean=true;


  constructor(private movieService:MovieService,private snackbar:MatSnackBar) {
    this.movies=[];

    
   }

  ngOnInit() {
    this.movieService.getWatchedMovieList().subscribe((movies)=>{
      if(movies.length==0){
        this.snackbar.open('My watchlist is empty','',{
          duration:1000
        });
      }

      this.movies.push(...movies);
    })
  }

}
