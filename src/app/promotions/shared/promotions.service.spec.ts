import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule
} from 'apollo-angular/testing';
import gql from 'graphql-tag';

import { Promotion } from './promotion.model';
import { PromotionsService } from './promotions.service';

describe('PromotionsService', () => {
  let apolloTestingController: ApolloTestingController;
  let promotionsService: PromotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [PromotionsService]
    });
    apolloTestingController = TestBed.get(ApolloTestingController);
    promotionsService = TestBed.get(PromotionsService);
  });

  afterEach(() => {
    apolloTestingController.verify();
  });

  it('should be created', () => {
    expect(promotionsService).toBeTruthy();
  });

  describe('#getAvailablePromotions$', () => {
    const query = gql`
      query AvailablePromotions {
        availablePromotions {
          id
          imgSrc
          description
          link
        }
      }
    `;

    describe('On success', () => {
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

      it('should get available promotions', () => {
        promotionsService
          .getAvailablePromotions$()
          .subscribe((promotions: Promotion[]) => {
            expect(promotions).toEqual(testPromotions);
          });

        const testOperation = apolloTestingController.expectOne(query);

        testOperation.flush({ data: { availablePromotions: testPromotions } });
      });
    });

    describe('On error', () => {
      const testError = new Error('Test Error');

      it('should get an error', () => {
        promotionsService.getAvailablePromotions$().subscribe({
          error: error => {
            expect(error).toEqual(testError);
          }
        });

        const testOperation = apolloTestingController.expectOne(query);

        testOperation.networkError(testError);
      });
    });
  });
});
