import { Component, OnInit } from '@angular/core';
import { ArtItem } from '../../shared/model/art-item.model';
import { ArtObjectResult } from '../../shared/model/art-object-result.model';
import { ArtService } from '../../shared/services/art.service';

@Component({
  selector: 'app-art-list',
  standalone: false,
  templateUrl: './art-list.component.html',
  styleUrl: './art-list.component.css',
})
export class ArtListComponent implements OnInit {
  artObjectResult: ArtObjectResult;
  artItems: ArtItem[];

  constructor(private artService: ArtService) {
    this.artService.artItemsChanged.subscribe((updatedArtItems) => {
      this.artItems = updatedArtItems;
    });
  }

  ngOnInit(): void {
    this.artItems = this.artService.getArtItems();
  }
}
