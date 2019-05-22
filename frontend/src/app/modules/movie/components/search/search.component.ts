import { Component, OnInit } from '@angular/core';
import{movie} from '../../movie';
import{MovieService} from '../../movie.service';
@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
movies:Array<movie>;

  constructor(private movieService:MovieService) { }

  ngOnInit() {

  }

  onEnter(searchKey){
    this.movieService.searchMovie(searchKey).subscribe(movies =>{
      this.movies=movies;
    })
  }
}


