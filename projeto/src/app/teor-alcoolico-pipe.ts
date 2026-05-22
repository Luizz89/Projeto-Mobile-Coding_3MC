import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teorAlcoolico'
})
export class TeorAlcoolicoPipe implements PipeTransform {

  transform(valor: number): string {
    if (valor <= 10) {
      return 'Drink Suave';
    }

    if (valor <= 20) {
      return 'Drink Médio';
    }

    return 'Drink Forte';
  }

}