import { Component } from '@angular/core';
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
import { WishList } from '../model/com.ebiz.model.wishlist';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { UserProfileService } from '../../usermgmt/service/com.service.userprofile';

@Component({
  moduleId: module.id,
  selector: 'view-wishlist',
  templateUrl: 'com.pharmacy.wishList.html',
  styleUrls :['com.pharmacy.wishlist.css'],
  providers: [CartService,RestApiService,UserProfileService]

})
export class ViewWishList extends FormComponent{
  
  wishLists: WishList[];
  userId:any;
  cart : CartTotal;
  cartList : any;
  cartTotal : CartTotal;
  constructor(injector:Injector,
              private _cartService : CartService,
              private _userProfileService: UserProfileService,
              private _restApiService : RestApiService
              ) {
                super(injector);;   
                this.getWishList();  
                this.getCartList();      
                this.cartTotal = _cartService.getCartSummaryFromSession();     
                this.userId = _userProfileService.getUserId();

  }
  getWishList(){
    this._cartService.viewWishList().then(res => this.handleWishListResponse(res));
  }
  getCartList(){
    this._cartService.viewMyCart().then(res => this.handleCartListResponse(res))
  }
  handleWishListResponse(res){
    console.log(res.wishList)
    this.wishLists = res.wishList;
   // if(this.wishLists.length == 0){
      this.mapWishListResponse(res);
   // }
    this._loggingService.logDebug(this.getName(), JSON.stringify(res));
  }
  handleCartListResponse(res){
    this.cartList = res.cart;
    for(let x of this.cartList){
      for(let y of this.wishLists){
        if(x.productId == y.productId)
          y.inCart = true;
      }
    }
  }
  add2Cart(id,productId,quantity){
   var request = {
     wishListId: id,
     productId : productId,
     quantity:quantity,
     userId:this.userId
   }
this._cartService.add2CartById(request).then(res => this.handleAdd2CartResponse(res));
  }
  handleAdd2CartResponse(res){
    if(res.isSuccess){
      this.mapCartResponse(res);
      this.getWishList()
      this._cartService.setCartSummaryToSession(res.cartTotal);
        
    }
  }
  mapCart(){
    SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cartTotal.totalQuantity);
  }
  mapCartResponse(res){
  //  alert(res.cartTotal.totalQuantity)
    this.cart = res.cartTotal
    this.cart.totalQuantity=res.cartTotal.totalQuantity;
    this.cart.totalPrice= res.cartTotal.totalPrice;
    SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cart.totalQuantity);
    this.showCart()  
}
  mapWishListResponse(res){
    this.wishLists = res.wishList;
    var count = this.wishLists.length
    SessionDataService.getInstance().updateWishListActive(""+count)
  }
  deleteWishList(id){
      this._restApiService.getById('/wishlist/deleteFormWishList',id).then(res => this.cb_deleteWishList(res))
  }
  cb_deleteWishList(res){
    if(res.isSuccess){
        this.getWishList();
        this.getCartList();
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
  

  viewItem(id:string){
     this._router.navigate(['dashboard/grocery-viewproduct/'+id]);
  }
  showCart(){
    this._router.navigate(['dashboard/view-cart']);
  }
  uploadPrescription(id){
    this._router.navigate(['dashboard/upload-prescription/'+id]);
  }
  back2SearchDrug(){
    this._router.navigate(['dashboard/grocery-products']);
  }
}