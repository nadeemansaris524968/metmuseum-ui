import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArtDetailComponent } from './arts/art-detail/art-detail.component';
import { ArtItemComponent } from './arts/art-list/art-item/art-item.component';
import { ArtListComponent } from './arts/art-list/art-list.component';
import { ArtsComponent } from './arts/arts.component';
import { SearchComponent } from './arts/search/search.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/art-results',
    pathMatch: 'full',
  },
  {
    path: 'art-results',
    component: ArtsComponent,
  },
  {
    path: 'art-detail',
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
    ArtsComponent,
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
