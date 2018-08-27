import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {Injector} from '@angular/core';
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/
//----
import {User} from '../model/com.usermgmt.user.model'
import {UserExt} from '../model/com.usermgmt.user.model'
import {ChangePasswordRequest} from '../model/com.usermgmt.user.model'
import {UsernameValidators} from '../signup/validators/com.usermgmt.username.validator'
import {UniqueUsernameValidators} from '../signup/validators/com.usermgmt.uniqueuser.validator'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import { UserMgmtService } from '../service/com.service.usermgmt'
import {Address} from '../../common/model/com.common.model.address';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: 'com.usermgmt.userprofile.html',
  providers: [SessionDataService,UserMgmtService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class UserProfile extends BaseComponent{
   user = new User();
   userExt = new UserExt();

   changePasswordRequest = new ChangePasswordRequest();
   isFormValid :boolean= true;
   isModalOpen: boolean = false;
   formValidationErrorMsg :string = "";
location: Location;
  profileForm : FormGroup;
changePasswordForm : FormGroup;
  USER_PROFILE_UPLOADER_URL="upload/profileImageUploader";
  isExistingImageAvailable=true;
  EditPictureButtonLabel="Edit Picture"
 constructor(private _router: Router,
            injector:Injector,
            private _userProfileService: UserProfileService,
    private _userMgmtService: UserMgmtService,
    private fb: FormBuilder){
      super(injector); 
        this.loadUserProfile();


      this.profileForm = this.fb.group({ 
        _firstName: ['',Validators.required],
        _lastName: ['',Validators.required],
         _email: ['',Validators.required],
          _phoneNumber: ['',Validators.required],
          _doctorName :[],
          _doctorPhone :[]
      });

      this.changePasswordForm = this.fb.group({ 
        _oldPassword: ['',Validators.required],
        _password: ['', Validators.compose([
                              Validators.required,
                              Validators.minLength(3)])],
        _confirmPassword: ['',Validators.required]
      });

 }
 ValidForm(){
   if(this.profileForm.touched)
    return true;
  else
    return false;
 }
 loadUserProfile(){
   this.user = this._userProfileService.getUserProfile();
   this.userExt = this.user['userExt'];
   if(!this.userExt){
     this.userExt = new UserExt();
   }

 }
  saveProfile() {
  //  alert(this.userExt.profileImageURL)
  this.isModalOpen =true;
    this.userExt.userId = this.user.id;
    var request ={
      user: this.user,
      userExt: this.userExt
    }

    this._userMgmtService.updateUserProfile(request).then(res => this.cb_updateUserProfile(res));
  }
  cb_updateUserProfile(res){
    if(res.isSuccess){
      this.profileForm.markAsUntouched()
     // this.loadUserProfile()
      this.isModalOpen =false;
      this._userProfileService.setUserProfileValue("firstName", this.user.firstName);
      this._userProfileService.setUserProfileValue("lastName", this.user.lastName);
      this._userProfileService.setUserProfileValue("email", this.user.email);
      this._userProfileService.setUserProfileValue("phoneNumber", this.user.phoneNumber);
      this._userProfileService.setUserProfileValue("userExt", this.userExt);
      AlertService.getInstance().publishMessage('success','User profile updated successfully');
    //  alert('User profile updated successfully');
     // this.showDashboard();
    }else{
      AlertService.getInstance().publishMessage('danger','User profile not updated!');
    }
  }
  changePassword(){
    //alert(JSON.stringify(this.changePasswordForm));
  //  alert(JSON.stringify(this.changePasswordRequest))
  this.isModalOpen = true;
    this.changePasswordRequest.userId = this._userProfileService.getUserId();

    this._userMgmtService.changePassword(this.changePasswordRequest).then(res => this.cb_changePassword(res));
  }
  cb_changePassword(res){
      if(res.isSuccess){
        this.changePasswordForm.reset()
        this.isModalOpen =false;
        AlertService.getInstance().publishMessage('success','Password changed successfully');
        alert('Password changed successfully');
     //   this.showDashboard();
      }else{
        AlertService.getInstance().publishMessage('danger','Error in password change..'+ res.userErrorMsg );
      }
    //alert(JSON.stringify(res));
  }
 uploadComplete(event){
   this.userExt.profileImageUrl=event.uploadedURL;
   
 }
  editPicture(){
    this.isExistingImageAvailable=!this.isExistingImageAvailable;
    if(this.isExistingImageAvailable){
      this.EditPictureButtonLabel="Edit Picture"
    }else{
      this.EditPictureButtonLabel="Cancel Edit"
    }
  }
  showDashboard(){
    this._router.navigate(['dashboard']);
  }

 }

  

