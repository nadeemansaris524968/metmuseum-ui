import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GalleryDisplayMode } from '../enum/gallery-display-mode.enum';
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
  private artObjectIDsToDisplay: number[];
  private displayMode: GalleryDisplayMode = GalleryDisplayMode.ALL;

  totalArtObjects: number;
  totalArtObjectsChanged = new BehaviorSubject<number>(0);
  artObjectIDsToDisplayChanged = new BehaviorSubject<number[]>([]);
  artDepartmentsChanged = new BehaviorSubject<ArtDepartment[]>([]);

  constructor(
    private http: HttpClient,
    private paginationService: PaginationService
  ) {
    this._pageSize = this.paginationService.getPageSize();
  }

  fetchAllArtData() {
    if (this.artObjectIDs) {
      return of();
    }

    return this.http
      .get<{ total: number; objectIDs: number[] }>(environment.objectURL)
      .pipe(
        tap((data) => {
          this.totalArtObjects = data.total;
          this.artObjectIDs = data.objectIDs;
          this.totalArtObjectsChanged.next(this.totalArtObjects);
        })
      );
  }

  private handleResults(
    displayMode: GalleryDisplayMode,
    data: { total: number; objectIDs: number[] | null } | ArtItem
  ) {
    this.paginationService.resetCurrentPage();
    this.displayMode = displayMode;
    if (data instanceof ArtItem) {
      this.totalArtObjects = 1;
      this.artObjectIDs = [data.objectID];
    } else {
      this.totalArtObjects = data.total;
      this.artObjectIDs = data.objectIDs ? data.objectIDs : [];
    }
    this.totalArtObjectsChanged.next(this.totalArtObjects);
    this.artObjectIDsToDisplayChanged.next(this.artObjectIDs);
  }

  getArtObjectsBySearch(searchParams: { title: string; departmentId: string }) {
    const params = new HttpParams()
      .set('title', false)
      .set('q', searchParams.title)
      .set('departmentId', searchParams.departmentId);
    this.http
      .get<{ total: number; objectIDs: number[] | null }>(
        environment.searchURL,
        { params }
      )
      .subscribe((data) => this.handleResults(GalleryDisplayMode.ALL, data));
  }

  getArtObjectById(objectID: number) {
    this.http
      .get<ArtItem>(`${environment.objectURL}/${objectID}`)
      .subscribe((data) =>
        this.handleResults(
          GalleryDisplayMode.SINGLE,
          new ArtItem(data.objectID)
        )
      );
  }

  getPaginatedIDs(): Observable<number[]> {
    const pageNumber = this.paginationService.getCurrentPage();
    const start = (pageNumber - 1) * this._pageSize;
    const end = start + this._pageSize;
    if (!this.artObjectIDs) {
      return of([]);
    }

    switch (this.displayMode) {
      case GalleryDisplayMode.ALL:
        this.artObjectIDsToDisplay = this.artObjectIDs.slice(start, end);
        break;
      case GalleryDisplayMode.SINGLE:
        this.artObjectIDsToDisplay = this.artObjectIDs;
        break;
    }

    return of(this.artObjectIDsToDisplay);
  }

  getArtDetails(objectID: number): Observable<ArtItem> {
    if (this.artDisplayCache.has(objectID)) {
      return of(this.artDisplayCache.get(objectID));
    }
    return this.http.get<ArtItem>(`${environment.objectURL}/${objectID}`).pipe(
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
