import { Component } from '@angular/core';
import {  Destino } from '../../services/destinos';
import { Destinos } from '../../services/destinos';


@Component({
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
