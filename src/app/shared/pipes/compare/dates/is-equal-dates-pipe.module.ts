import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsEqualDates } from './is-equal-dates-dates.pipe';

@NgModule({
  declarations: [IsEqualDates],
  imports: [CommonModule],
  exports: [IsEqualDates],
})
export class IsEqualDatesPipeModule {}
