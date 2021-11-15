import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastToGridSlotPipe } from './cast-to-grid-slot.pipe';

@NgModule({
  declarations: [CastToGridSlotPipe],
  imports: [CommonModule],
  exports: [CastToGridSlotPipe],
})
export class CastToGridSlotPipeModule {}
