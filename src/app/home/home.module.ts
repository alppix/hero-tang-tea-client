import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './home-container/home-container.component';
import { PromotionsModule } from '../promotions/promotions.module';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, PromotionsModule],
  declarations: [HomeContainerComponent]
})
export class HomeModule {}
