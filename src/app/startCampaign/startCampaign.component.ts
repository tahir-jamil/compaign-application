import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

import { Router } from '@angular/router';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MyAuthService } from '../myauth.service';
import { validateVerticalPosition } from '@angular/cdk/overlay';
@Component({
  selector: "app-startCampaign",
  templateUrl: './startCampaign.component.html',
  styleUrls: ['./startCampaign.component.css'],
})
export class StartCampaignComponent implements OnInit {
  userid: string;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private auth: MyAuthService,
    private router: Router
  ) {}
  title: string;
  type: string;
  estimateAmount: string;
  description: string;
  projectData: string;
  tagline: string;
  amount: string;
  vediourl: string;
  pledgeAmount: string;
  rewardImage: string;
  campaignImage: string;
  campaignData;
  images;
  imagePath;
  rewardDetails;
  mainImage;
  userId;
  vedio;
  rewardImages;
  multipleImages;
  rform: FormGroup;
  ngOnInit() {
    this.userId = this.auth.getID();
    this.images = this.images;
    this.rform = this.formBuilder.group({
      userId: new FormControl(this.userId),
      title: new FormControl('', [
        Validators.compose([
          Validators.required,
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[a-z]/),
        ]),
      ]),
      tagline: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      amount: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(/[A-Z]/),
          // Validators.pattern(/[a-z]/),
          Validators.pattern(/[0-8]/),
        ])
      ),
      pledgeAmount1: new FormControl('', [Validators.required]),
      pledgeAmount2: new FormControl('', ),
      pledgeAmount3: new FormControl('', ),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      rewardDetails1: new FormControl('', [Validators.required]),
      rewardDetails2: new FormControl('', [Validators.required]),
      rewardDetails3: new FormControl('', [Validators.required]),

      vedio: new FormControl('', [Validators.required]),
      mainImage: new FormControl('', [Validators.required]),
      multipleImages: new FormControl('', [Validators.required]),
    });
  }

  startCampaign() {
    const rform = new FormData();
    rform.append('mainImage', this.images);
    if (this.rform.valid) {
      this.httpService.startCampaign(this.rform).subscribe((campaignData) => {
        alert('Campaign posted');
        this.router.navigate(['/home']);
      });
    } else {
      alert('form is invalid');
    }
  }
  selectCampaignImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      this.rform.controls.mainImage.setValue(this.images.name);
    }
  }
  selectMultipleImage(event) {
  if (event.target.files.length > 0) {
    this.multipleImages = event.target.files;
    const imagesNames = [];
    for (let index = 0; index <= (this.multipleImages.length - 1); index++) {
       imagesNames.push(this.multipleImages[index].name);
    }

    this.rform.controls['multipleImages'].setValue(imagesNames);
  }
}
  selectCampaignVedio(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.vedio = file;
      this.rform.controls.vedio.setValue(this.vedio.name);
    }
  }

  selectVedio(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.vediourl = file;
    }
  }
  // uploadimgFile() {
  //   const formData = new FormData();
  //   formData.append("mainImage", this.images);
  //   this.httpService.campaignImage(formData).subscribe((formData) => {
  //     console.log(formData);
  //     alert("img uploaded");
  //   });
  // }
  // uploadvedioFile() {
  //   const formData = new FormData();
  //   formData.append("campaignVedio", this.vediourl);
  //   this.httpService.campaignVedio(formData).subscribe((formData) => {
  //     console.log(formData);
  //     alert("vedio uploaded");
  //   });
  // }
}
