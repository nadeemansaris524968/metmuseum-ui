import { EventEmitter, Injectable } from '@angular/core';
import { ArtItem } from '../model/art-item.model';

@Injectable({
  providedIn: 'root',
})
export class ArtService {
  artObjectIDs: number[];
  private readonly _pageSize: number;
  artItemsChanged = new EventEmitter<ArtItem[]>();

  constructor() {
    this._pageSize = 10;
  }

  artItems: ArtItem[] = [
    new ArtItem(
      34,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/204788.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/204788.jpg',
      [],
      'The American Wing',
      'Forestville Manufacturing Company',
      'Acorn Clock',
      'Forestville Manufacturing Company',
      '1847–50',
      'Mahogany, laminated',
      '24 3/8 x 14 5/8 x 5 1/8 in. (61.9 x 37.1 x 13 cm)',
      'Gift of Mrs. Paul Moore, 1970',
      'Bristol',
      'Connecticut',
      'United States',
      '',
      ''
    ),
    new ArtItem(
      34,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/204788.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/204788.jpg',
      [],
      'The American Wing',
      'Forestville Manufacturing Company',
      'Acorn Clock',
      'Forestville Manufacturing Company',
      '1847–50',
      'Mahogany, laminated',
      '24 3/8 x 14 5/8 x 5 1/8 in. (61.9 x 37.1 x 13 cm)',
      'Gift of Mrs. Paul Moore, 1970',
      'Bristol',
      'Connecticut',
      'United States',
      '',
      ''
    ),
    new ArtItem(
      34,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/204788.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/204788.jpg',
      [],
      'The American Wing',
      'Forestville Manufacturing Company',
      'Acorn Clock',
      'Forestville Manufacturing Company',
      '1847–50',
      'Mahogany, laminated',
      '24 3/8 x 14 5/8 x 5 1/8 in. (61.9 x 37.1 x 13 cm)',
      'Gift of Mrs. Paul Moore, 1970',
      'Bristol',
      'Connecticut',
      'United States',
      '',
      ''
    ),
    new ArtItem(
      34,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/204788.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/204788.jpg',
      [],
      'The American Wing',
      'Forestville Manufacturing Company',
      'Acorn Clock',
      'Forestville Manufacturing Company',
      '1847–50',
      'Mahogany, laminated',
      '24 3/8 x 14 5/8 x 5 1/8 in. (61.9 x 37.1 x 13 cm)',
      'Gift of Mrs. Paul Moore, 1970',
      'Bristol',
      'Connecticut',
      'United States',
      '',
      ''
    ),
    new ArtItem(
      38,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/DP247753.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/DP247753.jpg',
      ['https://images.metmuseum.org/CRDImages/ad/original/DP247755.jpg'],
      'The American Wing',
      'Figure',
      'Figure of Admiral Samuel Hood',
      'Pierre Stephan',
      'ca. 1785',
      'Earthenware, basalt',
      'H. 12 3/8 in. (31.4 cm)',
      'Harris Brisbane Dick Fund, 1938',
      '',
      '',
      'England',
      '',
      'https://www.metmuseum.org/art/collection/search/38'
    ),
    new ArtItem(
      38,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/DP247753.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/DP247753.jpg',
      ['https://images.metmuseum.org/CRDImages/ad/original/DP247755.jpg'],
      'The American Wing',
      'Figure',
      'Figure of Admiral Samuel Hood',
      'Pierre Stephan',
      'ca. 1785',
      'Earthenware, basalt',
      'H. 12 3/8 in. (31.4 cm)',
      'Harris Brisbane Dick Fund, 1938',
      '',
      '',
      'England',
      '',
      'https://www.metmuseum.org/art/collection/search/38'
    ),
    new ArtItem(
      38,
      false,
      'https://images.metmuseum.org/CRDImages/ad/original/DP247753.jpg',
      'https://images.metmuseum.org/CRDImages/ad/web-large/DP247753.jpg',
      ['https://images.metmuseum.org/CRDImages/ad/original/DP247755.jpg'],
      'The American Wing',
      'Figure',
      'Figure of Admiral Samuel Hood',
      'Pierre Stephan',
      'ca. 1785',
      'Earthenware, basalt',
      'H. 12 3/8 in. (31.4 cm)',
      'Harris Brisbane Dick Fund, 1938',
      '',
      '',
      'England',
      '',
      'https://www.metmuseum.org/art/collection/search/38'
    ),
  ];

  getArtItems(pageNumber: number = 1): ArtItem[] {
    if (pageNumber < 1 || this._pageSize < 1) {
      return [];
    }

    const startIndex = (pageNumber - 1) * this._pageSize;
    const endIndex = startIndex + this._pageSize;
    const result = this.artItems.slice(startIndex, endIndex);

    return result;
  }

  getArtItem(objectID: number) {
    return this.artItems.find((item) => item.objectID === objectID);
  }
}
