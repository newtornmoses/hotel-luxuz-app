import { Storage } from '@ionic/storage';
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
book_end;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
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
    const single = this.navParams.get('room');
    single.forEach(elem =>{
     this.singleroom = elem.room.details;
   } );

     this.book_end =moment(this.singleroom['Check_out_Time']).diff(moment(new Date()), "hours");

    console.log(this.singleroom['Check_out_Time']);
    console.log(this.book_end);
    // get jsonweb token
     this.storage.get('token')
                                       .then (data => console.log(data))
  }

}
