import { Component, OnDestroy } from '@angular/core';
import { forkJoin, Observable, Subscription, switchMap } from 'rxjs';
import { ArtItem } from '../shared/model/art-item.model';
import { ArtService } from '../shared/services/art.service';
import { PaginationService } from '../shared/services/pagination.service';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnDestroy {
  currentPage: number;
  paginatedArtItems$: Observable<ArtItem[]> = new Observable();
  artObjectIDSub: Subscription;
  currentPgSub: Subscription;

  constructor(
    private artService: ArtService,
    private paginationService: PaginationService
  ) {
    this.artService.fetchAllArtObjects().subscribe(() => {
      this.loadPage();
    });

    this.currentPgSub = this.paginationService.currentPageChanged.subscribe(
      (updatedPgNo) => {
        this.currentPage = updatedPgNo;
      }
    );

    this.artObjectIDSub =
      this.artService.artObjectIDsToDisplayChanged.subscribe(() => {
        this.loadPage();
      });
  }

  ngOnDestroy(): void {
    this.artObjectIDSub.unsubscribe();
    this.currentPgSub.unsubscribe();
  }

  loadPage() {
    this.paginatedArtItems$ = this.artService.getPaginatedIDs().pipe(
      switchMap((objectIDs) => {
        const requests = objectIDs.map((id) =>
          this.artService.getArtDetails(id)
        );
        return forkJoin(requests);
      })
    );
  }

  incrementPageNumber() {
    this.paginationService.moveToNextPage();
    this.loadPage();
  }

  decrementPageNumber() {
    this.paginationService.moveToPreviousPage();
    this.loadPage();
  }
}
