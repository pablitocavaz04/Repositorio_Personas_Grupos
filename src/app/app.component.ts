import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authSvc:AuthService
  ) {
    timer(2000).subscribe(()=>{
      this.authSvc.login();
    })
  }
}
