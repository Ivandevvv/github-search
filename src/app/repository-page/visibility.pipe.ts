import { Pipe, PipeTransform } from '@angular/core';
import { VisibilityEnum } from '../shared/types/github-response.interface';

@Pipe({
  name: 'visibility'
})
export class VisibilityPipe implements PipeTransform {

  transform(value: VisibilityEnum): string {
    return value === VisibilityEnum.public
      ? 'Публичный'
      : 'Приватный';
  }

}
