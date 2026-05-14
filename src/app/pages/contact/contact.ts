import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {}
