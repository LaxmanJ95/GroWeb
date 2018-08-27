import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
//========
import {CommonModule} from '../common/com.common.module';
import { LoginComponent }   from './../usermgmt/login/ui/com.usermgmt.login';
//import { LoginComponent }   from 'app/com/usermgmt/login/ui/com.usermgmt.login';

import { HomeMainComponent }   from './main/ui/com.home.main';
import { ContentBoxComponent }   from './contentbox/ui/com.home.contentbox';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule,CommonModule],
  declarations: [ ContentBoxComponent,LoginComponent,HomeMainComponent],
  exports:    [ ContentBoxComponent,LoginComponent,HomeMainComponent,]
})
export class HomeModule { }