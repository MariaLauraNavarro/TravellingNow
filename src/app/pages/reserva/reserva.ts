import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destino, Destinos } from '../../services/destinos';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase.config';


@Component({
  selector: 'app-reserva',
  imports: [FormsModule],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',
})
export class Reserva {

  destino: Destino | null = null;
  destinoId: string | null = null;
  nombreApellido: string = '';
  email: string = '';
  cantidadPasajeros: number = 1;
  fechaViaje: string = '';  

 constructor(
  private route: ActivatedRoute,
  private destinosService: Destinos,
  private cdr: ChangeDetectorRef
) {
  this.destinoId = this.route.snapshot.paramMap.get('id');
  if (this.destinoId) {
  this.destinosService.getDestinosFirestore()
    .then((destinos) => {
      this.destino =
        destinos.find(
          destino => String(destino.id) === String(this.destinoId)
        ) as Destino || null;

        this.cdr.detectChanges();
    });
  }
 }
 async confirmarReserva() {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert('Debés iniciar sesión para realizar una reserva');
    return;
  }

  if (
    !this.destino ||
    !this.nombreApellido ||
    !this.email ||
    !this.fechaViaje ||
    this.cantidadPasajeros < 1
  ) {
    alert('Completá todos los datos de la reserva');
    return;
  }

  await addDoc(
    collection(db, 'reservas'),
    {
      destinoId: this.destino.id,
      destinoNombre: this.destino.nombre,
      precio: this.destino.precio,
      nombreApellido: this.nombreApellido,
      email: this.email,
      cantidadPasajeros: this.cantidadPasajeros,
      fechaViaje: this.fechaViaje,
      usuarioId: usuario.uid,
      fechaReserva: serverTimestamp()
    }
  );

  alert('Reserva realizada correctamente');
}
}
