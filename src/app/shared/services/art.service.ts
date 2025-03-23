import { HttpClient, HttpParams } from '@angular/common/http';
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
  private artDisplayCache = new Map<number, ArtItem>();
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

  fetchAllArtObjects() {
    if (this.artObjectIDs) {
      return of();
    }

    return this.http
      .get<{ total: number; objectIDs: number[] }>(environment.objectIDsURL)
      .pipe(
        tap((data) => {
          this.artObjectIDs = data.objectIDs;
          // this.artObjectIDsChanged.next(this.artObjectIDs);
        })
      );
  }

  getArtObjectsBySearch(searchParams: {
    title: string;
    departmentId: string;
  }): Observable<{ total: number; objectIDs: number[] | null }> {
    const params = new HttpParams()
      .set('title', false)
      .set('q', searchParams.title)
      .set('departmentId', searchParams.departmentId);
    return this.http.get<{ total: number; objectIDs: number[] | null }>(
      environment.searchURL,
      { params }
    );
  }

  getArtObjectById(objectID: number) {
    const foundIndex = this.artObjectIDs.findIndex((id) => id === objectID);
    if (foundIndex >= 0) {
      this.artObjectIDsToDisplay = this.artObjectIDs.filter(
        (id) => id === objectID
      );
      // this.artObjectIDs = this.artObjectIDs.filter((id) => id === objectID);
    } else {
      // this.artObjectIDs = [];
      this.artObjectIDsToDisplay = [];
    }
    // this.artObjectIDsChanged.next(this.artObjectIDs);
    this.artObjectIDsToDisplayChanged.next(this.artObjectIDsToDisplay);
  }

  getPaginatedIDs(): Observable<number[]> {
    const pageNumber = this.paginationService.getCurrentPage();
    const start = (pageNumber - 1) * this._pageSize;
    const end = start + this._pageSize;
    if (!this.artObjectIDs) {
      return of([]);
    }
    // update for single art by id retrieval
    this.artObjectIDsToDisplay = this.artObjectIDs.slice(start, end);
    return of(this.artObjectIDsToDisplay);
  }

  getArtDetails(objectID: number): Observable<ArtItem> {
    if (this.artDisplayCache.has(objectID)) {
      return of(this.artDisplayCache.get(objectID));
    }
    return this.http
      .get<ArtItem>(`${environment.objectIDsURL}/${objectID}`)
      .pipe(
        tap((artItem) => {
          this.artDisplayCache.set(objectID, artItem);
        })
      );
  }

  getArtItem(objectID: number) {
    return this.artDisplayCache.get(objectID);
  }

  getDepartments() {
    return this.http
      .get<{ departments: ArtDepartment[] }>(environment.departmentsURL)
      .subscribe((data) => {
        this.artDepartmentsChanged.next(data.departments);
      });
  }
}
