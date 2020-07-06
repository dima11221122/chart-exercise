import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueFormatter'
})
export class ValueFormatterPipe implements PipeTransform {

  transform(value: number): string {
    const suffixes = ['k', 'M', 'B'];

    if (isNaN(value)) {
      return null;
    }

    if (value < 1000) {
      return value + '';
    }

    const exp = Math.floor(Math.log(value) / Math.log(1000));
    return (value / Math.pow(1000, exp)).toFixed() + suffixes[exp - 1];
  }

}
