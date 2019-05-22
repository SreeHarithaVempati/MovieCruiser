import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import{MovieService} from './movie.service';

import { ContainerComponent } from './components/container/container.component';
import{RouterModule,Routes} from '@angular/router';
import{MovieRouterModule} from './movie-router.module';
import{MatCardModule} from '@angular/material/card';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { TmdbContainerComponent } from './components/tmdb-container/tmdb-container.component';
import { MatButtonModule } from '@angular/material/button';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import{MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchComponent } from './components/search/search.component';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';
import{FormsModule} from '@angular/forms';
import { InterceptorService } from './interceptor.service';


@NgModule({
  declarations: 
  [
    ThumbnailComponent,  
    ContainerComponent,
     WatchlistComponent,
      TmdbContainerComponent, 
      SearchComponent,
       MovieDialogComponent
      ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatInputModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents:[MovieDialogComponent],
  exports:[ThumbnailComponent,ContainerComponent,MovieRouterModule,
    TmdbContainerComponent,WatchlistComponent,MovieDialogComponent],
providers:
[MovieService,{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true //multi means multi requests which we are making to be true
  }],
})
export class MovieModule { }
