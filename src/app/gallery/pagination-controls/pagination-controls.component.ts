import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginationService } from '../../shared/services/pagination.service';

@Component({
  selector: 'app-pagination-controls',
  standalone: false,
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.css',
})
export class PaginationControlsComponent implements OnInit, OnDestroy {
  currentPage: number;
  currentPageSub: Subscription;

  @Output() moveToNextPage = new EventEmitter<void>();
  @Output() moveToPreviousPage = new EventEmitter<void>();

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {
    this.currentPageSub = this.paginationService.currentPageChanged.subscribe(
      (updatedPageNumber) => {
        this.currentPage = updatedPageNumber;
      }
    );
  }

  ngOnDestroy(): void {
    this.currentPageSub.unsubscribe();
  }
}
