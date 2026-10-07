import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user-service';
import { Header } from '../../components/header/header';
import { Destino, Destinos } from '../../services/destinos';
import { Reservas } from '../../services/reservas';

@Component({
  selector: 'app-admin-usuarios',
  imports: [FormsModule, Header],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  usuarios: User[] = [];
  destinos: Destino[] = [];
  reservas: any[] = [];
   // Add this line
  reservasAgrupadas: {
  email: string;
  reservas: any[];
  }[] = [];

  usuarioEditando: User | null = null;
  destinoEditando: Destino | null = null;

  constructor(
    public userService: UserService,
    private destinosService: Destinos,
    private reservasService: Reservas,
    private cdr: ChangeDetectorRef
  ) {
   if (typeof window !== 'undefined') {

  this.userService.getAllUsersFirestore()
    .then((usuarios) => {
      this.usuarios = usuarios;
      this.cdr.detectChanges();
    })
    .catch((error) => {
      console.error('Error al obtener usuarios de Firestore:', error);
    });

}

    this.destinosService.getDestinosFirestore()

      .then( (datos) => {
       this.destinos = datos as Destino[];
       this.cdr.detectChanges();
  })
  .catch( (error) => {
    console.error('Error al obtener los destinos de Firestore:', error);
  });
  this.reservasService.getReservasFirestore()
  .then((reservas) => {
    this.reservas = reservas;
    this.agruparReservasPorEmail();
    this.cdr.detectChanges();
  })
  .catch((error) => {
    console.error('Error al obtener las reservas de Firestore:', error);
  });

  }

 
  eliminarUsuarioFirestore(usuario: User): void {

  if (!usuario.firestoreId) {
    return;
  }

  this.userService
    .eliminarUsuarioFirestore(usuario.firestoreId)
    .then(() => {

      this.usuarios = this.usuarios.filter(
        u => u.firestoreId !== usuario.firestoreId
      );

      this.cdr.detectChanges();
    })
    .catch((error) => {
      console.error('Error al eliminar usuario de Firestore:', error);
    });
}
  editar(usuario: User): void {
    this.usuarioEditando = { ...usuario };
  }

  nuevoUsuario(): void {
    this.usuarioEditando = {
      id: 0,
      nombre: '',
      email: '',
      contrasena: '',
      rol: 'user'
    };
  }
   nuevoDestino(): void {
  this.destinoEditando = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: ''
  };
}
 guardarDestino(): void {
  if (this.destinoEditando) {
    if (this.destinoEditando!.id !== 0) {

  const destinoActualizado = { ...this.destinoEditando! };

  this.destinosService.editarDestinoFirestore(
    String(destinoActualizado.id),
    {
      nombre: destinoActualizado.nombre,
      descripcion: destinoActualizado.descripcion,
      precio: destinoActualizado.precio,
      imagen: destinoActualizado.imagen
    }
  )
  .then(() => {

    this.destinos = this.destinos.map(destino =>
      String(destino.id) === String(destinoActualizado.id)
        ? destinoActualizado
        : destino
    );

    this.destinoEditando = null;
    this.cdr.detectChanges();

  })
  .catch((error) => {
    console.error('Error al editar destino en Firestore:', error);
  });

  return;
} 
    const nuevoDestino = {
      nombre: this.destinoEditando.nombre,
      descripcion: this.destinoEditando.descripcion,
      precio: this.destinoEditando.precio,
      imagen: this.destinoEditando.imagen
    };

    this.destinosService.agregarDestinoFirestore(nuevoDestino)
      .then((destinoCreado) => {

        this.destinos = [
          ...this.destinos,
          destinoCreado
        ];

        this.destinoEditando = null;

        this.cdr.detectChanges();
      })
      .catch((error) => {
        console.error('Error al agregar destino en Firestore:', error);
      });
  }
} 
 editarDestino(destino: Destino): void {
  this.destinoEditando = { ...destino };
} 
guardarCambios(): void {

  if (!this.usuarioEditando) {
    return;
  }

  if (!this.usuarioEditando.firestoreId) {

  this.userService
    .agregarUsuarioDesdeAdmin(this.usuarioEditando)
    .then(() => {
      return this.userService.getAllUsersFirestore();
    })
    .then((usuarios) => {
      this.usuarios = usuarios;
      this.usuarioEditando = null;
      this.cdr.detectChanges();
    })
    .catch((error) => {
      console.error('Error al agregar usuario:', error);
    });

  return;
}
  

  this.userService
    .editarUsuarioFirestore(this.usuarioEditando)
    .then(() => {

      return this.userService.getAllUsersFirestore();

    })
    .then((usuarios) => {

      this.usuarios = usuarios;
      this.usuarioEditando = null;
      this.cdr.detectChanges();

    })
    .catch((error) => {

      console.error('Error al editar usuario en Firestore:', error);

    });
}

 
  cambiarPrecio(destino: Destino): void {
  this.destinosService
    .editarPrecioFirestore(String(destino.id), destino.precio)
    .then(() => {
      alert('Precio actualizado correctamente');
    })
    .catch((error) => {
      console.error('Error al actualizar el precio en Firestore:', error);
    });
}
cambiarCupos(destino: Destino): void {
  const cupos = destino.cupos;

  if (cupos === undefined || !Number.isInteger(cupos) || cupos < 0) {
    alert('Ingresá una cantidad válida de cupos');
    return;
  }

  this.destinosService
    .editarCuposFirestore(String(destino.id), cupos)
    .then(() => {
      alert('Cupos actualizados correctamente');
    })
    .catch((error) => {
      console.error('Error al actualizar los cupos:', error);
      alert('No se pudieron actualizar los cupos');
    });
}
  eliminarDestino(id: number | string): void {
  this.destinosService.eliminarDestinoFirestore(String(id))
    .then(() => {
      this.destinos = this.destinos.filter(
        destino => String(destino.id) !== String(id)
      );

      this.cdr.detectChanges();
    })
    .catch((error) => {
      console.error('Error al eliminar destino de Firestore:', error);
    });
}
  agruparReservasPorEmail(): void {
  const grupos: { [email: string]: any[] } = {};

  for (const reserva of this.reservas) {

    const email = reserva.email || 'Sin email';

    if (!grupos[email]) {
      grupos[email] = [];
    }

    grupos[email].push(reserva);
  }

  this.reservasAgrupadas = Object.keys(grupos).map(email => ({
    email: email,
    reservas: grupos[email]
  }));
}
  cancelar(): void {
    this.usuarioEditando = null;
  }
  async asignarCuposIniciales() {
  try {
    const cantidad =
      await this.destinosService.inicializarCuposFirestore();

    alert(`Se asignaron cupos a ${cantidad} destinos`);

  } catch (error) {
    console.error('Error al asignar cupos:', error);
    alert('No se pudieron asignar los cupos');
  }
}
}

