import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: false,
})
export class ShortenTitlePipe implements PipeTransform {
  transform(artTitle: string): string {
    let shortenedTitle = artTitle;
    if (artTitle.length > 15) {
      shortenedTitle = artTitle.substring(0, 15) + ' ...';
    }
    return shortenedTitle;
  }
}
