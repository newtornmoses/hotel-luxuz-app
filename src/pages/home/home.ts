import { HttpClient } from '@angular/common/http';
import { SingleRoomPage } from './../single-room/single-room';
import { RoomsearchPage } from './../roomsearch/roomsearch';
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import {JobsProvider} from '../../providers/jobs/jobs';

import * as moment from 'moment';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
rooms = [];
count ;
max_guests =2;
room_type='comfort';

  constructor(public navCtrl: NavController, public jobs: JobsProvider,
    public alert: AlertController,
     public loading: LoadingController, public http: HttpClient, public navParams: NavParams) {

  }

  // get values from select options
  getSelected_guests(e) { // guests
    this.max_guests = e.target.value;
  }

  getSelected_room(e) { //  rooms
     this.room_type = e.target.value;
  }

  // search rooms
  findrooms() {

   const q =this.rooms.filter((elem) =>
     elem.room.details.class.toLowerCase() === this.room_type.toLowerCase()
       &&  elem.room.details.max_guests === Number(this.max_guests)
       &&  elem.room.details.isActive === false  );
   console.log(q);
   const rooms = q;

   this.navCtrl.push(RoomsearchPage, {rooms: rooms, room_type: this.room_type, guests: this.max_guests});


  }

  // view room details
  view (event) {
    const single =  this.rooms.filter(elem => elem.room.details._id === event);
    this.navCtrl.push(SingleRoomPage, {room:single});
  }

  // book_now
  book_now(event) {
    this.view(event);

  }

  // pending
  pending(event) {
    this.alert.create({
      title:" room pending",
      message:" You can book it in time",
      buttons:[
        {
          text:' Cancle'
        },
        {
          text: "Go Ahead",
          handler: () => {
            this.view(event);
          }
        }
      ]
    }).present();

  }

  // booked
  booked() {
  const room_alert = this.alert.create({
    title: 'sorry',
     message:"This room is already booked , plz check latter",
     buttons:[
       {
       text:'Ok',
       handler: () => {
        console.log('ok');
       }

       }
     ]
  });

  room_alert.present();
  }



  // get all rooms
  getAllRooms(loader) {
    this.jobs.get_rooms()
    .subscribe(res => {

      if(res) {
        loader.dismiss();
      }

   this.rooms  = res['data'];
   this.count = res['count']
   console.log(this.rooms);
   console.log(this.count);

   // map rooms
 this.rooms.filter(elem =>{

    const time =moment(elem.room.details.Check_out_Time).diff(moment(new Date().toISOString()), 'hours') <=0
                       && elem.room.details.paid === true;

    return  time;

   }).forEach(elem =>{
      console.log(elem.room.details._id);

      // update rooms to be inactive
     
     this.http.post('https://luxuz-hotel-api.herokuapp.com/hotelluxuz/hotel/rooms/deactivate_room/'+ elem.room.details._id, {} )
                      .subscribe(data => {
                        console.log(data);
                this.getAllRooms(loader);


                      });
   } );


    });

  }


   // view did load
  ionViewDidLoad() {
    const loader =  this.loading.create({
      content:'please wait'
    });
    loader.present();
    this.getAllRooms(loader);


}

}
