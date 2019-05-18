import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { Http500Component } from './http-500.component';

describe('Http500Component', () => {
  let component: Http500Component;
  let fixture: ComponentFixture<Http500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Http500Component],
      providers: [{ provide: RESPONSE, useValue: { status: () => {} } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http500Component);
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

      it('should set response status code as "500"', () => {
        spyOn(component as any, 'setResponseStatus');
        component.ngOnInit();
        expect((component as any).setResponseStatus).toHaveBeenCalledWith(500);
      });
    });
  });

  describe('#setResponseStatus', () => {
    it('should set response status with status code', () => {
      const response = (component as any).response;

      spyOn(response, 'status');
      (component as any).setResponseStatus(500);
      expect(response.status).toHaveBeenCalledWith(500);
    });
  });
});
