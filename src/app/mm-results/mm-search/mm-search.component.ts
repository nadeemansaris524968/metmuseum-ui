import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mm-search',
  standalone: false,
  templateUrl: './mm-search.component.html',
  styleUrl: './mm-search.component.css',
})
export class MmSearchComponent {
  @ViewChild('idQuery') idQuery: ElementRef;
  @ViewChild('titleQuery') titleQuery: ElementRef;
  @ViewChild('departmentFilter') departmentFilter: ElementRef;

  onSubmit() {
    console.log(
      `ID: ${this.idQuery.nativeElement.value}, Title: ${this.titleQuery.nativeElement.value}, Department Filter: ${this.departmentFilter.nativeElement.value}`
    );
  }
}
