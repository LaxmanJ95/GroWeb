import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {  ActivatedRoute } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 

import {CartService} from './../service/com.pharmacy.service.cartservice';
import {OrderService} from './../service/com.ebiz.service.orderservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {OrderRequest} from './../model/com.ebiz.model.order';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {Address} from '../../common/model/com.common.model.address';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-orders',
  templateUrl: 'com.ebiz.myorders.html',
  styleUrls:['com.ebiz.customerorders.css'],
  providers:[OrderService]
})
export class MyOrders extends FormComponent{
  orders:any;
  currentPage:number=0;
  lastPage:number;
  userId:number;
  constructor(injector:Injector,
            private _orderService : OrderService,
            private _userProfileService: UserProfileService
            ) {
              super(injector);  
              this.userId = _userProfileService.getUserId();
              //this.order = new OrderSummary
              this._orderService.retrieveMyOrders().then(res => this.handleResponse(res));
              //this.orders = this._sessionStorageService.getObject("placeOrderResponse");
  }
  handleResponse(res){
      console.log(res);
      this.orders =res.orders;
      this.currentPage = 1;
      var count = this.orders.length;
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
  viewMyOrder(orderId){
     // alert(orderId);
      this._router.navigate(['dashboard/order-summary/'+orderId]);
  }
  print(){
    window.print();
  }
  cb_getDataPagination(res){
    this.orders = res.orders;
  }
  pagesearch(event){
    // alert(this.currentPage)
    // this.currentPage = null;
    var request = {
      userId : this.userId,
      value:this.currentPage
    }
   this._orderService.getMyOrderPagination(request).then(res=>this.cb_getDataPagination(res));
     console.log("previous value "+this.currentPage)
   }
   start(){
    
        this.currentPage = 1;
        var request = {
          userId : this.userId,
          value:this.currentPage
        }
        this._orderService.getMyOrderPagination(request).then(res=>this.cb_getDataPagination(res));
        console.log("previous value "+this.currentPage)
      
   }
   previous(){
    console.log("previous in current "+this.currentPage)
    console.log("previous in last "+this.lastPage)
      if(this.currentPage > 1){
       this.currentPage -= 1;
       var request = {
        userId : this.userId,
        value:this.currentPage
      }
      this._orderService.getMyOrderPagination(request).then(res=>this.cb_getDataPagination(res));
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
          userId : this.userId,
          value:this.currentPage
        }

        this._orderService.getMyOrderPagination(request).then(res=>this.cb_getDataPagination(res));
        
   }
  }
   end(){
     this.currentPage = this.lastPage
     var request = {
      userId : this.userId,
      value:this.currentPage
    }
    this._orderService.getMyOrderPagination(request).then(res=>this.cb_getDataPagination(res));
  
   }

}