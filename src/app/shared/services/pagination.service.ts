import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  currentPageChanged = new BehaviorSubject<number>(1);
  private currentPage: number;
  constructor() {
    this.currentPage = localStorage.getItem('currentPageNumber')
      ? parseInt(localStorage.getItem('currentPageNumber'))
      : 1;
    localStorage.setItem('currentPageNumber', this.currentPage.toString());
  }

  moveToNextPage() {
    this.currentPage += 1;
    localStorage.setItem('currentPageNumber', this.currentPage.toString());
    this.currentPageChanged.next(this.currentPage);
  }

  moveToPreviousPage() {
    this.currentPage -= 1;
    localStorage.setItem('currentPageNumber', this.currentPage.toString());
    this.currentPageChanged.next(this.currentPage);
  }
}
