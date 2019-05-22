import { Component, OnInit,Inject } from '@angular/core';
import{movie} from '../../movie';
import{MatSnackBar,MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import{MovieService} from '../../movie.service';
@Component({
  selector: 'movie-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.css']
})
export class MovieDialogComponent implements OnInit {
movie:movie;
comments:string;
actionType:string;
  constructor(public snackBar:MatSnackBar,public dialoRef:MatDialogRef<MovieDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,private movieService:MovieService) {
    this.comments=data.obj.comments;
    this.actionType=data.actionType;
    this.movie=data.obj;

   }

  ngOnInit() {
  }
  onNoClick(){
    this.dialoRef.close();
  }
  updateComments(){
    this.movie.comments=this.comments;
    this.dialoRef.close();
    this.movieService.updateWatchlist(this.movie).subscribe(movie=>{
      this.snackBar.open("Movie updated","",{
        duration:1000,
      })
    })
  }

}
