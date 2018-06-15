import { CheckoutPage } from './../checkout/checkout';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from "moment";



@IonicPage()
@Component({
  selector: 'page-single-room',
  templateUrl: 'single-room.html',
})
export class SingleRoomPage {
singleroom = {};
checkin;
checkout ;
totalAmount = 0;
totalDays = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // get total days
  confirmDates() {
    // days
    this.totalDays =moment(this.checkout).diff(moment(this.checkin), 'days');
    // amount
    this.totalAmount = this.totalDays* this.singleroom['price'];

  }

  // check out
  check_out() {
    const data = {
      amount: this.totalAmount,
      room: this.singleroom['class'],
      room_number: this.singleroom['room_number'],
      id: this.singleroom['_id'],
      stay: this.totalDays,
      checkin: this.checkin,
      checkout: this.checkout
    }
  this.navCtrl.push(CheckoutPage, data);
  }




  ionViewDidLoad() {

    this.singleroom = this.navParams.get('room').room;

    console.log(this.singleroom);

  }

}
