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
    this.destinosService.getDestinosApi().subscribe({

      next: (datos) => {
       this.destinos = datos;
       this.cdr.detectChanges();
  },
  error: (error) => {
    console.error('Error al obtener los destinos:', error);
  }
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
     if (this.destinoEditando) {// evita guardar sino hay un destino en edición

        const nuevoDestino = {
           nombre: this.destinoEditando.nombre,
           descripcion: this.destinoEditando.descripcion,
           precio: this.destinoEditando.precio,
           imagen: this.destinoEditando.imagen
        };
        this.destinosService.agregarDestinoApi(nuevoDestino).subscribe({
         next: (destinoCreado) => {
          console.log('Destino creado recibido en Angular:', destinoCreado);

          this.destinos = [...this.destinos, destinoCreado];
          this.destinoEditando = null;

          this.cdr.detectChanges();// fuerzo a Angular aactualizar la vista inmediatamente

          console.log('destinoEditando después de guardar:', this.destinoEditando);
         }
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
   this.destinosService.editarDestinoApi(destino.id, {
    precio: destino.precio
   }).subscribe({
     next: () => {
      alert('Precio actualizado correctamente');
     }
   });
  }
  eliminarDestino(id: number): void {
  this.destinosService.eliminarDestinoApi(id).subscribe({
    next: () => {
      this.destinos = this.destinos.filter(destino => destino.id !== id);
      this.cdr.detectChanges();
    }
  });
  }

  cancelar(): void {
    this.usuarioEditando = null;
  }
}

