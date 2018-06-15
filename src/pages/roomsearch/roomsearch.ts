import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-roomsearch',
  templateUrl: 'roomsearch.html',
})
export class RoomsearchPage {
    roomsearch=[];
    count;
    max_guests;
    room_type;


      constructor(public navCtrl: NavController, public navParams: NavParams) {
      }

      ionViewDidLoad() {
        console.log('ionViewDidLoad SingleRoomPage');
        this.roomsearch = this.navParams.get('rooms');
        this.count = this.roomsearch.length;
        this.max_guests = this.navParams.get('guests');
        this.room_type = this.navParams.get('room_type');
        console.log(this.roomsearch);
      }

    }

