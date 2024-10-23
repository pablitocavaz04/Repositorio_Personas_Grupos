import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authenticated$:Observable<boolean> = this._authenticated.asObservable();
  constructor() { 
    
  }
  login(){
    this._authenticated.next(true);
  }
  logout(){
    this._authenticated.next(false);
  }
}
