import { Component, OnInit,EventEmitter } from '@angular/core';
import{movie} from '../../movie';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';
import { MovieService } from 'src/app/modules/movie/movie.service';
import { Input,Output } from '@angular/core';
import{MatSnackBarModule, MatSnackBar} from '@angular/material/snack-bar'
import{MatDialog} from '@angular/material';
import { MovieDialogComponent } from 'src/app/modules/movie/components/movie-dialog/movie-dialog.component';
@Component({
  selector: 'movie-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {
  
  @Input()
  movie1: movie;
  @Input()
  useWatchlistApi:boolean;
  @Output()
  addMovie=new EventEmitter();
  @Output()
  deleteMovie=new EventEmitter();

 

  constructor(private dialog:MatDialog) { 
   

  }

  ngOnInit() {
    
   
  }
  addToWatchList(){
  this.addMovie.emit(this.movie1);
 
    }

    DeleteFromWatchList(){
      this.deleteMovie.emit(this.movie1);

    }

    UpdateWatchlist(actionType){
let dialogRef=this.dialog.open(MovieDialogComponent,{
  width:'400px',
  data:{obj:this.movie1,actionType:actionType}
});
dialogRef.afterClosed().subscribe(result=>{

}) ;  

}


}
