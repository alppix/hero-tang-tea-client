import { Location } from '@angular/common';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { TopNavComponent } from './top-nav.component';
import { Routes } from '@angular/router';
import { Component, DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

@Component({ template: '' })
class StubComponent {}

describe('TopNavComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    const routes: Routes = [{ path: '', component: StubComponent }];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [StubComponent, TopNavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#handleLogoClick', () => {
    it('should navigate to root', fakeAsync(() => {
      const location = TestBed.get(Location);

      fixture.ngZone.run(() => {
        component.handleLogoClick();
        tick();
        expect(location.path()).toEqual('/');
      });
    }));
  });

  describe('#handleSidebarIconClick', () => {
    it('should emit sidebarIconClicked', () => {
      spyOn(component.sidebarIconClicked, 'emit');
      component.handleSidebarIconClick();
      expect(component.sidebarIconClicked.emit).toHaveBeenCalled();
    });
  });

  describe('Top Nav', () => {
    describe('Sidebar Icon container', () => {
      let sidebarIconContainerDebugElement: DebugElement;

      beforeEach(() => {
        sidebarIconContainerDebugElement = fixture.debugElement.query(
          By.css('#sidebar-icon-container')
        );
      });

      it('should contain a sidebar icon', () => {
        const sidebarIconDebugElement: DebugElement = sidebarIconContainerDebugElement.query(
          By.css('#sidebar-icon')
        );

        expect(!!sidebarIconDebugElement).toBeTruthy();
      });

      it('should call `handleSidebarIconClick()` on click', fakeAsync(() => {
        spyOn(component, 'handleSidebarIconClick');
        sidebarIconContainerDebugElement.nativeElement.click();
        tick();
        expect(component.handleSidebarIconClick).toHaveBeenCalled();
      }));
    });

    describe('Top Nav logo container', () => {
      let topNavLogoContainerDebugElement: DebugElement;

      beforeEach(() => {
        topNavLogoContainerDebugElement = fixture.debugElement.query(
          By.css('#top-nav-logo-container')
        );
      });

      it('should contain top nav logo', () => {
        const topNavLogoDebugElement: DebugElement = topNavLogoContainerDebugElement.query(
          By.css('#top-nav-logo')
        );

        expect(!!topNavLogoDebugElement).toBeTruthy();
      });

      it('should call `handleLogoClick()` on click', fakeAsync(() => {
        spyOn(component, 'handleLogoClick');
        topNavLogoContainerDebugElement.nativeElement.click();
        expect(component.handleLogoClick).toHaveBeenCalled();
      }));
    });
  });
});
