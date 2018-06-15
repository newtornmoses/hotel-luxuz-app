import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleRoomPage } from './single-room';

@NgModule({
  declarations: [
    SingleRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleRoomPage),
  ],
})
export class SingleRoomPageModule {}
