import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MyAuthService } from "../myauth.service";
import { ValueConverter } from "@angular/compiler/src/render3/view/template";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "app-campaignDetails",
  templateUrl: "./campaignDetails.component.html",
  styleUrls: ["./campaignDetails.component.css"],
})
export class CampaignDetailsComponent implements OnInit {
  images;
  stories;
  updates;
  vedio;
  backers = [];
  paramsid;
  rewardDetails;
  title;
  validAmount = true;
  animatedCirclePercentage = 0;
  tagline;
  investments = [];
  id;
  // tslint:disable-next-line: ban-types
  description;
  campaign;
  details;
  image;
  storyId;
  goal = 0;
  pledgedAmount = 0;
  doc;
  reviews;
  rating;
  data;
  name: any;
  amountInvest;
  progress = 0;
  acountName;
  progressBar = document.querySelector(".progress-bar");
  intervalId;
  amount = 0;
  pledgeAmount;
  limitedAmount = 0;
  totalamount: number;

  constructor(
    private httpService: HttpService,
    public route: ActivatedRoute,
    public router: Router,
    private auth: MyAuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.paramsid = id;

    this.getCampaignReview();
    this.getCampaignStories();
    this.updateDataAmount();
    this.acountName = this.auth.getEmail();



    const getDownloadProgress = () => {
      console.log("getDownload", this);
      if (this.progress <= 99) {
        console.log("inside if", this.progress);
        this.progress = this.progress + 1;
      } else {
        clearInterval(this.intervalId);
      }
    };
    this.intervalId = setInterval(getDownloadProgress, 1000);
  }

  updateDataAmount() {
    this.getCampaignDetails();
    this.getInvestments();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  formatSubtitle = (percent: number): string => {
    if (percent >= 100) {
      return "Congratulations!";
    } else if (percent >= 50) {
      return "Half";
    } else if (percent > 0) {
      return "Just began";
    } else {
      return "Not started";
    }
  };

  getCampaignReview() {
    this.httpService.getCampaignReview(this.paramsid).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  getInvestments() {
    this.amount = 0;
    this.httpService
      .getInvestment(this.paramsid)
      .subscribe((investment: any) => {
        this.investments = investment;

        this.investments.forEach((value) => {
          this.amount = parseInt(value.pledgeAmount) + this.amount;
          this.totalamount = this.amount;
          // this.backers = investment. + 1;
        });
        this.backers = [...new Set(this.investments.map((data) => data.name))];
      });
  }

  getCampaignStories() {
    this.httpService.getCampaignStories(this.paramsid).subscribe((stories) => {
      this.stories = stories;
      // this.details = this.reviews[0].detials;
    });
  }
  getCampaignDetails() {
    this.httpService.getCampaignDetails(this.paramsid).subscribe((details) => {
      this.doc = details;
      this.goal = this.doc.amount;
      this.images = this.doc.multipleImages;
    });
  }

  uploadStory() {
    const newStory = {
      image: this.image,
      details: this.details,
      storyId: this.paramsid,
    };
    this.httpService.createStory(newStory).subscribe(() => {
      alert("Story Uploaded");
    });
  }

  invest() {
    const newInvestment = {
      pledgeAmount: this.pledgeAmount,
      name: this.acountName,
      campaignId: this.paramsid,
    };

    if (this.validAmount) {
      this.httpService.invest(newInvestment).subscribe(() => {
        alert("Investment Done");
        this.updateDataAmount()
      });
    } else {
      alert('enter valid amount')
    }
  }
  uploadReview() {
    const newReview = {
      name: this.name,
      details: this.details,
      rating: this.rating,
      reviewId: this.paramsid,
    };
    // tslint:disable-next-line: no-shadowed-variable
    this.httpService.createReview(newReview).subscribe(() => {
      alert("Review Posted");
    });
  }

  amountChanged(args) {
    let value = parseInt(args);
    if (value <= this.limitedAmount) {
      this.validAmount = true;
    } else {
      this.validAmount = false;
    }
  }

  get isValidAmount() {
    return this.validAmount;
  }

  get limitedAmountValue() {
    this.animatedCirclePercentage =  (parseInt(<any>this.amount) / this.goal) * 100;
    return (this.limitedAmount = parseInt(<any>this.goal) - this.amount);
  }
}
