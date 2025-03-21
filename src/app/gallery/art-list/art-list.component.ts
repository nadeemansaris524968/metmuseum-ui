import { Component, Input } from '@angular/core';
import { ArtItem } from '../../shared/model/art-item.model';

@Component({
  selector: 'app-art-list',
  standalone: false,
  templateUrl: './art-list.component.html',
  styleUrl: './art-list.component.css',
})
export class ArtListComponent {
  @Input() artItems: ArtItem[];

  constructor() {}
}
