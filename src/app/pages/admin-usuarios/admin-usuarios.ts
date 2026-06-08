import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../services/user-service';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-admin-usuarios',
  imports: [FormsModule, Header],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  usuarios: User[] = [];

  usuarioEditando: User | null = null;

  constructor(private userService: UserService) {

    this.usuarios = this.userService.getAllUsers();

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
 

  cancelar(): void {

    this.usuarioEditando = null;

  }

}
