import { Component } from '@angular/core';
import {  Destino } from '../../services/destinos';
import { Destinos } from '../../services/destinos';
import { ItemDestiny } from "./item-destiny/item-destiny";
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';


@Component({
  imports: [ItemDestiny,Footer,Header],
  templateUrl: './destiny.html',
  styleUrl: './destiny.css',
})
export class Destiny {

  destinos: Destino[] = [];

  constructor(private destino: Destinos) {
    this.destinos = this.destino.getDestinos();
  }
}
