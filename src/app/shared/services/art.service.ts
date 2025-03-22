import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ArtDepartment } from '../model/art-department.model';
import { ArtItem } from '../model/art-item.model';

@Injectable({
  providedIn: 'root',
})
export class ArtService {
  private artItemCache = new Map<number, ArtItem>();
  private readonly _pageSize: number;
  private artObjectIDs: number[];

  artObjectIDsChanged = new BehaviorSubject<number[]>([]);
  artDepartmentsChanged = new BehaviorSubject<ArtDepartment[]>([]);

  constructor(private http: HttpClient) {
    this._pageSize = 10;
  }

  fetchArtObjectsIDs() {
    if (this.artObjectIDs) {
      return of({
        total: this.artObjectIDs.length,
        objectIDs: this.artObjectIDs,
      });
    }

    return this.http
      .get<{ total: number; objectIDs: number[] }>(environment.objectIDsURL)
      .pipe(
        tap((data) => {
          this.artObjectIDs = data.objectIDs;
          this.artObjectIDsChanged.next(this.artObjectIDs);
        })
      );
  }

  getArtObjectById(objectID: number) {
    const foundIndex = this.artObjectIDs.findIndex((id) => id === objectID);
    if (foundIndex >= 0) {
      this.artObjectIDs = this.artObjectIDs.filter((id) => id === objectID);
      this.artObjectIDsChanged.next(this.artObjectIDs);
    } else {
      this.artObjectIDs = [];
      this.artObjectIDsChanged.next(this.artObjectIDs);
    }
  }

  getPaginatedIDs(pageNumber: number): Observable<number[]> {
    const start = (pageNumber - 1) * this._pageSize;
    const end = start + this._pageSize;
    if (!this.artObjectIDs) {
      return of([]);
    }
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

  getDepartments() {
    return this.http
      .get<{ departments: ArtDepartment[] }>(environment.departmentsURL)
      .subscribe((data) => {
        this.artDepartmentsChanged.next(data.departments);
      });
  }
}
