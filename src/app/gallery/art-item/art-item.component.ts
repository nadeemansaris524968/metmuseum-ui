import { Component, Input } from '@angular/core';
import { ArtItem } from '../../shared/model/art-item.model';

@Component({
  selector: 'app-art-item',
  standalone: false,
  templateUrl: './art-item.component.html',
  styleUrl: './art-item.component.css',
})
export class ArtItemComponent {
  @Input() artItem: ArtItem;
}
