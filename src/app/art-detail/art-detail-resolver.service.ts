import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ArtItem } from '../shared/model/art-item.model';
import { ArtService } from '../shared/services/art.service';

@Injectable({
  providedIn: 'root',
})
export class ArtDetailResolverService implements Resolve<ArtItem> {
  constructor(private http: HttpClient, private artService: ArtService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ArtItem> {
    if (this.artService.getArtItem(+route.params['id'])) {
      return of(this.artService.getArtItem(+route.params['id']));
    }

    return this.http.get<ArtItem>(
      `${environment.objectURL}/${route.params['id']}`
    );
  }
}
