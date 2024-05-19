import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'StatusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: string): any {
    if (value === 'TR') {
      return 'consulté';
    } else if (value === 'ENC') {
      return 'à consulter aujourdhui';
    } else if (value === 'CRE') {
      return 'nouveau';
    }else if (value === 'ETR') {
      return 'en cours de consultation';
    }else if (value === 'ANL') {
      return 'annulé';
    }else {
      return value;
    }
  }

}
