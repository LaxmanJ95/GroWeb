import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';


import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {SessionDataService} from '../../common/service/com.common.sessiondata'

@Component({
  moduleId:module.id,
  selector: 'cart-count',
  templateUrl: 'com.common.cartcount.html',
  providers: [SessionDataService]

})
export class CartCount {
  totalQuantity: string ='0';
  totalPrice: string ='0';
  userName:string='';
  constructor(private _router: Router,
  private _sessionStorageService: SessionStorageService) {
           this.getLoggedUser()
             SessionDataService.getInstance().totalCartItemCount$.subscribe(total=> {
               //alert(total);
               this.totalQuantity=total;
               //console.log("Header Total cart items:"+total);
             });
  }
getLoggedUser(){
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
        var userName;
        if(userProfileObj){
            userName = userProfileObj["firstName"];
        }
        if(userName!=null){
            this.userName=userName;
        }
  }
  showCart(){
      this._router.navigate(['dashboard/view-cart']);
  }
}