import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen = false; // Close dropdown if clicked outside
    }
  }

  @HostListener('click') onHostClick() {
    this.isOpen = !this.isOpen; // Toggle dropdown on click
    console.log('toggle');
  }
}
