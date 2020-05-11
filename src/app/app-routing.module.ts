import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { ForgetPasswordComponent } from './forgetPassword/forgetPassword.component';
import { UpdatesComponent } from './updates/updates.component';



import { CampaignDetailsComponent } from './campaignDetails/campaignDetails.component';
import { StartCampaignComponent } from './startCampaign/startCampaign.component';
import { AuthGuard } from './auth.guard';
import { InvestComponent } from './invest/invest.component';







const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'invest', component: InvestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },

  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'startCampaign', component: StartCampaignComponent },
  { path: 'campaignDetails/:id', component: CampaignDetailsComponent, canActivate: [AuthGuard]},
  { path: 'updates', component: UpdatesComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
