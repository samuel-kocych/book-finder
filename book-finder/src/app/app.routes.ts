import { NgModule } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { DetailsComponent } from './components/book-details/details.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
