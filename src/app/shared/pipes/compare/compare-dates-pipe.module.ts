import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompareDatesPipe } from './compare-dates.pipe';

@NgModule({
  declarations: [CompareDatesPipe],
  imports: [CommonModule],
  exports: [CompareDatesPipe],
})
export class CompareDatesPipeModule {}
