import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { PromotionsCarouselComponent } from './promotions-carousel/promotions-carousel.component';
import { PromotionsService } from './shared/promotions.service';

@NgModule({
  imports: [CommonModule, NguCarouselModule],
  declarations: [PromotionsCarouselComponent],
  providers: [PromotionsService],
  exports: [PromotionsCarouselComponent]
})
export class PromotionsModule {}
