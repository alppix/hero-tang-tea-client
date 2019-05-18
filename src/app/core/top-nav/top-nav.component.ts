import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ht-top-nav',
  templateUrl: './top-nav.component.html'
})
export class TopNavComponent {
  @Output() sidebarIconClicked = new EventEmitter();

  constructor(private router: Router) {}

  /**
   * Click logo event handler.
   */
  handleLogoClick(): void {
    this.router.navigateByUrl('/');
  }

  /**
   * Click sidebar icon handler.
   */
  handleSidebarIconClick(): void {
    this.sidebarIconClicked.emit();
  }
}
