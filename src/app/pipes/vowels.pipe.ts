import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowels'
})
export class VowelsPipe implements PipeTransform {

  transform(value: string): string {
    let arrValue = value.split('');
    arrValue.map((item, i) => {
      if (item ==='A' || item ==='a') {
        arrValue.splice(i, 1, '4');
      } else if(item ==='E' || item ==='e') {
        arrValue.splice(i, 1, '3');
      } else if(item ==='I' || item ==='i') {
        arrValue.splice(i, 1, '1');
      } else if(item === 'O' || item === 'o') {
        arrValue.splice(i, 1, '0');
      } else if(item === 'U' || item === 'u') {
        arrValue.splice(i, 1, '5');
      }
    });
    return arrValue.join('');
  }

}
