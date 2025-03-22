import { Component, OnDestroy } from '@angular/core';
import { forkJoin, Observable, Subscription, switchMap } from 'rxjs';
import { ArtItem } from '../shared/model/art-item.model';
import { ArtService } from '../shared/services/art.service';

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

  constructor(private artService: ArtService) {
    this.artService.fetchArtObjectsIDs().subscribe((ids) => {
      this.loadPage();
    });

    this.artObjectIDSub = this.artService.artObjectIDsChanged.subscribe(() => {
      this.setCurrentPageLocalStorage(1);
      this.loadPage();
    });
  }

  ngOnDestroy(): void {
    this.artObjectIDSub.unsubscribe();
  }

  loadPage() {
    if (localStorage.getItem('currentPageNumber')) {
      this.currentPage = parseInt(localStorage.getItem('currentPageNumber'));
    } else {
      this.currentPage = 1;
      this.setCurrentPageLocalStorage(this.currentPage);
    }
    this.paginatedArtItems$ = this.artService
      .getPaginatedIDs(this.currentPage)
      .pipe(
        switchMap((objectIDs) => {
          const requests = objectIDs.map((id) =>
            this.artService.getArtDetails(id)
          );
          return forkJoin(requests);
        })
      );
  }

  incrementPageNumber() {
    this.currentPage += 1;
    this.setCurrentPageLocalStorage(this.currentPage);
    this.loadPage();
  }

  decrementPageNumber() {
    this.currentPage -= 1;
    this.setCurrentPageLocalStorage(this.currentPage);
    this.loadPage();
  }

  setCurrentPageLocalStorage(currentPage: number) {
    localStorage.setItem('currentPageNumber', currentPage.toString());
  }
}
