import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private currentPage: number;
  private pageSize = 20;

  currentPageChanged = new BehaviorSubject<number>(0);

  constructor() {
    this.currentPage = localStorage.getItem('currentPageNumber')
      ? parseInt(localStorage.getItem('currentPageNumber'))
      : 1;
    localStorage.setItem('currentPageNumber', this.currentPage.toString());
    this.currentPageChanged.next(this.currentPage);
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPageSize() {
    return this.pageSize;
  }

  resetCurrentPage() {
    localStorage.setItem('currentPageNumber', '1');
    this.currentPage = 1;
    this.currentPageChanged.next(this.currentPage);
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
