import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compareDates',
})
export class CompareDatesPipe implements PipeTransform {
  transform(date1: Date, date2: Date): boolean {
    if (date1.getFullYear() === date2.getFullYear()) {
      if (date1.getMonth() === date2.getMonth()) {
        if (date1.getDay() === date2.getDay()) {
          return true;
        }
      }
    }

    return false;
  }
}
