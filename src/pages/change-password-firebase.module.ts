import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePasswordFirebasePage } from './change-password-firebase';

@NgModule({
  declarations: [
    ChangePasswordFirebasePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePasswordFirebasePage),
  ],
})
export class ChangePasswordFirebasePageModule {}
