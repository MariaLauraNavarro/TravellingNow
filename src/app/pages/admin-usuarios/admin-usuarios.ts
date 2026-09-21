import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user-service';
import { Header } from '../../components/header/header';
import { Destino, Destinos } from '../../services/destinos';

@Component({
  selector: 'app-admin-usuarios',
  imports: [FormsModule, Header],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  usuarios: User[] = [];
  destinos: Destino[] = [];

  usuarioEditando: User | null = null;
  destinoEditando: Destino | null = null;

  constructor(
    public userService: UserService,
    private destinosService: Destinos,
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

  cancelar(): void {
    this.usuarioEditando = null;
  }
}

