import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IconCreatorComponent } from './icon-creator.component';
import { IconListComponent } from './icon-list/icon-list.component';
import { ColorListComponent } from './color-list/color-list.component';

@NgModule({
  declarations: [IconCreatorComponent, IconListComponent, ColorListComponent],
  imports: [CommonModule, IonicModule],
  exports: [IconCreatorComponent],
})
export class IconCreatorModule {}
