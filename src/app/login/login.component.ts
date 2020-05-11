import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MyAuthService } from '../myauth.service';

// import { ChatService } from '../chat.service';
// import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailAccount;
  passwordAccount;
  confirmPasswordAccount;
  accountData;
  loginForm: FormGroup;

  ngOnInit() {
    this.checkLoggedIn();
    this.loginForm = this.formBuilder.group({
      //controlname: ['initial value', rules]
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(14),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  constructor(
    public formBuilder: FormBuilder,
    public authService: MyAuthService,
    private httpService: HttpService,
    private router: Router,
    ) {}


    checkLoggedIn(): void {
      if (this.authService.loggedIn()) {
        this.router.navigate(['/']);
      }
    }



  // login() {
  //   const userAccount = {
  //     email: this.email,
  //     password: this.password
  //   };
  //   this.httpService.login(userAccount).subscribe((res: any) => {
  //     this.router.navigate(['home']);
  //     alert('login succesfully');
  //     this.setToken(res.token);
  //     this.setId(res.userId);
  //   });
  // }

  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  setId(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }


}
