import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

import { auth } from '../firebase.config';

export interface User {
  nombre: string;
  email: string;
  contrasena: string;
  id: number;
  rol: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  // Lista de usuarios con datos iniciales
  private Usuarios: User[] = [
    {
      nombre: 'María Laura Navarro',
      email: 'marialaura1375@gmail.com',
      contrasena: '',
      id: 1,
      rol: 'admin'
    }
  ]

  public UsuarioLogueado: User | undefined;
  async registrarUsuarioFirebase(email: string, contrasena: string) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    contrasena
  );
} 
  async iniciarSesionFirebase(email: string, contrasena: string) {
   const credencial = await signInWithEmailAndPassword(
    auth,
    email,
    contrasena
  );
   this.UsuarioLogueado = this.Usuarios.find(
    usuario => usuario.email.toLowerCase() === email.toLowerCase()
  );

  return credencial;
}


  async cerrarSesionFirebase() {
  return await signOut(auth);
}
async restaurarSesionFirebase(): Promise<User | undefined> {

  await auth.authStateReady();

  const usuarioFirebase = auth.currentUser;

  console.log('Firebase recuperó:', usuarioFirebase?.email);
  console.log('Usuario local antes de buscar:', this.UsuarioLogueado);

  if (usuarioFirebase?.email) {
    this.UsuarioLogueado = this.Usuarios.find(
      usuario =>
        usuario.email.toLowerCase() === usuarioFirebase.email!.toLowerCase()
    );
  } else {
    this.UsuarioLogueado = undefined;
  }

  console.log('Usuario local después de buscar:', this.UsuarioLogueado);

  return this.UsuarioLogueado;
}
  /**
   * Verifica si un email ya está registrado (case-insensitive)
   */
  existeUsuario(email: string): boolean {
    return this.Usuarios.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  /**
   * Valida credenciales para login
   */
  validarUsuario(email: string, contrasena: string): boolean {
    this.UsuarioLogueado = this.Usuarios.find(
      u => u.email.toLowerCase() === email.toLowerCase() 
        && u.contrasena === contrasena
    );
    return this.UsuarioLogueado !== undefined;
  }

  /**
   * Registra un nuevo usuario con ID automático y rol por defecto
   * @throws Error si el email ya existe
   */
  registrarUsuario(usuario: User): void {
    // 1. Verificar si el email ya existe
    if (this.existeUsuario(usuario.email)) {
      throw new Error('El email ya está registrado');
    }

    // 2. Generar ID automático (mayor ID actual + 1)
    const maxId = this.Usuarios.length > 0 
      ? Math.max(...this.Usuarios.map(u => u.id)) 
      : 0;
    
    // 3. Crear usuario completo con valores por defecto
    const nuevoUsuario: User = {
      ...usuario,
      id: maxId + 1,
      rol: usuario.rol || 'user'
    };

    // 4. Agregar a la lista
    this.Usuarios.push(nuevoUsuario);
  }

  /**
   * (Opcional) Retorna copia de la lista para debug
   */
  getAllUsers(): User[] {
    return [...this.Usuarios];
  }
  eliminarUsuario(id: number): void {
  this.Usuarios = this.Usuarios.filter(u => u.id !== id);
  }

  editarUsuario(usuarioEditado: User): void {

    const index = this.Usuarios.findIndex(
      u => u.id === usuarioEditado.id
    );

    if (index !== -1) {
      this.Usuarios[index] = usuarioEditado;
    }
  }
}

