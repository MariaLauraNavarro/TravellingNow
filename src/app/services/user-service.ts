import { Injectable } from '@angular/core';

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
      nombre: 'Alan',
      email: 'a1@gmail.com',
      contrasena: '1234',
      id: 1,
      rol: 'admin'
    }
  ];

  public UsuarioLogueado: User | undefined;

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
}

/*import { Injectable } from '@angular/core';

export interface User{
  nombre:string;
  email:string;
  contrasena:string;
  id:number;
  rol:string;
  
}

@Injectable({
  providedIn: 'root',
})


export class UserService {
 private Usuarios:User[]=[{
nombre:' Alan',
email:'a1@gmail.com',
contrasena:'1234',
id:1,
rol:'admin'
 }



];
  public UsuarioLogueado: User | undefined;

  validarUsuario(email:string, contrasena:string): boolean {

    this.UsuarioLogueado = this.Usuarios.find(
      u => u.contrasena == contrasena && u.email == email
    );

    return this.UsuarioLogueado != undefined;
  }

  registrarUsuario(usuario: User): void {
    this.Usuarios.push(usuario);
  }

}*/