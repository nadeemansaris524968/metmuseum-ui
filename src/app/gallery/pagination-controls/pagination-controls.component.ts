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
  private _pageSize: number;
  currentPage: number;
  totalResults: number;
  currentPageSub: Subscription;
  totalResultsSub: Subscription;
  pageSizeSub: Subscription;

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

    this.currentPageSub =
      this.paginationService.currentPageSizeChanged.subscribe(
        (updatedPageSize) => {
          this._pageSize = updatedPageSize;
        }
      );
  }

  getTotalPages() {
    return Math.ceil(this.totalResults / this._pageSize);
  }

  ngOnDestroy(): void {
    this.currentPageSub.unsubscribe();
    this.totalResultsSub.unsubscribe();
    this.pageSizeSub.unsubscribe();
  }
}
