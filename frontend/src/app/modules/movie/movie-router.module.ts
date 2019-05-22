import{RouterModule,Routes} from '@angular/router';
import{NgModule} from '@angular/core';
import { ContainerComponent } from 'src/app/modules/movie/components/container/container.component';
import{TmdbContainerComponent} from './components/tmdb-container/tmdb-container.component';
import { WatchlistComponent } from 'src/app/modules/movie/components/watchlist/watchlist.component';
import{SearchComponent}from './components/search/search.component';
import { AuthGuardService } from '../../auth-guard.service';

const movieRoutes: Routes=[
    {
        path:'movies',
     
        children:[
            {
                path:'',
                redirectTo:'/movies/popular',
                pathMatch:'full',
                canActivate: [AuthGuardService]

            },
            {
                path:'popular',
                component: TmdbContainerComponent,
                data:{
                    movieType:'popular'
                },
            },


            {
                path:'top-rated',
                component:TmdbContainerComponent,
                data:{
                    movieType:'top_rated'
                },
            },
            {
                path:'watchlist',
                component:WatchlistComponent,
                canActivate: [AuthGuardService]

            },
            {
                path:'search',
                component:SearchComponent,
                canActivate: [AuthGuardService]

            }
            
        ]
    }
];


@NgModule({
    imports:[
        RouterModule.forChild(movieRoutes),

    ],
    exports:[
        RouterModule,
    ]
})
export class MovieRouterModule{}