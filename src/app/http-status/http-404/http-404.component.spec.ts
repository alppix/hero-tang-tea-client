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
    describe('Platform is server', () => {
      beforeEach(() => {
        (component as any).isPlatformServer = true;
      });

      it('should set response status code as "404"', () => {
        spyOn(component as any, 'setResponseStatus');
        component.ngOnInit();
        expect((component as any).setResponseStatus).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('#setResponseStatus', () => {
    it('should set response status with status code', () => {
      const response = (component as any).response;

      spyOn(response, 'status');
      (component as any).setResponseStatus(404);
      expect(response.status).toHaveBeenCalledWith(404);
    });
  });
});
