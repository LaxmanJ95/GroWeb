import { Component , OnInit, OnDestroy,ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import {ProductService} from './../service/com.ebiz.service.productservice';
import {Product} from './../model/com.ebiz.model.product';
import {CartService} from './../service/com.pharmacy.service.cartservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {CartItem} from './../model/com.pharmacy.model.cart';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {WishList} from './../model/com.ebiz.model.wishlist'
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { SessionStorageService } from '../../common/service/com.common.sessionstorage';
import {UserHeader} from '../../common/userheader/com.usermgmt.userheader';
import {Address} from '../../common/model/com.common.model.address';
declare var jQuery :any;
@Component({
  moduleId: module.id,
  selector: 'view-drug',
  templateUrl: 'com.ebiz.viewproduct.html',
  styleUrls:['com.ebiz.viewproduct.css'],
  providers: [ProductService,CartService,RestApiService,SessionStorageService]

})
export class ViewProduct implements OnInit, OnDestroy{
  product :Product =new Product();
  id: number;
  subscription;
  count:any;
  cartList:any;
  cart : Cart;
  inCart : boolean = false;
  userId: number = 0;
  isWished:boolean = false;
  profileAddress = new Address()
  isModalAddress:boolean = false;
  isModalLogin:boolean = false;
  public mask = [/[1-9]/, /\d/]
  @Input('textMask')
  textMaskConfig = {
   
    guide: false,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  }
  constructor(private _router: Router,
    private elRef:ElementRef,
    private _location: Location,
              private _route: ActivatedRoute,
              private _restApiService: RestApiService,
              private _productService : ProductService,
              private _sessionStorageService: SessionStorageService,
              private _userProfileService: UserProfileService,
              private _cartService : CartService) {
              this.cart = new Cart();
             
              
             // _cartService.getCartSummary().then(res => this.handleCartSummaryResponse(res));
  }
  cb_getCartCount(res){
    this.getWishList()
    this.getCart();
    if(res.isSuccess){
      // alert(this.alertMsg);
      this.mapCartResponse(res);
     // this.showCart();
    }else{
      alert("Error cart count")
    }
  } 
  getWishList(){
    this._cartService.viewWishList().then(res=>this.cb_getWishList(res))
  }
  cb_getWishList(res){
   if(res.isSuccess){
   for(let x of res.wishList){
     if(x.productId == this.product.id)
        this.isWished = true;
   }
  }
  this.count = res.wishList.length
  this.mapWishListResponse();
  }
  getCart(){
    this._cartService.viewMyCart().then(res => this.cb_getCart(res))
  }
  cb_getCart(res){
    this.cartList = res.cart
    for(let x of this.cartList){
      if(x.productId == this.product.id)
        this.inCart = true;
    }
  }
  add2Cart(){
    if(this.userId != 0){
    var cartItems: CartItem[] = [];
          var cartItem = new CartItem();
          //cartItem.cartId= 4;
          cartItem.productId = this.product.id; 
          cartItem.quantity=this.product.quantity;
          cartItem.price= +this.product.costPrice;
          cartItem.userId=this.userId;
          //cartItem.userId=2;
          cartItems.push(cartItem);
    this.cart.cartItems= cartItems;
   // console.log("CART ITEMS:"+JSON.stringify(cartItems));
    this._cartService.add2Cart({"cart":cartItems}).then(res => this.handleAdd2CartResponse(res));
    }
    else{
      this.isModalLogin = true;
    }
  }
  handleAdd2CartResponse(res){
   // console.log(res);
    if(res.isSuccess){
      this.mapCartResponse(res);
      this.showCart();
    }else{

    }
  }  
  add2WishList(){
    if(this.userId != 0 && this.isWished == false){
      var wishLists: WishList[] = [];
      var i=0;

       var wishList = new WishList();
       wishList.productId = this.product.id;
       wishList.quantity= this.product.quantity;
       wishList.price= parseInt(this.product.costPrice);
       wishList.userId= this.userId;
       wishLists.push(wishList);
     this._cartService.add2WishList({"wishList":wishLists}).then(res => this.cb_add2Wish(res));
    }
    else if(this.userId != 0 && this.isWished == true){
      this.removeWishList()
    }
    else{
      this.isModalLogin = true;
    }
  } 
  cb_add2Wish(res){
    if(res.isSuccess){
      console.log("success")
      this.isWished = true;
      this.getWishList()
    }
  }
  removeWishList(){
    this._restApiService.getById('/wishlist/deleteFormWishList',this.product.id).then(res => this.cb_removeWishList(res))
  }
  cb_removeWishList(res){
    if(res.isSuccess){
      this.isWished = false;
      this.mapWishListResponse()
    }
  }
  mapCartResponse(res){
      this.cart.totalQuantity=res.cartTotal.totalQuantity;
      this.cart.totalPrice= res.cartTotal.totalPrice;
      SessionDataService.getInstance().updateTotalCartItemsCount(""+res.cartTotal.totalQuantity);
  }
  mapWishListResponse(){
    SessionDataService.getInstance().updateWishListActive(""+this.count)
  }
  ngOnInit(){
    this.subscription= this._route.params.subscribe(params=>{
         this.id=+params["id"];
         this._productService.viewProduct(this.id).then(res => this.cb_viewProduct(res));
         
         
        
    });
    this.userId = this._userProfileService.getUserId();  
    if(this.userId != 0)
    this._cartService.getCartCount().then(res => this.cb_getCartCount(res));
    //  this.getWishList();
    //  this.getCart();
  }
  ngOnDestroy(){
     this.subscription.unsubscribe();
  }
  handleCartSummaryResponse(res){
   // console.log(res);
    if(res.isSuccess){
      this.mapCartResponse(res);
     // this.showCart();
    }else{

    }
  } 

  cb_viewProduct(res){
    this.product = res.product;
   // console.log(JSON.stringify(this.drug));
  }

 back2SearchDrug(){
    this._location.back()
 }
    showCart(){
      this._router.navigate(['dashboard/view-cart']);
  }
  checkout(){
    this.profileAddress = this._userProfileService.getUserProfileValue('address');  
    if(this.profileAddress == null){
      this._sessionStorageService.setObject("session",1)
      this.isModalAddress = true;
    }
    else{
      this._router.navigate(['/dashboard/checkout-cart'])
    }
  }
  viewWishList(){
    this._router.navigate(['/dashboard/view-wishlist']);
  }
  moveToLogin(){
    this._router.navigate(['login']);
  }
  cancelModalLogin(){
    this.isModalLogin = false;
  }
  cancelModalAddress(){
    this.isModalAddress = false;
  } 
  moveToProfileAddress(){
    this._router.navigate(['/dashboard/user-profile'])
  }
}