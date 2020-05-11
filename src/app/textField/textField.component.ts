import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import * as platformModule from 'tns-core-modules/platform';

@Component({
  selector: "ns-textField",
  templateUrl: './textField.component.html',
  styleUrls: ['./textField.component.scss']
})
export class TextFieldComponent implements OnInit {
  @Input() rformgroup: FormGroup;
  @Input() rformControlName;
  @Input() rtext;


  @Input() class;
  @Input() type;
  @Input() hint;

  pageSide;

  constructor() {}

  ngOnInit() {}

  get invalidControl() {
    if (
      this.rformgroup.dirty &&
      this.rformgroup.controls[this.rformControlName].touched &&
      this.rformgroup.controls[this.rformControlName].invalid
    ) {
      return true;
    } else {
      return false;
    }
  }

  get errorRequired() {
    if (
      this.rformgroup.dirty &&
      this.rformgroup.controls[this.rformControlName].touched &&
      this.rformgroup.controls[this.rformControlName].errors &&
      this.rformgroup.controls[this.rformControlName].errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  get errorFormate() {
    if (
      this.rformgroup.dirty &&
      this.rformgroup.controls[this.rformControlName].touched &&
      this.rformgroup.controls[this.rformControlName].errors &&
      this.rformgroup.controls[this.rformControlName].errors.email
    ) {
      return true;
    } else {
      return false;
    }
  }
  get errorminLength() {
    if (
      this.rformgroup.dirty &&
      this.rformgroup.controls[this.rformControlName].touched &&
      this.rformgroup.controls[this.rformControlName].errors &&
      this.rformgroup.controls[this.rformControlName].errors.minlength
    ) {
      return true;
    } else {
      return false;
    }
  }
  get errormaxLength() {
    if (
      this.rformgroup.dirty &&
      this.rformgroup.controls[this.rformControlName].touched &&
      this.rformgroup.controls[this.rformControlName].errors &&
      this.rformgroup.controls[this.rformControlName].errors.maxlength
    ) {
      return true;
    } else {
      return false;
    }
  }
}
