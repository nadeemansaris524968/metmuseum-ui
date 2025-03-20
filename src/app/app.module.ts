import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MmAuthComponent } from './mm-auth/mm-auth.component';
import { MmHeaderComponent } from './mm-header/mm-header.component';
import { MmResultDetailComponent } from './mm-results/mm-result-detail/mm-result-detail.component';
import { MmResultItemComponent } from './mm-results/mm-result-list/mm-result-item/mm-result-item.component';
import { MmResultListComponent } from './mm-results/mm-result-list/mm-result-list.component';
import { MmResultsComponent } from './mm-results/mm-results.component';
import { MmSearchComponent } from './mm-results/mm-search/mm-search.component';
import { AboutComponent } from './shared/links/about/about.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/art-results',
    pathMatch: 'full',
  },
  {
    path: 'art-results',
    component: MmResultsComponent,
  },
  {
    path: 'art-detail',
    component: MmResultDetailComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MmHeaderComponent,
    MmSearchComponent,
    MmResultListComponent,
    MmResultItemComponent,
    MmAuthComponent,
    MmResultsComponent,
    MmResultDetailComponent,
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
