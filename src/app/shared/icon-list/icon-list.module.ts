import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconListComponent } from './icon-list.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [IconListComponent],
  imports: [CommonModule, IonicModule],
  exports: [IconListComponent],
})
export class IconListModule {}
