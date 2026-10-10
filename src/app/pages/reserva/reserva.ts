import { onAuthStateChanged } from 'firebase/auth';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Destino, Destinos } from '../../services/destinos';
import { FormsModule } from '@angular/forms';
import { auth } from '../../firebase.config';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-reserva',
  imports: [FormsModule,Header],
  templateUrl: './reserva.html',
  styleUrl: './reserva.css',
})
export class Reserva {

  destino: Destino | null = null;
  destinoId: string | null = null;
  nombreApellido: string = '';
  email: string = '';
  cantidadPasajeros: number = 1;
  procesandoReserva: boolean = false;
  idSolicitud: string | null = null;
  fechaDesde: string = '';
  fechaHasta: string = '';  

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
  onAuthStateChanged(auth, (usuario) => {
  if (usuario?.email) {
    this.email = usuario.email;
    this.cdr.detectChanges();
  }
});
 }

async confirmarReserva() {

  const usuario = auth.currentUser;

  if (!usuario) {
    alert('Debés iniciar sesión para realizar una reserva');
    return;
  }

  if (
    !this.destino ||
    !this.nombreApellido.trim() ||
    !this.email ||
    !this.fechaDesde ||
    !this.fechaHasta ||
    !Number.isInteger(this.cantidadPasajeros) ||
    this.cantidadPasajeros < 1
  ) {
    alert('Completá todos los datos de la reserva');
    return;
  }

  if (this.fechaHasta < this.fechaDesde) {
    alert('La fecha hasta no puede ser anterior a la fecha desde');
    return;
  }
   if (this.procesandoReserva) {
  return;
}

this.procesandoReserva = true;

if (!this.idSolicitud) {
  this.idSolicitud = crypto.randomUUID();
}

try {
  const token = await usuario.getIdToken();
    const respuesta = await fetch('https://travelling-now.vercel.app/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        idSolicitud: this.idSolicitud,
        destinoId: String(this.destino.id),
        nombreApellido: this.nombreApellido,
        cantidadPasajeros: this.cantidadPasajeros,
        fechaDesde: this.fechaDesde,
        fechaHasta: this.fechaHasta
      })
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      const mensajes: Record<string, string> = {
        CUPOS_INSUFICIENTES: 'No quedan suficientes cupos',
        CUPOS_NO_CONFIGURADOS: 'Este destino no tiene cupos configurados',
        DESTINO_NO_EXISTE: 'El destino no existe',
        PRECIO_INVALIDO: 'El precio del destino no es válido'
      };

      alert(mensajes[resultado.mensaje] || resultado.mensaje ||
        'No se pudo realizar la reserva');
      return;
    }

    alert('Reserva realizada correctamente');
    this.idSolicitud = null;

  } catch (error) {
    console.error('Error al confirmar la reserva:', error);
    alert('No se pudo conectar con el servidor');
  } finally {
    this.procesandoReserva = false;
  }
}
}
 
  
