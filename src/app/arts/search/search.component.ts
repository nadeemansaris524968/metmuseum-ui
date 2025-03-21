import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @ViewChild('idQuery') idQuery: ElementRef;
  @ViewChild('titleQuery') titleQuery: ElementRef;
  @ViewChild('departmentFilter') departmentFilter: ElementRef;

  onSubmit() {
    console.log(
      `ID: ${this.idQuery.nativeElement.value}, Title: ${this.titleQuery.nativeElement.value}, Department Filter: ${this.departmentFilter.nativeElement.value}`
    );
  }
}
