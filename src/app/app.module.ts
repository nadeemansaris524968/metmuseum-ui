import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ArtDetailComponent } from './gallery/art-detail/art-detail.component';
import { ArtItemComponent } from './gallery/art-list/art-item/art-item.component';
import { ArtListComponent } from './gallery/art-list/art-list.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SearchComponent } from './gallery/search/search.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GalleryComponent,
    pathMatch: 'full',
  },
  {
    path: 'art-detail/:id',
    component: ArtDetailComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    ArtListComponent,
    ArtItemComponent,
    GalleryComponent,
    ArtDetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
