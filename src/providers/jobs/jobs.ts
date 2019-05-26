
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//  import {Observable} from 'rxjs/Observable';
import  "rxjs/add/operator/map";



/*
  Generated class for the JobsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobsProvider {
 url ="https://luxuz-hotel-api.herokuapp.com/hotelluxuz/hotel/rooms";
 url2 ='http://localhost:3000/hotelluxuz/hotel/rooms';



  constructor(public http: HttpClient) {
    console.log('Hello JobsProvider Provider');

  }

// get all rooms
  get_rooms() {
    const headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.get( this.url, {headers: headers});

  }

  // get single room
  get_single(url) {
    const headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
     return this.http.get(this.url, {headers: headers});
  }



}
