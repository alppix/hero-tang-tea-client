import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a Top Nav', () => {
    const topNavDebugElement: DebugElement = fixture.debugElement.query(
      By.css('ht-top-nav')
    );

    expect(!!topNavDebugElement).toBeTruthy();
  });

  it('should container a sidebar', () => {
    const sidebarDebugElement: DebugElement = fixture.debugElement.query(
      By.css('ht-sidebar')
    );

    expect(!!sidebarDebugElement).toBeTruthy();
  });

  it('should container a main container', () => {
    const mainContainerDebugElement: DebugElement = fixture.debugElement.query(
      By.css('#main-container')
    );

    expect(!!mainContainerDebugElement).toBeTruthy();
  });
});
