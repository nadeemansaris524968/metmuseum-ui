import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ArtItem } from '../shared/model/art-item.model';

@Component({
  selector: 'app-mm-result-detail',
  standalone: false,
  templateUrl: './art-detail.component.html',
  styleUrl: './art-detail.component.css',
})
export class ArtDetailComponent implements OnInit {
  artItem: Observable<ArtItem>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.artItem = this.route.data.pipe(map((data) => data['artItem']));
  }
}
