import { SuccessPage } from './../success/success';
import { HttpClient } from '@angular/common/http';
import { Stripe } from '@ionic-native/stripe';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';






@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
total;
room;
room_number;
card:any ={
  phone:'',
  name:'',
  zip:'',
  expMonth:'',
  expYear:'',
  cvc:'',
  number:null,
  email:'',
  country: '',
  address:'',

}


token;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public stripe: Stripe, public http: HttpClient, public loading: LoadingController,
  public alert: AlertController
  ) {
  }


  // pay
  pay() {
   // show loading
     const loadinSpinner = this.loading.create({
        content: 'please wait while we make payment'
      })
      loadinSpinner.present();

    // get card details;
   let  card_details ={
      expMonth: this.card.expMonth,
      expYear: this.card.expYear,
      cvc:this.card.cvc,
      number: this.card.number
    }
    this.stripe.setPublishableKey('pk_test_BaS7sO9TqkPmmPjyhOPKhHvQ');
    this.stripe.createCardToken(card_details)
    .then(data => {
      this.token = data.id;
      console.log(this.token);
       // post data
      const formdata = {
        token: this.token,
        amount: this.total,
        room_class: this.room,
        stay: this.navParams.get('stay'),
        checkin: this.navParams.get('checkin'),
        checkout: this.navParams.get('checkout'),
        country: this.card.country,
        phone: this.card.phone,
        zip: this.card.zip,
        name: this.card.name,
        email: this.card.email,
        address: this.card.address,


      }
      console.log(formdata);

      // connect to back end server
      this.http.post('http://localhost:3000/hotelluxuz/hotel/rooms/pay/' +this.navParams.get('id'),  formdata)
                   .subscribe(result => {
                           console.log(result);
                           if(result ==="mail successively sent") {
                             loadinSpinner.dismiss();

                             this.navCtrl.push(SuccessPage);
                           }
                   })


    })
    .catch(err => {
      loadinSpinner.dismiss();
      //alert
      this.alert.create({
         title: 'error',
         message: err.message,
         buttons:[
           {
             text: 'Ok',

           }
         ]
      }).present();
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    this.total = this.navParams.get('amount');
    this.room = this.navParams.get('room');
    this.room_number = this.navParams.get('room_number');
    console.log(this.navParams.get('checkout'));
    console.log(this.navParams.get('amount'));


  }

}
