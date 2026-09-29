import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  nombreApellido: string = '';
  email: string = '';
  asunto: string = '';
  mensaje: string = '';

  constructor(private cdr: ChangeDetectorRef) {}
  async enviarConsulta() {

  if (
    !this.nombreApellido ||
    !this.email ||
    !this.asunto ||
    !this.mensaje

   
  ) {
    alert('Completá todos los campos');
    return;
  }

  await addDoc(
    collection(db, 'consultas'),
    {
      nombreApellido: this.nombreApellido,
      email: this.email,
      asunto: this.asunto,
      mensaje: this.mensaje,
      fecha: serverTimestamp()
    }
  );

  alert('Consulta enviada correctamente');

  this.nombreApellido = '';
  this.email = '';
  this.asunto = '';
  this.mensaje = '';
  this.cdr.detectChanges();
}

}
