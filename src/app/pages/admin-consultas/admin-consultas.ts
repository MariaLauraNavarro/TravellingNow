import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from '../../components/header/header';
import {collection,getDocs,orderBy,query,doc,updateDoc,deleteDoc} from 'firebase/firestore';
import { db } from '../../firebase.config';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-admin-consultas',
  imports: [Header, DatePipe],
  templateUrl: './admin-consultas.html',
  styleUrl: './admin-consultas.css',
})
export class AdminConsultas {

  consultas: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.cargarConsultas();
  }

  async cargarConsultas() {
    try {
      const consultasRef = collection(db, 'consultas');

      const consultaOrdenada = query(
        consultasRef,
        orderBy('fecha', 'desc')
      );

      const snapshot = await getDocs(consultaOrdenada);

      this.consultas = snapshot.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
      }));

      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error al cargar consultas:', error);
    }
  }
  async marcarRespondida(consulta: any) {
  try {
    const referencia = doc(db, 'consultas', consulta.id);

    await updateDoc(referencia, {
      estado: 'respondida'
    });

    consulta.estado = 'respondida';
    this.cdr.detectChanges();

  } catch (error) {
    console.error('Error al marcar consulta como respondida:', error);
  }
}

async eliminarConsulta(consulta: any) {
  const confirmar = confirm(
    `¿Querés eliminar la consulta de ${consulta.email}?`
  );

  if (!confirmar) {
    return;
  }

  try {
    const referencia = doc(db, 'consultas', consulta.id);

    await deleteDoc(referencia);

    this.consultas = this.consultas.filter(
      item => item.id !== consulta.id
    );

    this.cdr.detectChanges();

  } catch (error) {
    console.error('Error al eliminar consulta:', error);
  }
}
}