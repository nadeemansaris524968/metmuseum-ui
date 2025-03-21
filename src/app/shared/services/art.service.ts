import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ArtItem } from '../model/art-item.model';

@Injectable({
  providedIn: 'root',
})
export class ArtService {
  artObjectIDs: number[];
  private artItemCache = new Map<number, ArtItem>();
  private readonly _pageSize: number;
  artItemsChanged = new EventEmitter<ArtItem[]>();

  constructor(private http: HttpClient) {
    this._pageSize = 10;
  }

  fetchArtObjectsIDs() {
    return this.http
      .get<{ total: number; objectIDs: number[] }>(environment.objectIDsURL)
      .pipe(
        tap((data) => {
          this.artObjectIDs = data.objectIDs;
        })
      );
  }

  getPaginatedIDs(pageNumber: number): Observable<number[]> {
    const start = (pageNumber - 1) * this._pageSize;
    const end = start + this._pageSize;
    return of(this.artObjectIDs.slice(start, end));
  }

  getArtDetails(objectID: number): Observable<ArtItem> {
    if (this.artItemCache.has(objectID)) {
      return of(this.artItemCache.get(objectID));
    }
    return this.http
      .get<ArtItem>(`${environment.objectIDsURL}/${objectID}`)
      .pipe(
        tap((artItem) => {
          this.artItemCache.set(objectID, artItem);
        })
      );
  }

  getArtItem(objectID: number) {
    return this.artItemCache.get(objectID);
  }
}
