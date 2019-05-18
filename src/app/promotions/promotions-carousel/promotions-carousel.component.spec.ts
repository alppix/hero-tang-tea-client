import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, throwError } from 'rxjs';

import { PromotionsCarouselComponent } from './promotions-carousel.component';
import { Promotion } from '../shared/promotion.model';
import { PromotionsService } from '../shared/promotions.service';

class MockChangeDetectorRef {
  detectChanges(): void {}
}

class MockPromotionsService {
  getAvailablePromotions$(): Observable<any> {
    return of([]);
  }
}

const testError = new Error('Test Error');
const testPromotions: Promotion[] = [
  {
    id: 'TEST_001',
    link: 'http://test-001',
    description: 'Test promotion 1. ',
    imgSrc: 'http://test-img'
  },
  {
    id: 'TEST_002',
    link: 'http://test-002',
    description: 'Test promotion 2. ',
    imgSrc: 'http://test-img'
  },
  {
    id: 'TEST_003',
    link: 'http://test-003',
    description: 'Test promotion 3. ',
    imgSrc: 'http://test-img'
  }
];

describe('PromotionsCarouselComponent', () => {
  let component: PromotionsCarouselComponent;
  let fixture: ComponentFixture<PromotionsCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PromotionsCarouselComponent],
      providers: [
        { provide: ChangeDetectorRef, useClass: MockChangeDetectorRef },
        { provide: PromotionsService, useClass: MockPromotionsService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOninit', () => {
    describe('get available promotions ', () => {
      describe('Receives promotions', () => {
        beforeEach(() => {
          spyOn(
            (component as any).promotionsService,
            'getAvailablePromotions$'
          ).and.returnValue(of(testPromotions));
        });

        it('should update promotions', () => {
          component.ngOnInit();
          expect(component.promotions).toEqual(testPromotions);
        });
      });

      describe('Failed to get promotions', () => {
        beforeEach(() => {
          spyOn(
            (component as any).promotionsService,
            'getAvailablePromotions$'
          ).and.returnValue(throwError(testError));
        });

        it('should update error', () => {
          component.ngOnInit();
          expect(component.error).toEqual(testError);
        });
      });
    });
  });

  describe('#ngAfterView', () => {
    it('should call `changeDetectorRef.DetectChanges()`', () => {
      spyOn((component as any).changeDetectorRef, 'detectChanges');
      component.ngAfterViewInit();
      expect(
        (component as any).changeDetectorRef.detectChanges
      ).toHaveBeenCalled();
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe available promotion subscription', () => {
      spyOn((component as any).availablePromotionsSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(
        (component as any).availablePromotionsSubscription.unsubscribe
      ).toHaveBeenCalled();
    });
  });

  describe('loading promotions', () => {
    beforeEach(() => {
      component.isLoading = true;
      fixture.detectChanges();
    });

    it('should show loader', () => {
      const loaderDebugElement = fixture.debugElement.query(By.css('#loader'));
      expect(!!loaderDebugElement).toBeTruthy();
    });
  });

  describe('Not loading promotions', () => {
    describe('Receive promotions', () => {
      describe('Has at least one promotion', () => {
        beforeEach(() => {
          spyOn(
            (component as any).promotionsService,
            'getAvailablePromotions$'
          ).and.returnValue(of(testPromotions));
          component.ngOnInit();
          fixture.detectChanges();
        });

        it('should show promotions carousel', () => {
          const promotionsCarouselDebugElement = fixture.debugElement.query(
            By.css('#promotions-carousel')
          );
          expect(!!promotionsCarouselDebugElement).toBeTruthy();
        });
      });

      describe('No promotion', () => {
        beforeEach(() => {
          spyOn(
            (component as any).promotionsService,
            'getAvailablePromotions$'
          ).and.returnValue(of([]));
          component.ngOnInit();
          fixture.detectChanges();
        });

        it('should show no promotion message', () => {
          const noPromotionMessageDebugElement = fixture.debugElement.query(
            By.css('#no-promotion-message')
          );
          expect(!!noPromotionMessageDebugElement).toBeTruthy();
        });
      });
    });

    describe('Failed to load promotions', () => {
      beforeEach(() => {
        spyOn(
          (component as any).promotionsService,
          'getAvailablePromotions$'
        ).and.returnValue(throwError(testError));
        component.ngOnInit();
        fixture.detectChanges();
      });

      it('should show error message', () => {
        const errorMessageDebugElement = fixture.debugElement.query(
          By.css('#error-message')
        );
        expect(!!errorMessageDebugElement).toBeTruthy();
      });
    });
  });
});
