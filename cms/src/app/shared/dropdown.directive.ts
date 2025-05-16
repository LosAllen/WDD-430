import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private isOpen = false;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  @HostListener('click')
  toggleDropdown() {
    this.isOpen = !this.isOpen;
    const hostEl = this.elRef.nativeElement;               // <div class="dropdown" appDropdown>
    const menuEl = hostEl.querySelector('.dropdown-menu'); // <ul class="dropdown-menu">

    if (!menuEl) return;

    // Toggle 'show' on the menu
    if (this.isOpen) {
      this.renderer.addClass(menuEl, 'show');
      this.renderer.addClass(hostEl, 'show');  // Bootstrap 5 shows arrow via this
    } else {
      this.renderer.removeClass(menuEl, 'show');
      this.renderer.removeClass(hostEl, 'show');
    }
  }
}