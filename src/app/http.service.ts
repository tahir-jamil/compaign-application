import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import { MyAuthService } from './myauth.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private authService: MyAuthService) {}
  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'Application/Json',
      accept: ' application/json'
    })
  };
  email;
  // private socket = io('http://localhost:3000');
  getUserData() {
    return this.http.get('http://localhost:3000/startCampaign/' + this.authService.getID(), this.httpHeaders);

  }
  getAllCampaigns() {
    return this.http.get('http://localhost:3000/startCampaign/', this.httpHeaders);
  }

  getCampaignDetails(id) {
    return this.http.get('http://localhost:3000/startCampaign/campaignData/' + id,   this.httpHeaders);
  }
  getCampaignReview(id) {
    return this.http.get('http://localhost:3000/campaignReview/' + id,   this.httpHeaders);
  }
  getCampaignStories(id) {
    return this.http.get('http://localhost:3000/campaignStory/' + id,   this.httpHeaders);
  }
  invest(investData) {

    return this.http.post(
      'http://localhost:3000/invest',
      {
        name: investData.name,
        pledgeAmount: investData.pledgeAmount,
        startCampaignId: investData.campaignId,
      },
      this.httpHeaders
    );
  }
  getInvestment(id) {
    return this.http.get('http://localhost:3000/invest/' + id,   this.httpHeaders);
  }
  getPledgeAmount(id) {
    return this.http.get('http://localhost:3000/invest/' + id,   this.httpHeaders);
  }
  startCampaign(campaignData) {
    return this.http.post(
      'http://localhost:3000/startCampaign/',       {


        userAccountId: campaignData.value.userId,
        title: campaignData.value.title,
        tagline: campaignData.value.tagline,
        amount: campaignData.value.amount,
        type: campaignData.value.type,
        description: campaignData.value.description,
        pledgeAmount1: campaignData.value.pledgeAmount1,
        pledgeAmount2: campaignData.value.pledgeAmount2,
        pledgeAmount3: campaignData.value.pledgeAmount3,
        rewardDetails1: campaignData.value.rewardDetails1,
        rewardDetails2: campaignData.value.rewardDetails2,
        rewardDetails3: campaignData.value.rewardDetails3,
        mainImage: campaignData.value.mainImage,
        vedio: campaignData.value.vedio,
        rewardImage: campaignData.value.rewardImage,
        multipleImages: campaignData.value.multipleImages,
      },
      this.httpHeaders
    );
  }
  createuserAccount(newUser) {

    return this.http.post(
      'http://localhost:3000/userAccount/createAccount',
      {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      },
      this.httpHeaders
    );
  }
signUpApp(userAccount) {
  return this.http.post(
    'http://localhost:3000/userAccount/signUp',
    {
      username: userAccount.username,
      email: userAccount.email,
      password: userAccount.password,
      token : userAccount.authToken

    },
    this.httpHeaders
  );
}
loginApp(userAccount){
  return this.http.post(
    'http://localhost:3000/userAccount/loginApp',
    {
      email: userAccount.email,
      password: userAccount.password
    },
    this.httpHeaders
  );

}
  login(user) {
    return this.http.post(
      'http://localhost:3000/userAccount/login',
      {
        email: user.email,
        password: user.password
      },
      this.httpHeaders
    );
  }


  getcampaignImage() {
    return this.http.get('http://localhost:3000/campaignImage');
  }
// follow(emailAccount){
//   return this.http.post(
//     'http://localhost:3001/follow',
//     {
//       email: emailAccount.email,
//       // startCampaignId: reviewData.reviewId
//     },
//     this.httpHeaders
//   );

// }

  createReview(reviewData) {
    return this.http.post(
      'http://localhost:3000/campaignReview',
      {
        name: reviewData.name,
        details: reviewData.details,
        rating: reviewData.rating,
        startCampaignId: reviewData.reviewId
      },
      this.httpHeaders
    );
  }
  createStory(storyData) {
    return this.http.post(
      'http://localhost:3000/campaignStory',
      {
        image: storyData.image,
        details: storyData.details,
        startCampaignId: storyData.storyId

      },
      this.httpHeaders
    );
  }
  campaignImage(formData) {
    return this.http.post('http://localhost:3000/campaignImage/upload', formData);
  }
  campaignVedio(formData) {
    return this.http.post('http://localhost:3000/campaignVedio', formData);
  }
  // saveUser(user) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/api/users', user, {headers: headers});
  // }

  // login(user) {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/api/login', user, {headers: headers});
  // }

  // loggedIn() {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return user != null ? true : false;
  // }

  // getLoggedInUser() {
  //   return JSON.parse(localStorage.getItem('user'));
  // }

  // getUsers() {
  //   return this.http.get('http://localhost:3000/api/users');
  // }

  // getChatRoomsChat(chatRoom) {
  //   return this.http.get('http://localhost:3000/chatroom/' + chatRoom);
  // }
}
