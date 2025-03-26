import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ArtDetailComponent } from './art-detail/art-detail.component';
import { ArtItemComponent } from './gallery/art-item/art-item.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PaginationControlsComponent } from './gallery/pagination-controls/pagination-controls.component';
import { SearchComponent } from './gallery/search/search.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ShortenTitlePipe } from './shared/pipes/shorten-title.pipe';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/gallery',
    pathMatch: 'full',
  },
  {
    path: 'gallery',
    component: GalleryComponent,
  },
  {
    path: 'art-detail/:id',
    component: ArtDetailComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ArtItemComponent,
    GalleryComponent,
    ArtDetailComponent,
    PaginationControlsComponent,
    ShortenTitlePipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
