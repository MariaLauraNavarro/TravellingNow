import { Component } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html', // Asegúrate que este nombre coincida con tu archivo HTML
  styleUrl: './login.css',
})
export class Login {
  // Inicializamos el objeto User
  public myUser: User = {} as User;
  
  // Variables para controlar los errores visuales
  public errorMessage: string = '';
  public emailError: boolean = false;
  public passwordError: boolean = false;

  constructor(public userService: UserService,
  private router: Router) {}
  ingresar(): void {
    // 1. Limpiar errores previos
    this.errorMessage = '';
    this.emailError = false;
    this.passwordError = false;

    // 2. Validar campos vacíos
    if (!this.myUser.email || !this.myUser.contrasena) {
      this.errorMessage = '️ Complete todos los campos';
      if (!this.myUser.email) this.emailError = true;
      if (!this.myUser.contrasena) this.passwordError = true;
      return;
    }

    // 3. Validar Formato de Email (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.myUser.email)) {
      this.errorMessage = '⚠️ El formato del email no es válido';
      this.emailError = true;
      return;
    }

    // 4. Validar Longitud de Contraseña (8 caracteres)
    if (this.myUser.contrasena.length < 8) {
      this.errorMessage = '⚠️ La contraseña debe tener al menos 8 caracteres';
      this.passwordError = true;
      return;
    }

    // 5. Si pasó todo, llamar al Servicio
    const usuarioValido = this.userService.validarUsuario(
      this.myUser.email,
      this.myUser.contrasena
    );

    if (usuarioValido) {
      // Login exitoso
      console.log('Usuario logueado:', this.userService.UsuarioLogueado);
      this.router.navigate(['/home']); // Redirige a la página principal después del login exitoso
      // Aquí podrías redirigir, ej: this.router.navigate(['/home']);
    } else {
      // Credenciales incorrectas (pero el formato estaba bien)
      this.errorMessage = '⚠️ Usuario o contraseña incorrectos';
      // Opcional: marcar ambos como error visual
      this.emailError = true;
      this.passwordError = true;
    }
  }

  // Métodos auxiliares para limpiar el error cuando el usuario empieza a escribir
  limpiarErrorEmail() {
    this.emailError = false;
    if (this.errorMessage.includes('email')) this.errorMessage = '';
  }

  limpiarErrorPassword() {
    this.passwordError = false;
    if (this.errorMessage.includes('contraseña')) this.errorMessage = '';
  }
}
/* anterior*/
/*import { Component } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public myUser: User= <User>{};
  constructor( public userService : UserService){}

  ingresar(): void {

    if(!this.myUser.email || !this.myUser.contrasena){

      alert('Complete todos los campos');
      return;

    }

    const usuarioValido = this.userService.validarUsuario(
      this.myUser.email,
      this.myUser.contrasena
    );

    if(usuarioValido){

      alert('Login correcto');

      console.log(this.userService.UsuarioLogueado);

    }else{

      alert('Usuario o contraseña incorrectos');

    }

  }

}*/

