import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class Reservas {

  async getReservasFirestore() {
    const coleccionReservas = collection(db, 'reservas');
    const snapshot = await getDocs(coleccionReservas);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

}