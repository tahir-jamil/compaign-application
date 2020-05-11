
import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
// import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { HttpService } from './http.service';
import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
// import { AuthService } from 'angularx-social-login';
import { MyAuthService } from './myauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
// tslint:disable-next-line: align

export class AppComponent {
  title = 'angularApp';
  username;
  email;
  password;
  usernameAccount;
  emailAccount;
  passwordAccount;
  newAccount;
  // isLoggedIn = true;
  rformSignup: FormGroup;
  rform;
  token;
  rformSignuprformSignup: FormGroup;
  rformLogin: FormGroup;
  user;
  content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
  data = [];
  id: any;
  public isLoggedIn = false;
  name: any;
  investments = [];
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(
    // tslint:disable-next-line: max-line-length
    //  private socioauthService: AuthService,
    // private socioauthService: AuthService,
    public authService: MyAuthService,
    private httpService: HttpService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  titleLogin: 'sign in with Google';
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.rformSignup = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.rformLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.getuserData();
  }

  signInFacebook(platform: string) {
    // platform = FacebookLoginProvider.PROVIDER_ID;
    // this.socioauthService
    //   .signIn(FacebookLoginProvider.PROVIDER_ID)
    //   .then((Response) => {
    //     console.log(platform + 'logged in user is ', Response);
    //     // tslint:disable-next-line: no-unused-expression
    //     const userAccount = {
    //       email: Response.name,
    //       username: Response.firstName,
    //       password: Response.id,
    //       token: Response.authToken,
    //     };

    //     this.httpService.signUpApp(userAccount).subscribe((res: any) => {});

    //     this.httpService.loginApp(userAccount).subscribe((res: any) => {
    //       this.router.navigate(['home']);
    //       this.setId(res.userId);
    //       this.setUsername(res.email);
    //       this.setToken(res.token);
    //       this.isLoggedIn = true;
    //       alert('Login succesfully by face book');

    //     });
    //   });
  }

  signInGoogle(platform: string) {
    // platform = GoogleLoginProvider.PROVIDER_ID;
    // this.socioauthService
    //   .signIn(GoogleLoginProvider.PROVIDER_ID)
    //   .then((Response) => {
    //     console.log(platform + 'logged in user is ', Response);

    //     const userAccount = {
    //       email: Response.email,
    //       username: Response.name,
    //       password: Response.id,
    //       token: Response.authToken,
    //     };

    //     this.httpService.signUpApp(userAccount).subscribe((res: any) => {});
    //     this.httpService.loginApp(userAccount).subscribe((res: any) => {
    //       this.router.navigate(['home']);
    //       this.setToken(res.token);
    //       this.setId(res.userId);
    //       this.setUsername(res.email);
    //       // this.setToken(Response.authToken);
    //       this.isLoggedIn = true;
    //       alert('Login succesfully by Google');

    //     });
    //   });
  }

  login() {
    if (this.rformLogin.valid) {
      this.httpService.login(this.rformLogin.value).subscribe((res: any) => {
        this.router.navigate(['home']);

        this.setToken(res.token);
        this.setId(res.userId);
        this.setUsername(res.email);

        alert('login succesfully');
        this.isLoggedIn = true;
      }, (error) => {
        alert("login failed");
      })
    } else {
      alert('invalid form');
    }
  }

  setId(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  setUsername(email) {
    localStorage.setItem('email', JSON.stringify(email));
  }

  createAccount() {
    if (this.rformSignup.valid) {
      this.httpService
        .createuserAccount(this.rformSignup.value)
        .subscribe((res: any) => {
          // this.setToken(res.token);
          alert('account created');


        }, (error) => {
          alert("Sign up failed");
        });
    } else {
      alert('invalid form');
    }
  }

  setToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    return JSON.parse(localStorage.get('token'));
  }

  toggleLogin(value) {
    this.isLoggedIn = value;
  }

  onLogoutClick() {
    this.authService.loggedOut();
  }

  showNotifcations() {

  }
  getuserData() {
    this.httpService.getUserData().subscribe((dataCampaign:any) => {
      this.data = dataCampaign;
      if( this.data)  {

        this.data.forEach((item: any) => {
          this.getInvestment(item._id);
        });
      }
    });
  }
  getInvestment(id) {
    this.httpService.getInvestment(id).subscribe((investments: any) => {
      this.investments = this.investments.concat(...investments);

    });
  }
}
