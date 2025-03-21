import { Component } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { ArtItem } from '../shared/model/art-item.model';
import { ArtService } from '../shared/services/art.service';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  currentPage: number;
  paginatedArtItems$: Observable<ArtItem[]> = new Observable();

  constructor(private artService: ArtService) {
    this.artService.fetchArtObjectsIDs().subscribe((ids) => {
      this.loadPage();
    });
  }

  loadPage() {
    if (localStorage.getItem('currentPageNumber')) {
      this.currentPage = parseInt(localStorage.getItem('currentPageNumber'));
    } else {
      this.currentPage = 1;
      localStorage.setItem('currentPageNumber', this.currentPage.toString());
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
    localStorage.setItem('currentPageNumber', this.currentPage.toString());
    this.loadPage();
  }

  decrementPageNumber() {
    this.currentPage -= 1;
    localStorage.setItem('currentPageNumber', this.currentPage.toString());
    this.loadPage();
  }
}
