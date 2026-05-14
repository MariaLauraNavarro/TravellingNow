import { Component } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  public myUser: User = {} as User;
  public confirmPassword: string = '';
  
  // Variables para controlar errores
  public errorMessage: string = '';
  public successMessage: string = '';
  public nombreError: boolean = false;
  public emailError: boolean = false;
  public passwordError: boolean = false;
  public confirmError: boolean = false;

  constructor(public userService: UserService) {}

  registrar(): void {
    // Limpiar mensajes previos
    this.errorMessage = '';
    this.successMessage = '';
    this.nombreError = false;
    this.emailError = false;
    this.passwordError = false;
    this.confirmError = false;

    let hayErrores = false;

    // 1. Validar Nombre
    if (!this.myUser.nombre || this.myUser.nombre.trim().length === 0) {
      this.errorMessage = 'El nombre es obligatorio';
      this.nombreError = true;
      hayErrores = true;
    }

    // 2. Validar Email
    if (!this.myUser.email) {
      if (!hayErrores) {
        this.errorMessage = 'El email es obligatorio';
      }
      this.emailError = true;
      hayErrores = true;
    } else if (!this.validarEmail(this.myUser.email)) {
      if (!hayErrores) {
        this.errorMessage = 'El formato del email no es válido';
      }
      this.emailError = true;
      hayErrores = true;
    } else if (this.userService.existeUsuario(this.myUser.email)) {
      if (!hayErrores) {
        this.errorMessage = 'Este email ya está registrado';
      }
      this.emailError = true;
      hayErrores = true;
    }

    // 3. Validar Contraseña
    if (!this.myUser.contrasena) {
      if (!hayErrores) {
        this.errorMessage = 'La contraseña es obligatoria';
      }
      this.passwordError = true;
      hayErrores = true;
    } else if (this.myUser.contrasena.length < 8) {
      if (!hayErrores) {
        this.errorMessage = 'La contraseña debe tener al menos 8 caracteres';
      }
      this.passwordError = true;
      hayErrores = true;
    }

    // 4. Validar Confirmación de Contraseña
    if (!this.confirmPassword) {
      if (!hayErrores) {
        this.errorMessage = 'Debe confirmar la contraseña';
      }
      this.confirmError = true;
      hayErrores = true;
    } else if (this.myUser.contrasena !== this.confirmPassword) {
      if (!hayErrores) {
        this.errorMessage = 'Las contraseñas no coinciden';
      }
      this.confirmError = true;
      hayErrores = true;
    }

    // Si hay errores, no continuar
    if (hayErrores) {
      return;
    }

    // 5. Registrar usuario
    try {
      this.userService.registrarUsuario(this.myUser);
      this.successMessage = '¡Usuario registrado con éxito!';
      
      // Limpiar formulario
      this.myUser = {} as User;
      this.confirmPassword = '';
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        // Aquí podrías usar router.navigate(['/login']) si lo inyectas
      }, 2000);
      
    } catch (error) {
      this.errorMessage = 'Error al registrar el usuario';
    }
  }

  // Método para validar formato de email
  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Limpiar errores al escribir
  limpiarError(campo: string): void {
    switch(campo) {
      case 'nombre':
        this.nombreError = false;
        if (this.errorMessage.includes('nombre')) {
          this.errorMessage = '';
        }
        break;
      case 'email':
        this.emailError = false;
        if (this.errorMessage.includes('email')) {
          this.errorMessage = '';
        }
        break;
      case 'password':
        this.passwordError = false;
        if (this.errorMessage.includes('contraseña')) {
          this.errorMessage = '';
        }
        break;
      case 'confirm':
        this.confirmError = false;
        if (this.errorMessage.includes('coinciden') || this.errorMessage.includes('confirmar')) {
          this.errorMessage = '';
        }
        break;
    }
  }
}