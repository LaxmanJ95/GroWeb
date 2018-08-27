import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {  ActivatedRoute } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 


import {SessionStorageService} from '../../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../../usermgmt/service/com.service.userprofile';

import {Injector} from '@angular/core';
import { RestApiService } from '../../../common/service/restapi/com.common.service.restapiservice';
import {BaseComponent} from '../../../common/basic/com.common.basic.basecomponent'
import { PaymentService } from '../../service/com.ebiz.service.paymentservice';
@Component({
  moduleId: module.id,
  selector: 'payment-details',
  templateUrl: 'com.ebiz.paymentDetails.html',
  styleUrls:['../../order/com.ebiz.customerorders.css'],
  providers:[RestApiService,PaymentService]
})
export class PaymentDetails extends BaseComponent{
  payments:any;
  currentPage:number=0;
  lastPage:number;
  userId:number;
  constructor(injector:Injector,private _paymentService:PaymentService,
    private _restApiService:RestApiService,
            private _userProfileService: UserProfileService
            ) {
              super(injector);  
              this.userId = _userProfileService.getUserId();
              //this.order = new OrderSummary
              this._restApiService.get('/payment/getPaymentInfo').then(res => this.handleResponse(res));
              //this.orders = this._sessionStorageService.getObject("placeOrderResponse");
  }
  handleResponse(res){
      console.log(res);
      this.payments =res.payments;
      this.currentPage = 1;
      var count = this.payments.length;
      console.log("count : "+count)
       var i = count/10;
       console.log("value of  i "+i)
             this.lastPage = Math.floor(i);
         if(i - this.lastPage == 0)
             console.log("this.lastpage :"+this.lastPage)
         else
            this.lastPage+=1;
            console.log("lastpage : "+this.lastPage)
  }
  getStatusColor(value){
    if(value == "Completed"){
      var colors ={
        'color':'#15cc15'
      }
      return colors;
    }
    if(value == "Failed"){
      var colors ={
        'color':'red'
      }
      return colors;
    }
    if(value == "Timed Out"){
      var colors ={
        'color':'orange'
      }
      return colors;
    }

  }
  print(){
    window.print();
  }
  cb_getDataPagination(res){
    this.payments =res.payments;
  }
  pagesearch(event){
    // alert(this.currentPage)
    // this.currentPage = null;
    var request = {
      value:this.currentPage
    }
   this._paymentService.getPaymentPagination(request).then(res=>this.cb_getDataPagination(res));
     console.log("previous value "+this.currentPage)
   }
   start(){
    
        this.currentPage = 1;
        var request = {
          value:this.currentPage
        }
        this._paymentService.getPaymentPagination(request).then(res=>this.cb_getDataPagination(res));
        console.log("previous value "+this.currentPage)
      
   }
   previous(){
    console.log("previous in current "+this.currentPage)
    console.log("previous in last "+this.lastPage)
      if(this.currentPage > 1){
       this.currentPage -= 1;
       var request = {
        value:this.currentPage
      }
      this._paymentService.getPaymentPagination(request).then(res=>this.cb_getDataPagination(res));
       console.log("previous value "+this.currentPage)
     }
   }
   next(){

     if(this.lastPage > this.currentPage){
    
        var page = +this.currentPage
        page+=1;
        this.currentPage = page
        console.log("page befoe send  "+page)
        var request = {
          value:this.currentPage
        }

        this._paymentService.getPaymentPagination(request).then(res=>this.cb_getDataPagination(res));
        
   }
  }
   end(){
     this.currentPage = this.lastPage
     var request = {
      value:this.currentPage
    }
    this._paymentService.getPaymentPagination(request).then(res=>this.cb_getDataPagination(res));
  
   }

}