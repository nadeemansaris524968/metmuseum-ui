import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MmHeaderComponent } from './mm-header/mm-header.component';
import { MmResultItemComponent } from './mm-result-list/mm-result-item/mm-result-item.component';
import { MmResultListComponent } from './mm-result-list/mm-result-list.component';
import { MmSearchComponent } from './mm-search/mm-search.component';
import { MmAuthComponent } from './mm-auth/mm-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    MmHeaderComponent,
    MmSearchComponent,
    MmResultListComponent,
    MmResultItemComponent,
    MmAuthComponent,
  ],
  imports: [BrowserModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
