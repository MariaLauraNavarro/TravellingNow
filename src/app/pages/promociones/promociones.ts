import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/header/header';
@Component({
  selector: 'app-promociones',
  imports: [RouterLink,Header], 
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})

export class Promociones {
promociones = [
  {
    id:'b4w0Yz4HSSpRuGMbeMZY', 
    nombre: 'Córdoba',
    descripcion: 'Disfrutá de Córdoba con una promoción especial.',
    precio: 350000,
    imagenes: [
      '/img/cordoba1.jpg',
      '/img/cordoba2.jpg',
      '/img/cordoba3.jpg',
      '/img/cordoba4.jpg',
      '/img/cordoba5.jpg'
    ]
  },

  {
    id:'BZmKPEXWwWa9EDXmobSF',
    nombre: 'Mar del Plata',
    descripcion: 'Viví unos días frente al mar con una promoción especial.',
    precio: 300000,
    imagenes: [
      '/img/mardel1.jpg',
      '/img/mardel2.jpg',
      '/img/mardel3.jpg',
      '/img/mardel4.jpg',
      '/img/mardel5.jpg'
    ]
  },

  {
    id:'GkZo9ayuFc4E1H4Tm92z', 
    nombre: 'Mendoza',
    descripcion: 'Descubrí Mendoza y sus paisajes únicos.',
    precio: 380000,
    imagenes: [
      '/img/mendoza1.jpg',
      '/img/mendoza2.jpg',
      '/img/mendoza3.jpg',
      '/img/mendoza4.jpg',
      '/img/mendoza.jpg'
    ]
  },

  {
    id: 'M7zaYFaZDtn0NyDAs6Us', 
    nombre: 'Misiones',
    descripcion: 'Conocé Misiones y disfrutá de una experiencia inolvidable.',
    precio: 420000,
    imagenes: [
      '/img/misiones1.jpg',
      '/img/misiones2.jpg',
      '/img/misiones3.jpg',
      '/img/misiones4.jpg',
      '/img/misiones5.jpg'
    ]
  }
];
 imagenActual = [0, 0, 0, 0];
siguienteImagen(indice: number) {

  const promocion = this.promociones[indice];

  this.imagenActual[indice] =
    (this.imagenActual[indice] + 1) % promocion.imagenes.length;
}
anteriorImagen(indice: number) {
  const promocion = this.promociones[indice];

  this.imagenActual[indice] =
    (this.imagenActual[indice] - 1 + promocion.imagenes.length)
    % promocion.imagenes.length;
}
}