import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MyAuthService } from './myauth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private  _authService: MyAuthService,private router: Router) {

  }
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    } else {
alert('login in first');
this.router.navigate(['/mymodal'])
return false;
}
  }

  }
