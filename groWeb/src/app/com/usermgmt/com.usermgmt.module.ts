import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpModule } from '@angular/http';
import {SignUpComponent} from './signup/ui/com.usermgmt.signup';
import {ConfirmSignUpComponent} from './signup/ui/com.usermgmt.signup.confirm';
import {SignUpSuccessComponent} from './signup/ui/com.usermgmt.signup.success';
import {SignUpErrorComponent} from './signup/ui/com.usermgmt.signup.error';
import { EqualValidator } from './signup/validators/com.usermgmt.equal.validator.directive';
import {ForgotUsername} from './forgot/com.usermgmt.forgotusername';
import {ForgotPassword} from './forgot/com.usermgmt.forgotpassword';
import {CommonModule} from '../common/com.common.module';
import {UserProfile} from '../usermgmt/profile/com.usermgmt.userprofile';
import {UserAddress} from '../usermgmt/address/com.usermgmt.useraddress';
import {BusinessInfoComponent} from './businessInfo/com.usermgmt.businessInfo'
import {AgmCoreModule} from 'angular2-google-maps/core'

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : 'AIzaSyDQMQVJlTuOpgTItbuLBWHzMmp9-iaO2ys'
});
@NgModule({
  imports:      [ BrowserModule,googleMapsCore ,FormsModule,HttpModule,ReactiveFormsModule,CommonModule,],
  declarations: [ SignUpComponent,ConfirmSignUpComponent,SignUpSuccessComponent,SignUpErrorComponent,UserProfile,ForgotUsername,ForgotPassword,
                  EqualValidator,UserAddress,BusinessInfoComponent],
  exports:    [ SignUpComponent,ConfirmSignUpComponent,SignUpSuccessComponent,SignUpErrorComponent,ForgotUsername,ForgotPassword,
                  UserProfile,UserAddress, BusinessInfoComponent]
})
export class UserMgmtModule { }


