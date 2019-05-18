import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'ht-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() elementId: string;

  constructor(private router: Router) {}

  /**
   * Handle sidebar item click event.
   * @param url - URL to navigate.
   */
  handleSidebarItemClick(url: string): void {
    this.router.navigateByUrl(url);
    this.toggleSidebar();
  }

  /* istanbul ignore next */
  /**
   * Toggle sidebar.
   */
  private toggleSidebar(): void {
    ($(`#${this.elementId}`) as any).sidebar('toggle');
  }
}
