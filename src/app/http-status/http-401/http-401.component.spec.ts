import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { Http401Component } from './http-401.component';

describe('Http401Component', () => {
  let component: Http401Component;
  let fixture: ComponentFixture<Http401Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Http401Component],
      providers: [{ provide: RESPONSE, useValue: { status: () => {} } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http401Component);
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

      it('should set response status code as "401"', () => {
        spyOn(component as any, 'setResponseStatus');
        component.ngOnInit();
        expect((component as any).setResponseStatus).toHaveBeenCalledWith(401);
      });
    });
  });

  describe('#setResponseStatus', () => {
    it('should set response status with status code', () => {
      const response = (component as any).response;

      spyOn(response, 'status');
      (component as any).setResponseStatus(401);
      expect(response.status).toHaveBeenCalledWith(401);
    });
  });
});
