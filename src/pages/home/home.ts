import { SingleRoomPage } from './../single-room/single-room';
import { RoomsearchPage } from './../roomsearch/roomsearch';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {JobsProvider} from '../../providers/jobs/jobs';
import {DatePicker} from '@ionic-native/date-picker';



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
    public alert: AlertController, public datepicker: DatePicker) {

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
    this.jobs.get_single(event)
              .subscribe(data =>
                {
                  console.log(data);
                  this.navCtrl.push(SingleRoomPage, {room: data});
                }
              );
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

  // date picker
  date_picker() {
    this.datepicker.show({
       date: new Date(),
         mode: 'date',
         androidTheme: this.datepicker.ANDROID_THEMES.THEME_HOLO_DARK,

    })
     .then(date => console.log(date))
     .catch(err => console.log(err))
  }



  ionViewDidLoad() {
      this.jobs.get_rooms()
                                  .subscribe(res => {
                                 this.rooms  = res['data'];
                                 this.count = res['count']
                                 console.log(this.rooms);
                                 console.log(this.count);

                                  });

}

}
