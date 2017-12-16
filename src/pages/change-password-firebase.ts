import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-change-password-firebase',
  templateUrl: 'change-password-firebase.html',
})
export class ChangePasswordFirebasePage {

  profile:any;
  loadingAlert:any;
  private changePass : FormGroup;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuth:AngularFireAuth,
    private fBuild: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl:LoadingController,
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
        this.showToast("Change Password Success!!");
      }, error=>{
        console.log(error);
        this.toastError("Something Error");
      });
    }, error=> {
      console.log(error);
      this.toastError("Your Old Password is Wrong");
    });
  
  }

  showToast(msg){
    let toast = this.toastCtrl.create({
       message : msg,
       position : 'top',
       duration : 1000
     });
     toast.present();
  }

  toastError(msg){
     let toast = this.toastCtrl.create({
       message : msg,
       position : 'top',
       cssClass : 'toastError',
       duration : 3000
     });
    
     toast.present();
  }

  showLoadingAlert(content, duration){
    this.loadingAlert = this.loadingCtrl.create({content: content, duration: duration});
    this.loadingAlert.present();
  }

  closeLoadingAlert(){
    this.loadingAlert.dismiss();
  }
}
