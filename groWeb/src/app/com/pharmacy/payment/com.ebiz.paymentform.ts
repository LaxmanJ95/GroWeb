import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/

import {CartService} from './../service/com.pharmacy.service.cartservice';
import {OrderService} from './../service/com.ebiz.service.orderservice';
import {PaymentService} from './../service/com.ebiz.service.paymentservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {CartTotal} from './../model/com.pharmacy.model.cart';
import {OrderRequest} from './../model/com.ebiz.model.order';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {UserMgmtService} from '../../usermgmt/service/com.service.usermgmt';
import {Address} from '../../common/model/com.common.model.address';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import {SessionDataService} from '../../common/service/com.common.sessiondata'


@Component({
  moduleId: module.id,
  selector: 'payment-form',
  templateUrl: 'com.ebiz.paymentform.html',
  providers: [PaymentService,AlertService]

})
export class PaymentForm extends FormComponent{

  order:any;
  paymentAmount:number;
  paymentMethod:string;
  customerBalance:number=0;
  constructor(private _userProfileService: UserProfileService,
              injector:Injector,
              private _paymentService : PaymentService) {

              super(injector);  
             
             this.order = this._sessionStorageService.getObject("order");
             var userId =this._userProfileService.getUserId();
             this._paymentService.get("customerBalance",userId).then(res => this.cb_customerBalance(res));
              
  }
  onSubmit(f){
   // alert(f.value.paymentAmount);
   this.paymentAmount =f.value.paymentAmount;
      var request = {
        userId: this._userProfileService.getUserId(),
        orderId: this.order.id,
        payment :f.value.paymentAmount,
        paymentMethod: f.value.paymentMethod,
        paymentAgent:f.value.paymentAgent
     };
  //   alert(JSON.stringify(request))
     this._paymentService.post("customerPayment",request).then(res => this.cb_customerPayment(res));
  }
  cb_customerBalance(res){
     if(res.isSuccess){
       this.customerBalance = res.paymentDue;
     }
  }
  cb_customerPayment(res){
    if(res.isSuccess){
        var paymentInfo = {
          error:false,
          paymentAmount:this.paymentAmount,
          email: this._userProfileService.getUserProfile()['email']
        }

    }else{
        var paymentInfo = {
          error:true,
          paymentAmount:this.paymentAmount,
          email: this._userProfileService.getUserProfile()['email']
        }
      alert("Error Occured!!")
    }
       this._sessionStorageService.setObject("paymentInfo",paymentInfo);
      this._router.navigate(['dashboard/payment.confirm']);   
  }
  
 
}