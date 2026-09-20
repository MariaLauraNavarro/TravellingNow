import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { FormsModule } from '@angular/forms';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
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

  constructor(private cdr: ChangeDetectorRef) {
  if (typeof window !== 'undefined') {
    this.cargarOpiniones();
  }
}

  async cargarOpiniones() {

  const resultado = await getDocs(
    collection(db, 'opiniones')
  );
  

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
  await this.cargarOpiniones();
}
}
