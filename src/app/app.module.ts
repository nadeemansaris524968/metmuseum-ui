import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MmSearchComponent } from './mm-search/mm-search.component';
import { MmResultListComponent } from './mm-result-list/mm-result-list.component';
import { MmResultItemComponent } from './mm-result-list/mm-result-item/mm-result-item.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MmSearchComponent, MmResultListComponent, MmResultItemComponent],
  imports: [BrowserModule, CommonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
