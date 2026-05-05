import { Component, Input } from '@angular/core';
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

}
