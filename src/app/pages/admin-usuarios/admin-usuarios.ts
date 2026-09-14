import { ChangeDetectorRef, Component } from '@angular/core';
//import { Component } from '@angular/core';
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
    private userService: UserService,
    private destinosService: Destinos,
    private cdr: ChangeDetectorRef
  ) {
    this.usuarios = this.userService.getAllUsers(); 

    this.destinosService.getDestinosFirestore()

      .then( (datos) => {
       this.destinos = datos as Destino[];
       this.cdr.detectChanges();
  })
  .catch( (error) => {
    console.error('Error al obtener los destinos de Firestore:', error);
  });

  }

  eliminar(id: number): void {
    this.userService.eliminarUsuario(id);
    this.usuarios = this.userService.getAllUsers();
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


  guardarCambios(): void {
    if (this.usuarioEditando) {
      if (this.usuarioEditando.id === 0) {
        this.userService.registrarUsuario(this.usuarioEditando);
      } else {
        this.userService.editarUsuario(this.usuarioEditando);
      }

      this.usuarios = this.userService.getAllUsers();
      this.usuarioEditando = null;
    }
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

