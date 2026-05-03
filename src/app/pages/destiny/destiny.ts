import { Component } from '@angular/core';
import{ Destino, Destinos } from '../../services/destinos';

@Component({
  selector: 'app-destiny',
  imports: [],
  templateUrl: './destiny.html',
  styleUrl: './destiny.css',
})
export class Destiny {

  destinos: Destino[] = [];

  constructor(private destino: Destinos) {
    this.destinos = this.destino.getDestinos();
  }


}
