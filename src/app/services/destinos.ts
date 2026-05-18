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
  descripcion:" Bariloche (San Carlos de Bariloche) es el destino turístico más importante de la Patagonia argentina. Ubicada en la provincia de Río Negro y rodeada por el Parque Nacional Nahuel Huapi, la ciudad es mundialmente famosa por su arquitectura estilo alpino, su gastronomía chocolatera y sus imponentes paisajes de montañas y lagos glaciares",
  precio:1000000,
  imagen:"/img/Bariloche.jpg",
},
{
  id:2,
  nombre:"Argentina,Calafate",
  descripcion:"Calafate es una ciudad en la provincia de Santa Cruz, Argentina, conocida por su entorno natural impresionante y su proximidad a los glaciares.",
  precio:1200000,
  imagen:"/img/calafate.jpg",
}, 
{
  id:3,
  nombre:"Brasil, Rio de Janeiro",
  descripcion:" Rio de Janeiro es una ciudad costera en Brasil, famosa por su arquitectura moderna, sus playas de surf y el Carnaval, que destaca con desfiles coloridos y música en vivo.",
  precio:2000000,
  imagen:"/img/brazil.png",
},
{
  id:4,
  nombre:" Mexico,Playa del Carmen",
  descripcion:"Playa del Carmen es una ciudad costera en México, famosa por sus hermosas playas, su vida nocturna vibrante y su proximidad a los arrecifes de coral.",
  precio:2500000,
  imagen:"/img/delcarmen.jpg",
},
 {
  id:5,
  nombre:"Argentina,Cataratas del Iguazú",
  descripcion:"Las Cataratas del Iguazú, declaradas una de las Siete Maravillas Naturales del Mundo, son un impresionante conjunto de 275 saltos de agua. Ubicadas en la provincia de Misiones, el 80 % de ellas se encuentran del lado argentino dentro del Parque Nacional Iguazú. ",
  precio:1000000,
  imagen:"/img/cataratas-iguazu.jpg",
},
{
  id:6,
  nombre:"Suiza",
  descripcion:"Suiza es un país europeo conocido por sus paisajes alpinos, sus lagos cristalinos y su cultura multilingüe.",
  precio:1200000,
  imagen:"/img/suiza.jpg",
}, 
{
  id:7,
  nombre:"Grecia, Santorini",
  descripcion:"Santorini es una isla griega famosa por sus paisajes espectaculares, sus pueblos blancos y sus atardeceres coloridos.",
  precio:2000000,
  imagen:"/img/Grecia.jpg",
},
{
  id:8,
  nombre:"Perú",
  descripcion:"Perú es un país sudamericano conocido por su rica historia inca, sus paisajes variados y su gastronomía diversa.",
  precio:2500000,
  imagen:"/img/peru.jpg",
},
{
  id:9,
  nombre:"Italia,Cerdeña",
  descripcion:"Cerdeña es una isla italiana famosa por sus paisajes naturales, sus playas de aguas cristalinas y su rica historia cultural.",
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
