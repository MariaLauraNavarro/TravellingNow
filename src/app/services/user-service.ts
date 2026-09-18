import { Injectable } from '@angular/core';
import { initializeApp, deleteApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
 

   
}

