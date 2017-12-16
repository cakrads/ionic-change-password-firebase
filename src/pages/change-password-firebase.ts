import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FundraProvider } from '../../providers/fundra/fundra';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-change-password-firebase',
  templateUrl: 'change-password-firebase.html',
})
export class ChangePasswordFirebasePage {

  profile:any;
  private changePass : FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth:AngularFireAuth,
    public myprovider:FundraProvider,
    private fBuild: FormBuilder,
  ) {
    this.profile = this.navParams.data.item;
    this.changePass = this.fBuild.group({
      oldPassword: ['', Validators.required  ],
      newPassword: ['', Validators.required ]
    });
  }

  updatePassword(){
    // 1. Verivy Currenct Password
    let currentUser = this.afAuth.auth.currentUser;
    let credential  = firebase.auth.EmailAuthProvider.credential(currentUser.email, this.changePass.value.oldPassword);
    this.afAuth.auth.currentUser.reauthenticateWithCredential(credential).then(success=>{
      console.log(success);
      // 2. Update Password
      this.afAuth.auth.currentUser.updatePassword(this.changePass.value.newPassword).then(data=>{
        console.log(data);
        console.log("new password :", this.changePass.value.newPassword);
        this.myprovider.showToast("Change Password Success!!");
      }, error=>{
        console.log(error);
        this.myprovider.toastError("Something Error");
      });
    }, error=> {
      console.log(error);
      this.myprovider.toastError("Your Old Password is Wrong");
    });
  
  }
}
