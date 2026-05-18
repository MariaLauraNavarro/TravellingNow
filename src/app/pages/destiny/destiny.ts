import { Component } from '@angular/core';
import {  Destino } from '../../services/destinos';
import { Destinos } from '../../services/destinos';
import { ItemDestiny } from "./item-destiny/item-destiny";
import { Footer } from '../../components/footer/footer';
import { FormsModule } from '@angular/forms';
import { Header } from '../../components/header/header';



@Component({
  imports:[ItemDestiny,Footer,FormsModule,Header],
  templateUrl: './destiny.html',
  styleUrl: './destiny.css',
})
export class Destiny {

  destinos: Destino[] = [];
  destinosFiltrados: Destino[] = [];// necesaria para el html
  textoBusqueda: string = '';// necesaria para el input

  constructor(private destinoService: Destinos) {
    this.destinos = this.destinoService.getDestinos();
    this.destinosFiltrados = this.destinos; // Inicialmente mostrar todos los destinos
  }
// Método para filtrar destinos según el texto de búsqueda
  filtrarDestinos() {
   if ( this.textoBusqueda.trim() === '') {
      this.destinosFiltrados = this.destinos;
    } else {
      this.destinosFiltrados = this.destinos.filter(destino =>
        destino.nombre.toLowerCase().includes(this.textoBusqueda.toLowerCase())
      );
    }
  }
}
