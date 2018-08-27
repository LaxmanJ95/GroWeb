import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {Injector} from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';

@Component({
  moduleId: module.id,
  selector: 'payment-confirm',
  templateUrl: 'com.ebiz.payment.confirm.html',
  providers: []
})
export class PaymentConfirmation extends FormComponent{

   paymentInfo:any;
   //paymentAmount:number;
     constructor(private _userProfileService: UserProfileService,
              injector:Injector
              ){
        super(injector);  
        this.paymentInfo = this._sessionStorageService.getObject("paymentInfo");
      // this.email = ;
    }

    showDashboard(){
    this._router.navigate(['dashboard']);
    }

 }

  

