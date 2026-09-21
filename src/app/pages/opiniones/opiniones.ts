import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, serverTimestamp, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase.config';

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
  imports: [Header, FormsModule],
  templateUrl: './opiniones.html',
  styleUrl: './opiniones.css',
})
export class Opiniones {

  destinoSeleccionado: string = '';
  comentario: string = '';
  puntuacion: number = 5;
  opiniones = signal<Opinion[]>([]);
  opinionEditandoId: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {
  if (typeof window !== 'undefined') {
    this.cargarOpiniones();
  }
}

 cargarOpiniones() {

  onSnapshot(
    collection(db, 'opiniones'),
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
    }
  );

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
