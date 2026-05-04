import { Injectable } from '@angular/core';


export interface Destino {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Injectable({
  providedIn: 'root',
})

export class Destinos {

 
  private destinos: Destino[] = [
  {
  id:1,
  nombre:" Bariloche",
  descripcion:" ",
  precio:1000000,
  imagen:"Bariloche.jpg",
},
{
  id:2,
  nombre:"Calafate",
  descripcion:" ",
  precio:1200000,
  imagen:"calafate.jpg",
}, 
{
  id:3,
  nombre:"Brasil",
  descripcion:" ",
  precio:2000000,
  imagen:"brazil.png",
},
{
  id:4,
  nombre:"Playa del Carmen",
  descripcion:" ",
  precio:2500000,
  imagen:"delcarmen.jpg",
},
 {
  id:5,
  nombre:"Cataratas del Iguazú",
  descripcion:" ",
  precio:1000000,
  imagen:"cataratas-iguazu.jpg",
},
{
  id:6,
  nombre:"Suiza",
  descripcion:" ",
  precio:1200000,
  imagen:"suiza.jpg",
}, 
{
  id:7,
  nombre:"Italia",
  descripcion:" ",
  precio:2000000,
  imagen:"/italia.jpg",
},
{
  id:8,
  nombre:"Perú",
  descripcion:" ",
  precio:2500000,
  imagen:"/peru.jpg",
}
    
  ];

   constructor() { } 

  getDestinos(): Destino[] {
    return this.destinos;
  }
}
