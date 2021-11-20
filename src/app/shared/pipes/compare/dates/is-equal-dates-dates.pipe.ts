import { Pipe, PipeTransform } from '@angular/core';
import { isEqualDates } from '../../../utils/date.utils';

@Pipe({
  name: 'isEqualDates',
})
export class IsEqualDates implements PipeTransform {
  transform(date1: Date, date2: Date): boolean {
    return isEqualDates(date1, date2);
  }
}
