import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { CategoryComponent } from './category/category.component';
import { AddCostComponent } from './add-cost/add-cost.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AddCategoryComponent } from './add-category/add-category.component';
import { IconListModule } from 'src/app/shared/icon-list/icon-list.module';
import { CastToGridSlotPipeModule } from 'src/app/shared/pipes/cast/cast-to-grid-slot.module';

@NgModule({
  declarations: [
    HomePage,
    CategoryComponent,
    AddCostComponent,
    AddCategoryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    IconListModule,
    CastToGridSlotPipeModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#03ce36',
      outerStrokeGradientStopColor: '#6cff0a',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      titleFontSize: '32',
      subtitleFontSize: '16',
      titleColor: '#fff',
      subtitleColor: '#888',
      animateTitle: false,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      startFromZero: false,
      responsive: true,
    }),
  ],
})
export class HomePageModule {}
