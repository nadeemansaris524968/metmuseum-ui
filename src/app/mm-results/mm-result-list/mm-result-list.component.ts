import { Component, OnInit } from '@angular/core';
import { ArtItem } from '../../shared/model/art-item.model';
import { ArtService } from '../../shared/services/art.service';

@Component({
  selector: 'app-mm-result-list',
  standalone: false,
  templateUrl: './mm-result-list.component.html',
  styleUrl: './mm-result-list.component.css',
})
export class MmResultListComponent implements OnInit {
  artItems: ArtItem[];

  constructor(private artService: ArtService) {}

  ngOnInit(): void {
    this.artItems = this.artService.getArtItems();
  }
}
