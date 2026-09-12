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
  this.destinoService.getDestinosApi().subscribe({
    next: (datos) => {
      this.destinos = datos;
      this.destinosFiltrados = datos;
    },
    error: (error) => {
      console.error('Error al obtener los destinos:', error);
    }
  });
}
agregarDestino() {
  const nuevoDestino = {// no pongo id porq lo genera express, y el id es autoincremental
    nombre: 'España, Madrid',
    descripcion: 'Madrid es la capital de España, conocida por su cultura, arquitectura y gastronomía.',
    precio: 2300000,
    imagen: '/img/madrid.jpg'
  };
  this.destinoService.agregarDestinoApi(nuevoDestino).subscribe();
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
