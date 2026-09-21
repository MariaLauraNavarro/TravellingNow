import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase.config';
import Chart from 'chart.js/auto';

export interface Opinion {
  id?: string;
  destino: string;
  comentario: string;
  puntuacion: number;
  usuarioEmail: string;
  usuarioId: string;
  fecha?: any;
}

@Component({
  selector: 'app-opiniones',
  imports: [Header, FormsModule, DatePipe],
  templateUrl: './opiniones.html',
  styleUrl: './opiniones.css',
})
export class Opiniones {

  destinoSeleccionado: string = '';
  comentario: string = '';
  puntuacion: number = 5;
  opiniones = signal<Opinion[]>([]);
  opinionEditandoId: string | null = null;
  graficoPuntuaciones: Chart | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  if (typeof window !== 'undefined') {
    this.cargarOpiniones();
  }
}

 cargarOpiniones() {

  onSnapshot(
   query(
  collection(db, 'opiniones'),
  orderBy('fecha', 'desc')
),
    (resultado) => {

      this.opiniones.set(
        resultado.docs.map(documento => {

          const datos = documento.data();

          return { 
            id: documento.id,
            destino: datos['destino'],
            comentario: datos['comentario'],
            puntuacion: datos['puntuacion'],
            usuarioEmail: datos['usuarioEmail'],
            usuarioId: datos['usuarioId'],
            fecha: datos['fecha']
          };

        })
      );

      this.cdr.detectChanges();
      this.crearGraficoPuntuaciones();
    }
  );

}
crearGraficoPuntuaciones() {

  const canvas = document.getElementById(
    'graficoPuntuaciones'
  ) as HTMLCanvasElement;

  if (!canvas) return;

  const cantidades = [1, 2, 3, 4, 5].map(puntuacion =>
    this.opiniones().filter(
      opinion => opinion.puntuacion === puntuacion
    ).length
  );

  if (this.graficoPuntuaciones) {

    this.graficoPuntuaciones.data.datasets[0].data = cantidades;
    this.graficoPuntuaciones.update();

  } else {

    this.graficoPuntuaciones = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Muy mala', 'Mala', 'Regular', 'Buena', 'Muy buena'],
        datasets: [
  {
    label: 'Cantidad de opiniones',
    data: cantidades,
    backgroundColor: [
      '#e74c3c',
      '#e67e22',
      '#f1c40f',
      '#2ecc71',
      '#27ae60'
    ]
  }
]
      }
    });

  }
}
obtenerDescripcionPuntuacion(puntuacion: number): string {
  switch (puntuacion) {
    case 1:
      return 'Muy mala';
    case 2:
      return 'Mala';
    case 3:
      return 'Regular';
    case 4:
      return 'Buena';
    case 5:
      return 'Muy buena';
    default:
      return '';
  }
}
  async eliminarOpinion(id: string) {

  const confirmar = confirm('¿Querés eliminar esta opinión?');

  if (!confirmar) {
    return;
  }

  await deleteDoc(
    doc(db, 'opiniones', id)
  );

 
}
  editarOpinion(opinion: Opinion) {

  this.opinionEditandoId = opinion.id || null;
  this.destinoSeleccionado = opinion.destino;
  this.comentario = opinion.comentario;
  this.puntuacion = opinion.puntuacion;

}
  async publicarOpinion() {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert('Debés iniciar sesión para publicar una opinión');
    return;
  }

  if (!this.destinoSeleccionado || !this.comentario) {
    alert('Completá el destino y el comentario');
    return;
  }

 if (this.opinionEditandoId) {

  await updateDoc(
    doc(db, 'opiniones', this.opinionEditandoId),
    {
      destino: this.destinoSeleccionado,
      comentario: this.comentario,
      puntuacion: this.puntuacion
    }
  );

  this.opinionEditandoId = null;

} else {

  await addDoc(
    collection(db, 'opiniones'),
    {
      destino: this.destinoSeleccionado,
      comentario: this.comentario,
      puntuacion: this.puntuacion,
      usuarioEmail: usuario.email,
      usuarioId: usuario.uid,
      fecha: serverTimestamp()
    }
  );

}
this.destinoSeleccionado = '';
this.comentario = '';
this.puntuacion = 5;

this.cdr.detectChanges();
  
}
}
