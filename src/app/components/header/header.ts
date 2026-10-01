import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  menuAbierto = false;

 constructor(
  public userService: UserService,
  private router: Router
) {}

 toggleMenu() {
    this.menuAbierto = !this.menuAbierto;

 }  
 cerrarMenu() {
  this.menuAbierto = false;
}
 

async cerrarSesion() {
  await this.userService.cerrarSesionFirebase();

  this.userService.UsuarioLogueado = undefined;

  this.router.navigate(['/Ingresar']);
}
}
