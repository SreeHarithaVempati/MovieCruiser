import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { HttpClientJsonpModule } from '@angular/common/http/src/module';
import { Observable } from 'rxjs';
import {retry,map } from 'rxjs/operators';
import{movie} from './movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiKey:string;
  tmdbEndPoint:string;
  imagePrefix:string;
  watchListEndPoint:string;
  getWatchListEndPoint:string;
  updateEndPoint:string;
  search:string;

  constructor(private http:HttpClient) { 
    this.apiKey="api_key=c4e3b03f9a9b7892154e81cc97e4c284";
    this.tmdbEndPoint="http://api.themoviedb.org/3/movie";
    this.imagePrefix="https://image.tmdb.org/t/p/w500/";
    this.watchListEndPoint="http://localhost:5623/api/v1/movieservice/movie";
    this.getWatchListEndPoint="http://localhost:5623/api/v1/movieservice/movies";
    this.search="https://api.themoviedb.org/3/search/movie?";

  }

  getMovies(type:string,page:number=1):Observable<Array<movie>>{
    const endPoint=`${this.tmdbEndPoint}/${type}?${this.apiKey}&page=${page}`;
    console.log(type);
    return this.http.get(endPoint).pipe(
      
      retry(3),
      map(this.pickMovieResults),
      map(this.transformPosterPath.bind(this))
    );
  }


transformPosterPath(movies):Array<movie>{
  this.imagePrefix="https://image.tmdb.org/t/p/w500/";
    return movies.map(movie=>{
      movie.poster_path=`${this.imagePrefix}${movie.poster_path}`;
      return movie;
    });
      }

pickMovieResults(response){
        return response['results'];

      }

      addToWatchList(movie){
        return this.http.post(`${this.watchListEndPoint}`,movie);

      }
      getWatchedMovieList():Observable<Array<movie>>{
        return this.http.get<Array<movie>>(`${this.getWatchListEndPoint}`);

      }
      deleteMovieFromWatchList(movie){
        const deUrl=`${this.watchListEndPoint}/${movie.id}`;
        return this.http.delete(deUrl,{responseType:'text'});
      }
     updateWatchlist(movie){
       const deUrl=`${this.watchListEndPoint}/${movie.id}`;
       return this.http.put(deUrl,movie);
     }

    searchMovie(searchKey:string,page:number=1):Observable<Array<movie>>{
      if(searchKey.length >0){
        const searchEndPoint=`${this.search}${this.apiKey}&page=${page}&include_adult=false&query=${searchKey}`;
        return this.http.get(searchEndPoint).pipe(
          retry(3),
          map(this.pickMovieResults),
          map(this.transformPosterPath.bind(this))
        );
      }
    }



       
    }


    