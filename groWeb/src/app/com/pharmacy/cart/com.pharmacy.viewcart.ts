import { Component,AfterViewInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';

import {CartService} from './../service/com.pharmacy.service.cartservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {CartTotal} from './../model/com.pharmacy.model.cart';


import {UpdateQuantityRequest} from './../model/com.pharmacy.model.cart';
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {Address} from '../../common/model/com.common.model.address';
declare var myExtObject: any;
@Component({
  moduleId: module.id,
  selector: 'view-cart',
  templateUrl: 'com.pharmacy.viewcart.html',
  styleUrls :['com.ebiz.viewcart.css'],
  providers: [CartService]
 
})
export class ViewCart extends FormComponent{
  cartTotal :CartTotal;
  profileAddress = new Address()
  cartItems: any;
  wishList: any;
  isModalAddress:boolean = false;
  aboveLimit:boolean = false;
  isSaved:boolean = false;
  public mask = [/[1-9]/, /\d/]
  constructor(injector:Injector,private _userProfileService: UserProfileService,
              private _cartService : CartService
              ) {
                super(injector);
             this.cartTotal = new CartTotal();              
            this.getCartList();

  }
  getCartList(){
    this._cartService.viewMyCart().then(res => this.handleListCartResponse(res));
  }
  handleListCartResponse(res){
    console.log("response "+res.cart)
    this.cartTotal = res.cartTotal;
    this.cartItems = res.cart;
    for(let x of this.cartItems){
      if(x.quantity > 9){
        x.saved = 1;
      }
    }
    this.getWishList();
    this._loggingService.logDebug(this.getName(), JSON.stringify(res));
    this._cartService.setCartSummaryToSession(this.cartTotal);
    this.mapCartResponse()
  }
  getWishList(){
    this._cartService.viewWishList().then(res => this.cb_getWishList(res))
  }
  cb_getWishList(res){
    console.log("yuiyi "+JSON.stringify(this.cartItems))
    this.wishList = res.wishList;
    SessionDataService.getInstance().updateWishListActive(""+this.wishList.length);
    for(let x of this.cartItems){
      for(let y of this.wishList){
      if(x.productId == y.productId){
          x.isSaved = true
      }
      }
    }
  }
  cp_updateQuantity(res,desc,quantity){
    console.log("updateQuantity.."+res);
   // alert(quantity)
    if(res.isSuccess){
      if(quantity>0){
        AlertService.getInstance().publishMessage('success',desc + ' : Quantity updated to '+quantity+' successfully!');
      }else{
        AlertService.getInstance().publishMessage('warning',desc + ' : deleted from cart successfully!');
      }
    }
  }
 // updateQuantity(){
 //   var request = new UpdateQuantityRequest();
//    this._cartService.updateQuantity(request).then(res => this.cp_updateQuantity(res, desc,quantity));
//  }
  calculateTotalPrice(index,quantity){
    if(quantity == "10"){
      return this.cartItems[index].saved =1
    }
     var request = new UpdateQuantityRequest();
     this.cartItems[index].quantity = quantity;
     request.cartId = this.cartItems[index].id;
     request.productId = this.cartItems[index].productId;
     request.quantity = this.cartItems[index].quantity;
     var desc = this.cartItems[index].productName;
     this._loggingService.logDebug(this.getName(), "UpdateQuantity Request:"+JSON.stringify(request));
    this._cartService.updateQuantity(request).then(res => this.cp_updateQuantity(res, desc,quantity));
    
    if(quantity==0){
      this.cartItems.splice(index,1);
    }
   // alert(JSON.stringify(this.cartItems)

    this.cartTotal.totalPrice=0;
    this.cartTotal.totalQuantity=0;
     for (let cartItem of this.cartItems) {
       //alert(cartItem.quantity)
       this.cartTotal.totalPrice += (cartItem.price * cartItem.quantity);
       this.cartTotal.totalQuantity += (1*cartItem.quantity);
     }
     this._cartService.setCartSummaryToSession(this.cartTotal);
     SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cartTotal.totalQuantity);
  }
  saveForLater(value){
    var request = {
      id:value
    }
    this._cartService.saveWishList(request).then(res => this.cb_saveForLater())
  }
  cb_saveForLater(){
    this.getCartList();
    this.getWishList();
  }
  letterOnly(){
    myExtObject.letterOnly()
  }
  viewItem(id:string){
     this._router.navigate(['dashboard/grocery-viewproduct/'+id]);
  }
  checkout(){
    this.profileAddress = this._userProfileService.getUserProfileValue('address');  
    if(this.profileAddress == null){
      this._sessionStorageService.setObject("session",1)
      this.isModalAddress = true;
    }
    else{
      this._router.navigate(['/dashboard/checkout-cart']);
    }
  }
  cancel(){
    this.isModalAddress = false;
  } 
  moveToProfileAddress(){
    this._router.navigate(['/dashboard/user-profile'])
  }
  uploadPrescription(id){
    this._router.navigate(['dashboard/upload-prescription/'+id]);
  }
  mapCartResponse(){
    SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cartTotal.totalQuantity);
  }
}