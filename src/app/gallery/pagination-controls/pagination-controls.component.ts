import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtService } from '../../shared/services/art.service';
import { PaginationService } from '../../shared/services/pagination.service';

@Component({
  selector: 'app-pagination-controls',
  standalone: false,
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.css',
})
export class PaginationControlsComponent implements OnInit, OnDestroy {
  currentPage: number;
  totalResults: number;
  currentPageSub: Subscription;
  totalResultsSub: Subscription;

  @Output() moveToNextPage = new EventEmitter<void>();
  @Output() moveToPreviousPage = new EventEmitter<void>();

  constructor(
    private paginationService: PaginationService,
    private artService: ArtService
  ) {}

  ngOnInit(): void {
    this.currentPageSub = this.paginationService.currentPageChanged.subscribe(
      (updatedPageNumber) => {
        this.currentPage = updatedPageNumber;
      }
    );
    this.totalResultsSub = this.artService.totalArtObjectsChanged.subscribe(
      (updatedTotalResults) => {
        this.totalResults = updatedTotalResults;
      }
    );
  }

  getTotalPages() {
    return Math.ceil(this.totalResults / 10);
  }

  ngOnDestroy(): void {
    this.currentPageSub.unsubscribe();
    this.totalResultsSub.unsubscribe();
  }
}
