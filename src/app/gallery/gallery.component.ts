import { Component, OnDestroy } from '@angular/core';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
} from 'rxjs';
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
  paginatedArtItems$: Observable<ArtItem[]> = new Observable();
  artObjectIDSub: Subscription;

  constructor(
    private artService: ArtService,
    private paginationService: PaginationService
  ) {
    this.artService.fetchAllArtData().subscribe(() => {
      this.loadPage();
    });

    this.artObjectIDSub =
      this.artService.artObjectIDsToDisplayChanged.subscribe(() => {
        this.loadPage();
      });
  }

  ngOnDestroy(): void {
    this.artObjectIDSub.unsubscribe();
  }

  loadPage() {
    this.paginatedArtItems$ = this.artService.getPaginatedIDs().pipe(
      switchMap((objectIDs) => {
        const requests = objectIDs.map((id) =>
          this.artService.getArtDetails(id).pipe(catchError(() => of(null)))
        );
        return forkJoin(requests).pipe(
          map((results: ArtItem[]) => results.filter((item) => item !== null))
        );
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
