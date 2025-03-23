import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArtItem } from '../shared/model/art-item.model';
import { ArtService } from '../shared/services/art.service';

@Component({
  selector: 'app-mm-result-detail',
  standalone: false,
  templateUrl: './art-detail.component.html',
  styleUrl: './art-detail.component.css',
})
export class ArtDetailComponent implements OnInit, OnDestroy {
  private routeParamSub: Subscription;
  artItem: ArtItem;

  constructor(private route: ActivatedRoute, private artService: ArtService) {}

  ngOnInit(): void {
    this.artItem = this.artService.getArtItem(
      parseInt(this.route.snapshot.params['id'])
    );
    this.routeParamSub = this.route.params.subscribe((params) => {
      this.artItem = this.artService.getArtItem(parseInt(params['id']));
    });
  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
  }
}
