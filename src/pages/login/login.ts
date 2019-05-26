import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {User} from '../../models/user';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
auth: User ={
  email: '',
  password:'',
  username:''
};
allow_login = true;
allow_signup = false;

 url ="http://localhost:3000/hotelluxuz/users/login";
  constructor(public navCtrl: NavController, public navParams: NavParams,
     public http: HttpClient, public alert: AlertController, public storage: Storage) {
  }


  // login
  login() {
   console.log(this.auth);

   this.http.post(this.url, this.auth)
              .subscribe(data => {
                console.log(data);
                const token = data;
                     // store token  in storage
                      this.storage.set('token', token);

                if(data['message']==="Not Authorized !!!") {
                  this.alert.create({
                    title: 'Wrong Credentials',
                    message: "please check your password or email",
                    buttons: [
                      {
                        text: "ok"
                      }
                    ]
                  }).present();
                  return;
                }
                else{
                      this.navCtrl.push(HomePage);
                }
              })
  }


  // signup
  signup() {
   this.allow_login = false;
  }

  // toggle signup/login
   toggle_signup_login(log, sig) {
    this.allow_login = log;
    this.allow_signup = sig;

  }


  // login as guest
  guest() {
    this.alert.create({ // let the user know hes loggin as a guest
      title: "Guest",
      message: 'You are logging in as a guest',
      buttons: [
        {
          text: "Ok",
          handler: () => {
              this.navCtrl.push(HomePage);

          }
        },

        {
          text: "Cancle"
        }
      ]
    }).present();
  }


  // page load
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
