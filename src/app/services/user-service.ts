import { Injectable } from '@angular/core';

export interface User{
  nombre:string;
  email:string;
  contrasena:string;
  id:number;
  rol:string;
  
}

@Injectable({
  providedIn: 'root',
})


export class UserService {
 private Usuarios:User[]=[{
nombre:' Alan',
email:'a1@gmail.com',
contrasena:'1234',
id:1,
rol:'admin'
 }



];

public UsuarioLogueado:User | undefined;
validarUsuario(email:string,contraseña:string):void{
  this.UsuarioLogueado= this.Usuarios.find(u =>u.contrasena==contraseña && u.email== email );
}

}
