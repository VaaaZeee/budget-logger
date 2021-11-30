import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { CastToGridSlotPipeModule } from 'src/app/shared/pipes/cast/cast-to-grid-slot.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CategoryComponent } from './category/category.component';
import { AddCostComponent } from './add-cost/add-cost.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { IconCreatorModule } from 'src/app/shared/icon-createor/icon-creator.module';
import { IsEqualDatesPipeModule } from 'src/app/shared/pipes/compare/dates/is-equal-dates-pipe.module';
import { SetMounthlyGoalComponent } from './set-mounthly-goal/set-mounthly-goal.component';

@NgModule({
  declarations: [
    CategoriesPage,
    CategoryComponent,
    AddCostComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    SetMounthlyGoalComponent,
  ],
  imports: [
    CommonModule,
    CategoriesPageRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    CastToGridSlotPipeModule,
    IconCreatorModule,
    IsEqualDatesPipeModule,
    NgCircleProgressModule.forRoot({
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#03ce36',
      outerStrokeGradientStopColor: '#6cff0a',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'Cél',
      titleFontSize: '32',
      subtitleFontSize: '16',
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
export class CategoriesPageModule {}
