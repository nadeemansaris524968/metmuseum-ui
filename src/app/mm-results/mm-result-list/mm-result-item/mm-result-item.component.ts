import { Component, Input } from '@angular/core';
import { ArtItem } from '../../../shared/model/art-item.model';

@Component({
  selector: 'app-mm-result-item',
  standalone: false,
  templateUrl: './mm-result-item.component.html',
  styleUrl: './mm-result-item.component.css',
})
export class MmResultItemComponent {
  @Input() artItem: ArtItem;
}
