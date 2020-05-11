import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { MyAuthService } from "../myauth.service";
@Component({
  selector: "app-invest",
  templateUrl: "./invest.component.html",
  styleUrls: ["./invest.component.css"],
})
export class InvestComponent implements OnInit {
  name;
  amount;
  rform: FormGroup;
  investments = [];
  id;
  data;

  ngOnInit() {
    this.getuserData();
  }

  constructor(private httpService: HttpService, private auth: MyAuthService) {}
  getuserData() {
    this.httpService.getUserData().subscribe((dataCampaign) => {
      this.data = dataCampaign;

      this.data.forEach((item: any) => {
        this.getInvestment(item._id);
      });
    });
  }

  getInvestment(id) {
    this.httpService.getInvestment(id).subscribe((investments: any) => {
      this.investments = this.investments.concat(...investments);
    });
  }
}
