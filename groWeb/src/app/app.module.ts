import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {routing} from './app.routing';
import {APP_BASE_HREF} from '@angular/common';
import {APP_INITIALIZER} from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms';

// Create config options (see ILocalStorageServiceConfigOptions) for deets:
let localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'sessionStorage'
};
//----
//import { NgIdleModule } from '@ng-idle/core';
import {PharmacyRouting} from './com/pharmacy/com.pharmacy.routing';
import {PharmacyModule} from './com/pharmacy/com.pharmacy.module';
//import { DashboardModule } from './com/dashboard/com.dashboard.module.js';
import { UserMgmtModule } from './com/usermgmt/com.usermgmt.module';
import {UsermgmtRouting} from './com/usermgmt/com.usermgmt.routing';
import { HomeModule } from './com/home/com.home.module';
import { CommonModule } from './com/common/com.common.module';
import {ConfigService} from './com/common/service/config/com.common.service.config.configmanager';
import {AppUtil} from './app.util'



@NgModule({
  imports:      [ 
   
     BrowserModule , 
   //  CommonModule, 
  //   DashboardModule,
//  NgIdleModule.forRoot(),
     HomeModule,
     UserMgmtModule,
     PharmacyModule,
     UsermgmtRouting,
     PharmacyRouting,
     ReactiveFormsModule,
     
    //  NgIdleKeepaliveModule.forRoot(),
     routing],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, 

  ConfigService,
      {
      provide: APP_INITIALIZER,
      useFactory:AppUtil.initFactory,
     // useFactory: (config:ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    }


  ]
  
})


export class AppModule { }

