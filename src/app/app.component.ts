import { Component } from '@angular/core';

declare const $: any;

@Component({
  selector: 'ht-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarElementId = 'left-sidebar';

  /* istanbul ignore next */
  /**
   * Sidebar icon click event handler.
   */
  handleSidebarIconClicked(): void {
    ($(`#${this.sidebarElementId}`) as any).sidebar('toggle');
  }
}
