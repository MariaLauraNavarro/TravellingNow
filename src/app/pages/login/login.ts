import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  myUser = {
    email: '',
    contrasena: ''
  };

  errorMessage: string = '';
  emailError: boolean = false;
  passwordError: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ingresar() {
    this.emailError = false;
    this.passwordError = false;
    this.errorMessage = '';

    if (!this.myUser.email || !this.myUser.email.includes('@')) {
      this.emailError = true;
    }

    if (!this.myUser.contrasena || this.myUser.contrasena.length < 8) {
      this.passwordError = true;
    }

    if (this.emailError || this.passwordError) {
      return;
    }

    const valido = this.userService.validarUsuario(
      this.myUser.email,
      this.myUser.contrasena
    );

    if (valido) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Email o contraseña incorrectos';
    }
  }

  limpiarErrorEmail() {
    this.emailError = false;
    this.errorMessage = '';
  }

  limpiarErrorPassword() {
    this.passwordError = false;
    this.errorMessage = '';
  }
}