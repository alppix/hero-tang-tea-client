import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { Http403Component } from './http-403.component';

describe('Http403Component', () => {
  let component: Http403Component;
  let fixture: ComponentFixture<Http403Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Http403Component],
      providers: [{ provide: RESPONSE, useValue: { status: () => {} } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should set response status code as "403"', () => {
      spyOn(component as any, 'setResponseStatus');
      component.ngOnInit();
      expect((component as any).setResponseStatus).toHaveBeenCalledWith(403);
    });
  });
});
