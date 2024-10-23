import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-routing-bar',
  templateUrl: './routing-bar.component.html',
  styleUrls: ['./routing-bar.component.scss'],
})
export class RoutingBarComponent  implements OnInit {

  constructor(
    public authService:AuthService
  ) { }

  ngOnInit() {}

  onLogin(){
    this.authService.login();
  }

  onLogout(){
    this.authService.logout();
  }

}
