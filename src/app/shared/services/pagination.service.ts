import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConstants } from '../constants/AppConstants';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private currentPage: number;
  private pageSize = 10;

  currentPageChanged = new BehaviorSubject<number>(0);

  constructor() {
    this.currentPage = localStorage.getItem(AppConstants.CURRENT_PAGE_NUMBER)
      ? parseInt(localStorage.getItem(AppConstants.CURRENT_PAGE_NUMBER))
      : 1;
    localStorage.setItem(
      AppConstants.CURRENT_PAGE_NUMBER,
      this.currentPage.toString()
    );
    this.currentPageChanged.next(this.currentPage);
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPageSize() {
    return this.pageSize;
  }

  resetCurrentPage() {
    localStorage.setItem(AppConstants.CURRENT_PAGE_NUMBER, '1');
    this.currentPage = 1;
    this.currentPageChanged.next(this.currentPage);
  }

  moveToNextPage() {
    this.currentPage += 1;
    localStorage.setItem(
      AppConstants.CURRENT_PAGE_NUMBER,
      this.currentPage.toString()
    );
    this.currentPageChanged.next(this.currentPage);
  }

  moveToPreviousPage() {
    this.currentPage -= 1;
    localStorage.setItem(
      AppConstants.CURRENT_PAGE_NUMBER,
      this.currentPage.toString()
    );
    this.currentPageChanged.next(this.currentPage);
  }
}
