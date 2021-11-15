import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, IonicModule],
  exports: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {}
