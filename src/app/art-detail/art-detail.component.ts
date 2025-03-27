import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtItem } from '../shared/model/art-item.model';

@Component({
  selector: 'app-mm-result-detail',
  standalone: false,
  templateUrl: './art-detail.component.html',
  styleUrl: './art-detail.component.css',
})
export class ArtDetailComponent implements OnInit, OnDestroy {
  private routeDataSub: Subscription;
  artItem: ArtItem;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeDataSub = this.route.data.subscribe((data) => {
      this.artItem = data['artItem'];
    });
  }

  ngOnDestroy(): void {
    this.routeDataSub.unsubscribe();
  }
}
