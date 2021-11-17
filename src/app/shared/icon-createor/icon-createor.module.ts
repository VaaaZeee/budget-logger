import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IconCreateorComponent } from './icon-createor.component';
import { IconListComponent } from './icon-list/icon-list.component';
import { ColorListComponent } from './color-list/color-list.component';

@NgModule({
  declarations: [IconCreateorComponent, IconListComponent, ColorListComponent],
  imports: [CommonModule, IonicModule],
  exports: [IconCreateorComponent],
})
export class IconCreateorModule {}
