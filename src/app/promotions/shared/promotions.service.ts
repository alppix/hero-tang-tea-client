import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Promotion } from './promotion.model';

@Injectable()
export class PromotionsService {
  constructor(private apollo: Apollo) {}

  /**
   * Get available promotions.
   * @returns Observable of available promotions.
   */
  getAvailablePromotions$(): Observable<Promotion[]> {
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

    return this.apollo
      .watchQuery<Promotion[]>({ query })
      .valueChanges.pipe(
        map(({ data }: any) => data && data.availablePromotions)
      );
  }
}
