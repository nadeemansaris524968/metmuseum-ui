import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
    this.paginatedArtItems$ = this.artService.getPaginatedIDs();
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
