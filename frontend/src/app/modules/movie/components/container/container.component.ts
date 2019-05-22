import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/modules/movie/movie.service';
import{movie} from '../../movie';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'movie-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
 @Input()
  movies:Array<movie>;
  @Input()
  useWatchlistApi:boolean;

  
  constructor(private movieService:MovieService,private snackBar:MatSnackBar) 
  { 

  }

  ngOnInit() {
    
  }
  addToWatchList(movie){
    this.movieService.addToWatchList(movie).subscribe(()=>{
      this.snackBar.open('movie added','',{
        duration:2000
      });
      console.log("list");

    })
  }

  deleteMovieFromWatchList(movie){
    this.movieService.deleteMovieFromWatchList(movie).subscribe((result)=>{
      let message=`${movie.title} ${result}`;
      this.snackBar.open(message,'',{
        duration:1000
      });
      const index =this.movies.indexOf(movie);
      this.movies.splice(index,1);

    });
  }

  updateWatchList(movie)
  {
    this.movieService.updateWatchlist(movie).subscribe((updateMovie)=>{

      let message=`${movie.title}+ movie is updated `;
      this.snackBar.open(message, '',{
        duration:1000
      });
    })
  }
  

}
