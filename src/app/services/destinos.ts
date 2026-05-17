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
  nombre:"Argentina,Bariloche",
  descripcion:" ",
  precio:1000000,
  imagen:"/img/Bariloche.jpg",
},
{
  id:2,
  nombre:"Argentina,Calafate",
  descripcion:" ",
  precio:1200000,
  imagen:"/img/calafate.jpg",
}, 
{
  id:3,
  nombre:"Brasil, Rio de Janeiro",
  descripcion:" ",
  precio:2000000,
  imagen:"/img/brazil.png",
},
{
  id:4,
  nombre:" Mexico,Playa del Carmen",
  descripcion:" ",
  precio:2500000,
  imagen:"/img/delcarmen.jpg",
},
 {
  id:5,
  nombre:"Argentina,Cataratas del Iguazú",
  descripcion:" ",
  precio:1000000,
  imagen:"/img/cataratas-iguazu.jpg",
},
{
  id:6,
  nombre:"Suiza",
  descripcion:" ",
  precio:1200000,
  imagen:"/img/suiza.jpg",
}, 
{
  id:7,
  nombre:"Grecia, Santorini",
  descripcion:" ",
  precio:2000000,
  imagen:"/img/Grecia.jpg",
},
{
  id:8,
  nombre:"Perú",
  descripcion:" ",
  precio:2500000,
  imagen:"/img/peru.jpg",
},
{
  id:9,
  nombre:"Italia,Cerdeña",
  descripcion:" ",
  precio:2500000,
  imagen:"/img/Cerdeña.jpg",
},
{
  id:10,
  nombre:"Italia, Florencia",
  descripcion:"Es una joya del norte de Italia,cuna del Renacimiento, con su impresionante arquitectura, su rica historia artística y su vibrante cultura italiana, es un destino fascinante para los amantes del arte y la cultura, que ofrece una experiencia inolvidable al explorar sus calles empedradas y sus tesoros artísticos.",
  precio:2500000,
  imagen:"/img/Florencia.jpg",
},
{
  id:11,
  nombre:"Italia, Roma",
  descripcion:"Ciudad llena de historia, arte y cultura, con su impresionante arquitectura, sus monumentos icónicos y su vibrante vida urbana, es un destino fascinante para los amantes de la historia y la cultura italiana, que ofrece una experiencia inolvidable al explorar sus calles empedradas y sus tesoros artísticos.",
  precio:2500000,
  imagen:"/img/Roma.jpg",
},
{
  id:12,
  nombre:"Italia, Venecia",
  descripcion:"Con su encanto único, sus canales románticos y su rica historia cultural, es un destino fascinante para los amantes del arte, la arquitectura y la cultura italiana, que ofrece una experiencia inolvidable al explorar sus calles empedradas y sus impresionantes monumentos.",
  precio:2500000,
  imagen:"/img/Venecia.jpg",
},
{
  id:13,
  nombre:"Italia Coliseo",
  descripcion:"Con su impresionante arquitectura y su rica historia, es un destino fascinante para los amantes de la historia y la cultura, que ofrece una experiencia única al explorar sus ruinas milenarias y sumergirse en la grandeza del Imperio Romano.",
  precio:2500000,
  imagen:"/img/Coliseo.jpg",
},
{
  id:14,
  nombre:"Mexico, Chichen Itza",
  descripcion:" Un sitio arqueológico impresionante que revela la grandeza de la civilización maya, con su icónica pirámide de Kukulcán y su rica historia cultural, es un destino fascinante para los amantes de la historia y la arqueología.",
  precio:2500000,
  imagen:"/img/ChichenItza.jpg",
},                
{
  id:15,
  nombre:"Italia,Verona",
  descripcion:" Una ciudad llena de historia y romance, famosa por ser el escenario de la tragedia de Romeo y Julieta, con su impresionante arquitectura y su vibrante cultura italiana, es un destino que cautiva a los visitantes con su encanto único.",
  precio:2500000,
  imagen:"/img/Verona.jpg",
},
{
  id:16,
  nombre:" Mexico, Tulum",
  descripcion:" Uno de los paraisos mas hermosos del mundo, con sus playas de aguas cristalinas y su rica historia maya, es un destino imperdible para los amantes de la naturaleza y la cultura.",
  precio:2500000,
  imagen:"/img/Tulum.jpg",
}                 
  ];

   constructor() { } 

  getDestinos(): Destino[] {
    return this.destinos;
  }
}
