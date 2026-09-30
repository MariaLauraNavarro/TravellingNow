import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { Header } from '../../components/header/header';
import { DatePipe } from '@angular/common';

interface ReservaUsuario {
  id: string;
  destinoNombre: string;
  precio: number;
  cantidadPasajeros: number;
  fechaViaje: string;
  fechaReserva?: any;
  total?: number;
}

@Component({
  selector: 'app-mis-reservas',
  imports: [Header, DatePipe],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.css',
})
export class MisReservas {

 reservas = signal<ReservaUsuario[]>([]);

 constructor(private cdr: ChangeDetectorRef) {
  if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        this.cargarMisReservas();
      }
    });
  }
}

  async cargarMisReservas() {

  const usuario = auth.currentUser;


  if (!usuario) {
    return;
  }

  const consulta = query(
    collection(db, 'reservas'),
    where('usuarioId', '==', usuario.uid)
  );

  const resultado = await getDocs(consulta);

  this.reservas.set(resultado.docs.map(documento => {
    const datos = documento.data();

    return {
      id: documento.id,
      destinoNombre: datos['destinoNombre'],
      precio: datos['precio'],
      cantidadPasajeros: datos['cantidadPasajeros'],
      fechaViaje: datos['fechaViaje'],
      fechaReserva: datos['fechaReserva'],
      total: datos['total'],
    };
  }));

  this.cdr.detectChanges();
}

} 