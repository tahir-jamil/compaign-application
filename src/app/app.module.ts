import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';
import { UpdatesComponent } from './updates/updates.component';
import { CampaignDetailsComponent } from './campaignDetails/campaignDetails.component';
import { StartCampaignComponent } from './startCampaign/startCampaign.component';

import { AuthGuard } from './auth.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { MatSelectModule } from '@angular/material/select';
import { TextFieldComponent } from './textField/textField.component';
import { MyAuthService } from './myauth.service';
import { InvestComponent } from './invest/invest.component';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { MatProgressBarModule } from '@angular/material/progress-bar';

// tslint:disable-next-line: variable-name
// const googleid : string = '937410940594-7rrq4c1hfea2od2vsvhsdp1rd6im19r4.apps.googleusercontent.com' ;
// const facebookid : string = '2702502043208538';
// let config = new AuthServiceConfig([
//   {
//    id: GoogleLoginProvider.PROVIDER_ID,
//   provider: new GoogleLoginProvider(googleid)
// }, {
//   id: FacebookLoginProvider.PROVIDER_ID,
//  provider: new FacebookLoginProvider(facebookid)
// },
// ]);

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      ForgetPasswordComponent,
      UpdatesComponent,
      CampaignDetailsComponent,
      StartCampaignComponent,
      TextFieldComponent,
      InvestComponent
   ],
   imports: [
      BrowserModule,
      // SocialLoginModule.initialize(config),
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      MatTabsModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatProgressBarModule,
      NgCircleProgressModule.forRoot(),
      PopoverModule.forRoot()
   ],
   providers: [
      MyAuthService
   ],
   bootstrap: [
      AppComponent
   ]

})
export class AppModule { }
