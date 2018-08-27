import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent }   from './header/com.common.header';
import { FooterComponent }   from './footer/com.common.footer';
import { Menu }   from './menu/com.common.menu';
import { HomeMenu }   from './menu/com.common.homemenu';
import {UserHeader} from './userheader/com.usermgmt.userheader';
import {CartCount} from './cartcount/com.common.cartcount';
import {Alert} from './alert/com.common.alert';
import {APP_BASE_HREF} from '@angular/common';
import {Router ,Routes, RouterModule } from '@angular/router';
import {UserProfileService} from '../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {LoggingService} from '../common/service/logging/com.common.service.logging';
//import {UserMgmtModule} from '../usermgmt/com.usermgmt.module'
import {ConfigService} from './service/config/com.common.service.config.configmanager';
import {ImageUploader} from './imageuploader/com.common.imageuploader';
import {AppUtil} from '../../app.util'
import {FileUploadModule} from "ng2-file-upload";
import {APP_INITIALIZER} from '@angular/core'
import {Modal} from './modal/com.common.mymodal'
import { RestApiService } from './service/restapi/com.common.service.restapiservice';


@NgModule({
  imports:      [ BrowserModule ,RouterModule,FileUploadModule],
 declarations: [ HeaderComponent, FooterComponent,UserHeader,CartCount,Menu,HomeMenu,Alert,ImageUploader,Modal],
  exports:    [  HeaderComponent,FooterComponent,UserHeader,CartCount,Menu,HomeMenu,Alert,ImageUploader,Modal],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },
  UserProfileService ,
 SessionStorageService,
 LoggingService]
/*providers: [

  ConfigService,
      {
      provide: APP_INITIALIZER,
      useFactory:AppUtil.initFactory,
     // useFactory: (config:ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    }]*/

})
export class CommonModule { }