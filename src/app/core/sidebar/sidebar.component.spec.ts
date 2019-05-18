import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SidebarComponent } from './sidebar.component';

@Component({ template: '' })
class StubComponent {}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async(() => {
    const routes: Routes = [{ path: 'test', component: StubComponent }];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [SidebarComponent, StubComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleSidebarItemClick', () => {
    const testUrl = '/test';

    beforeEach(() => {
      spyOn(component as any, 'toggleSidebar');
    });

    it('should navigate to specified URL', fakeAsync(() => {
      const location = TestBed.get(Location);

      component.handleSidebarItemClick(testUrl);
      tick();
      expect(location.path()).toEqual(testUrl);
    }));

    it('should toggle sidebar', () => {
      component.handleSidebarItemClick(testUrl);
      expect((component as any).toggleSidebar).toHaveBeenCalled();
    });
  });

  describe('Sidebar', () => {
    it('should contain drinks menu item', () => {
      const drinksMenuItemDebugElement = fixture.debugElement.query(
        By.css('#drinks-menu-item')
      );
      expect(!!drinksMenuItemDebugElement).toBeTruthy();
    });
  });
});
