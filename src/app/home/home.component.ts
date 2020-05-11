import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { MyAuthService } from '../myauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  image;
  progress = 0;

  amount = 0;
  pledgeAmount;
  limitedAmount = 0;
  user: any;
  loggedIn: boolean;
  backers: any[];
  filterData: any[];
  constructor(
    private httpService: HttpService,
    private router: Router,
    private auth: MyAuthService,

    ) {}
  title;
  campaignData;
  data;
  allData ;
  investData = [];
  investments = [];
  campaign;
  userId;
  pledgedAmount = 0;
  startCampagins;
  campaigns;
  emailAccount;
showproject = true;
  ngOnInit() {
    // this.userId = this.auth.getID();
    this.getuserData();
    this.getAllprojects();
    // this.campaignImage();
    // this.auth.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = user != null;
    // });
  }

  // follow() {
  //  this.emailAccount=this.auth.getEmail();
  //  this.httpService.follow(this.emailAccount).subscribe((dataCampaign) => {

  //   });
  // }
  getuserData() {
    this.httpService.getUserData().subscribe((dataCampaign) => {
      this.data = dataCampaign;
      // this.title = this.campaignData.startCampaigns[0].title;
      // this.id = this.campaignData._id;
    });

  }
  showProjects(){
this.showproject = true;
  }
  getInvestment(id) {
    this.amount = 0;
    this.httpService
      .getInvestment(id)
      .subscribe((investment: any) => {
        this.investments = investment;

        this.investments.forEach((value) => {
          // tslint:disable-next-line: radix
          this.amount = parseInt(value.pledgeAmount) + this.amount;
          // this.backers = investment. + 1;
        });
        this.backers = [...new Set(this.investments.map((data) => data.name))];
      });
  }

  getAllprojects() {
    this.httpService.getAllCampaigns().subscribe((dataCampaign: any) => {
      this.allData = dataCampaign;
      this.investData = this.allData;
      this.filterData = this.allData;
      // this.title=this.allData[0].title
      if( this.investData)  {

        this.investData.forEach((item: any) => {
          this.getInvestment(item._id);
        });
      }
    });
  }
  startCampaign() {
    this.router.navigate(['startCampaign']);
  }
  backCampaign() {
    this.router.navigate(['home']);
  }
  campaignImage() {
    this.httpService.getcampaignImage().subscribe((data) => {
      this.image = data;
    });
  }
  campaignDetails(allData) {
    this.router.navigate(['campaignDetails/', allData]);
  }
  setId(userId) {
    localStorage.setItem('userId', JSON.stringify(userId));
  }

  filter(type) {
    this.filterData = [];
    this.allData.forEach((campaign) => {
      if (campaign.type === type) {
        return this.filterData.push(campaign);
      }else{
        return this.filterData = [];

      }
    });
  }

}
