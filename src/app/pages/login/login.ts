import { Component } from '@angular/core';
import { User, UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public myUser: User= <User>{};
  constructor( public userService : UserService){

  }
}
