
import { Pipe, PipeTransform } from '@angular/core';
import { Destino } from '../services/destinos';

@Pipe({
  name: 'filtrarDestinos',
})
export class FiltrarDestinosPipe implements PipeTransform {

  transform(destinos: Destino[], textoBusqueda: string): Destino[] {
    if (!textoBusqueda || textoBusqueda.trim() === '') {
      return destinos;
    }

    return destinos.filter(destino =>
      destino.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
    );
  }
}
