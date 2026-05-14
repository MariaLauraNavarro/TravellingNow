import { Component } from '@angular/core';
import { Login } from '../../pages/login/login';
import { RouterModule } from "@angular/router";
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-principal',
  imports: [ RouterModule, Footer],
  templateUrl: './principal.html',
  styleUrl: './principal.css',
})
export class Principal {}
