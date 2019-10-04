import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'enumToArray' })
export class EnumToArrayPipe implements PipeTransform {
  transform(value: Object): Object[] {
    let keys = [];
    const key = Object.keys(value);
    for (let i = 1; i < key.length; i += 2) {
      keys.push({ key: key[i], value: key[i - 1] });
    }

    return keys;
  }
}