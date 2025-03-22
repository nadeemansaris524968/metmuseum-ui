import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ArtDepartment } from '../model/art-department.model';
import { ArtItem } from '../model/art-item.model';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root',
})
export class ArtService {
  private artItemCache = new Map<number, ArtItem>();
  private readonly _pageSize: number;
  private artObjectIDs: number[];

  artObjectIDsToDisplay: number[];

  artObjectIDsToDisplayChanged = new BehaviorSubject<number[]>([]);
  artObjectIDsChanged = new BehaviorSubject<number[]>([]);
  artDepartmentsChanged = new BehaviorSubject<ArtDepartment[]>([]);

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {
    this._pageSize = 10;
  }

  fetchArtObjectsIDs() {
    if (this.artObjectIDs) {
      return of();
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
      this.artObjectIDsToDisplay = this.artObjectIDs.filter(
        (id) => id === objectID
      );
      this.artObjectIDs = this.artObjectIDs.filter((id) => id === objectID);
    } else {
      this.artObjectIDs = [];
      this.artObjectIDsToDisplay = [];
    }
    this.artObjectIDsChanged.next(this.artObjectIDs);
    this.artObjectIDsToDisplayChanged.next(this.artObjectIDsToDisplay);
  }

  getPaginatedIDs(): Observable<number[]> {
    const pageNumber = this.paginationService.getCurrentPage();
    const start = (pageNumber - 1) * this._pageSize;
    const end = start + this._pageSize;
    if (!this.artObjectIDs) {
      return of([]);
    }
    this.artObjectIDsToDisplay = this.artObjectIDs.slice(start, end);
    this.artObjectIDsToDisplayChanged.next(this.artObjectIDsToDisplay);
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
