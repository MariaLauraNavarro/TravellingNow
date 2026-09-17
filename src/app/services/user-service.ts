import { Injectable } from '@angular/core';
import { initializeApp, deleteApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth
} from 'firebase/auth';

import { auth, db, firebaseConfig } from '../firebase.config';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc, 
  deleteDoc,
  updateDoc
} from 'firebase/firestore';


export interface User {
  nombre: string;
  email: string;
  contrasena: string;
  id: number;
  rol: string;
  firestoreId?: string;
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

  async buscarUsuarioFirestore(email: string): Promise<User | undefined> {

  const consulta = query(
    collection(db, 'usuarios'),
    where('email', '==', email)
  );


  const resultado = await getDocs(consulta);

  if (resultado.empty) {
    return undefined;
  }

  const datos = resultado.docs[0].data();

  return {
    nombre: datos['nombre'],
    email: datos['email'],
    contrasena: '',
    id: 0,
    rol: datos['rol']
  };
}

 
 async getAllUsersFirestore(): Promise<User[]> {

  const coleccionUsuarios = collection(db, 'usuarios');
  const resultado = await getDocs(coleccionUsuarios);

  return resultado.docs.map(documento => {

    const datos = documento.data();

    return {
      nombre: datos['nombre'],
      email: datos['email'],
      contrasena: '',
      id: 0,
      rol: datos['rol'],
      firestoreId: documento.id
    };
  });
}

async eliminarUsuarioFirestore(firestoreId: string): Promise<void> {

  await deleteDoc(
    doc(db, 'usuarios', firestoreId)
  );

}

async editarUsuarioFirestore(usuario: User): Promise<void> {

  if (!usuario.firestoreId) {
    return;
  }

  await updateDoc(
    doc(db, 'usuarios', usuario.firestoreId),
    {
      nombre: usuario.nombre,
      rol: usuario.rol
    }
  );

}
 
async agregarUsuarioDesdeAdmin(usuario: User): Promise<void> {

  const appSecundaria = initializeApp(
    firebaseConfig,
    'admin-' + Date.now()
  );

  const authSecundaria = getAuth(appSecundaria);

  try {

    const credencial = await createUserWithEmailAndPassword(
      authSecundaria,
      usuario.email,
      usuario.contrasena
    );

    await setDoc(
      doc(db, 'usuarios', credencial.user.uid),
      {
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol || 'user'
      }
    );

  } finally {

    await deleteApp(appSecundaria);

  }
}

async registrarUsuarioFirebase(
  email: string,
  contrasena: string,
  nombre: string = ''
) {

  const credencial = await createUserWithEmailAndPassword(
    auth,
    email,
    contrasena
  );

  await setDoc(
    doc(db, 'usuarios', credencial.user.uid),
    {
      nombre: nombre,
      email: email,
      rol: 'user'
    }
  );

  return credencial;
}
async iniciarSesionFirebase(email: string, contrasena: string) {

  const credencial = await signInWithEmailAndPassword(
    auth,
    email,
    contrasena
  );

  this.UsuarioLogueado = await this.buscarUsuarioFirestore(email);

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

  this.UsuarioLogueado =
    await this.buscarUsuarioFirestore(usuarioFirebase.email);

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

