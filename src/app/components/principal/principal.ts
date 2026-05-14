import { Component } from '@angular/core';
import { Login } from '../../pages/login/login';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-principal',
  imports: [ RouterModule],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {}
