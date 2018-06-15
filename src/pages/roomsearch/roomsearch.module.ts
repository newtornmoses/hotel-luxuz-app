import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoomsearchPage } from './roomsearch';

@NgModule({
  declarations: [
    RoomsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RoomsearchPage),
  ],
})
export class RoomsearchPageModule {}
