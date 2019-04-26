import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { Http404Component } from './http-404.component';

describe('Http404Component', () => {
  let component: Http404Component;
  let fixture: ComponentFixture<Http404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Http404Component],
      providers: [{ provide: RESPONSE, useValue: { status: () => {} } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set response status code as "404"', () => {
      spyOn(component as any, 'setResponseStatus');
      component.ngOnInit();
      expect((component as any).setResponseStatus).toHaveBeenCalledWith(404);
    });
  });
});
