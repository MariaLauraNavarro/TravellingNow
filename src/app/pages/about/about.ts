import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [Header, Footer, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
