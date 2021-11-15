import { Pipe, PipeTransform } from '@angular/core';
import { GridSlot } from '../../models/category.model';

@Pipe({
  name: 'castToGridSlot',
})
export class CastToGridSlotPipe implements PipeTransform {
  transform(str: string): GridSlot {
    for (let i = 1; i <= 12; i++) {
      if (str === 'item-' + i) {
        return str as GridSlot;
      }
    }
    return null;
  }
}
