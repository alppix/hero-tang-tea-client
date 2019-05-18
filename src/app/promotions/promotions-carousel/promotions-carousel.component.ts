import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';
import { Subscription } from 'rxjs';

import { Promotion } from '../shared/promotion.model';
import { PromotionsService } from '../shared/promotions.service';

@Component({
  selector: 'ht-promotions-carousel',
  templateUrl: './promotions-carousel.component.html',
  styleUrls: ['./promotions-carousel.component.scss']
})
export class PromotionsCarouselComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('promotionsCarousel') promotionsCarousel: NguCarousel<any>;
  carouselConfig: NguCarouselConfig;
  error: Error;
  isLoading = false;
  promotions: Promotion[];
  private availablePromotionsSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private promotionsService: PromotionsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.availablePromotionsSubscription = this.promotionsService
      .getAvailablePromotions$()
      .subscribe(
        (promotions: Promotion[]) => {
          this.promotions = promotions;
          this.carouselConfig = {
            grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
            interval: { timing: 4000, initialDelay: 1000 },
            load: this.promotions.length,
            loop: true,
            touch: true,
            velocity: 0.2
          };
          this.isLoading = false;
        },
        (error: Error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    /* istanbul ignore else */
    if (
      this.availablePromotionsSubscription &&
      this.availablePromotionsSubscription instanceof Subscription
    ) {
      this.availablePromotionsSubscription.unsubscribe();
    }
  }
}
