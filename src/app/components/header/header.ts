import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user-service';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public userService: UserService) {}
}
