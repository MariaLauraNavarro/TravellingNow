import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from '../../../services/destinos';


@Component({
  selector: 'app-item-destiny',
  imports: [],
  templateUrl: './item-destiny.html',
  styleUrl: './item-destiny.css',
})
export class ItemDestiny {
@Input()

  public destino ?:Destino;
  constructor(private router: Router) {}   
  mostrarDescripcion: boolean = false;
  toggleDescripcion() {
    this.mostrarDescripcion = !this.mostrarDescripcion;
  }
  
  reservar() {
  if (!this.destino) {
    return;
  }

  this.router.navigate(['/Reserva', this.destino.id]);
}

}
