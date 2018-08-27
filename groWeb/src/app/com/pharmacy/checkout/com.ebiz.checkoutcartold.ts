import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/

import {CartService} from './../service/com.pharmacy.service.cartservice';
import {OrderService} from './../service/com.ebiz.service.orderservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {CartTotal} from './../model/com.pharmacy.model.cart';
import {OrderRequest,OrderSummary} from './../model/com.ebiz.model.order';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {UserMgmtService} from '../../usermgmt/service/com.service.usermgmt';
import {Address} from '../../common/model/com.common.model.address';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import {Observable} from 'rxjs/Observable';
import{UserAddress} from '../../usermgmt/address/com.usermgmt.useraddress'
declare var $: any;
@Component({
  moduleId: module.id,
  selector: 'checkout-cart',
  templateUrl: 'com.ebiz.checkoutcart.html',
  styleUrls :['com.ebiz.checkoutcart.css'],
  providers: [CartService,AlertService,OrderService,UserMgmtService,RestApiService]

})
export class CheckoutCart extends FormComponent{
  cartTotal :CartTotal;
  shippingAddressId : number;
  email: string;
  user:any;
  cities:any;
  states:any;
  primaryPhone : string;
  payMethod:any;
 paymentForm:FormGroup;
 addressForm:FormGroup;
 creditCard:any;
 expirationDate:any;
 cvc:any;city:string;
 isCreditOpen:boolean=false;
isModalOpen:boolean= false;
isModalOpen2:boolean = false;
isModalOpen3:boolean = false;
openDeliveryAddress: boolean = false;
openBillingAddress: boolean = false;
shippingAddress:any;
shippingAddId:number = 0;
billingAddressId:number;
newAddress:boolean=false;
closeButton:boolean = false;
address = new Address();
billingAddress = new Address();
orderCalculation = new OrderSummary();
public cardNo_mask = [ /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
public date_mask = [ /[0-3]/ , /[0-9]/, '/', /[1-9]/, /\d/]
public cvv_mask = [/[0-9]/, /\d/,/\d/,/\d/]
 
  constructor(private _userProfileService: UserProfileService,
              private _userMgmtService: UserMgmtService,
              private _restApiService:RestApiService,
              injector:Injector,
              private _orderService : OrderService,
              private _cartService : CartService,
              private fb: FormBuilder) {

              super(injector);
             
              this.user = this._sessionStorageService.getObject("userProfile");
              this.cartTotal = _cartService.getCartSummaryFromSession();  
              this.email = _userProfileService.getUserProfileValue('email');
              this.primaryPhone = _userProfileService.getUserProfileValue('phoneNumber');        
              var userAddress = _userProfileService.getAddress();
          //   this.getShippingAddress();  
              this._restApiService.get("/address/getStates/").then(res => this.cb_getState(res));
              // if(userAddress){
              //   this.shippingAddressId = userAddress.id;
              // }
             this.paymentForm = this.fb.group({
              creditCard: ['', Validators.required],
              expirationDate: ['',Validators.required],
              cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]] 
            });
              this.addressForm = this.fb.group({
                _name:['',Validators.required],
                _street:['',Validators.required],
                _city:['',Validators.required],
                _state:['',Validators.required],
                _zipCode:['',Validators.required],
                _street2:[],
               
              });
              
  }
 
  cb_getShippingAddress(res){
    console.log(res)
    if(res.isSuccess){
    this.address = res.address;
    console.log(this.shippingAddress)
    this.shippingAddressId = this.address.id
    this.city = this.address.city
    this.getOrderSummary();
    }
    else{
      this.newAddress = true;
    }
  }
   getShippingAddress(){
    this._restApiService.getById('/usermgmt/getShippingAddressById/',this.user.id).then(res=>this.cb_getShippingAddress(res))
  }
  cb_getState(res){
    // alert(JSON.stringify(res));
    this.states = res.states;
    this.getCities()
   }
  
  
   getCities(){
    // alert(stateId);
     this._restApiService.get("/address/getCities").then(res => this.cb_getCities(res));
   }
  cb_getCities(res){
    // alert(JSON.stringify(res));
    this.cities = res.cities;
   }
  copyProfileAddress(){
    this.address = this._userProfileService.getUserProfileValue('address');
    this.address.id = 0;
  }
  copyProflieToBillingAddress(){
    this.billingAddress = this._userProfileService.getUserProfileValue('address');
    this.billingAddress.id = 0;
  }
  placeOrder(){

      if(this.shippingAddressId==null){
        
        alert("Please provide shipping address");
       return;
      }
      if(this.payMethod==null){
       
        alert("Please provide Payment Method & Checkout");
        
        return;
      }
      

      var orderRequest:OrderRequest = new OrderRequest();
      if(this.shippingAddressId!=null){
        orderRequest.billingAddressId = this.billingAddressId;
        orderRequest.shippingAddressId = this.shippingAddressId;
      }else{
        alert("Address is not saved!")
        
      }
     // this.display = 'block'
     if(this.payMethod == "Pay by Card" ){
      var request = {
        makePayment : {
          cardNumber:this.creditCard,
          expirationDate:this.expirationDate,
          cardCode:this.cvc,
          totalAmount:this.cartTotal.totalPrice,
          userDetails:this.user
        },
        placeOrder:{
          userId:this.user.id,
          billingAddressId:this.billingAddressId,
          shippingAddressId:this.shippingAddressId,
          paymentMethod:"Pay By Card"
  
        }
      }
      if(this.paymentForm.valid){
        
        this._orderService.payByCredit(request).then(res=>this.cb_payForOrder(res))
        this.isModalOpen3 = true;
      }
      else{
        this.isModalOpen2= true;
       
      }
     }
     else{
      orderRequest.paymentMethod = this.payMethod;  
      this.isModalOpen3 = true;
      this._orderService.placeOrder(orderRequest).then(res => this.cb_placeOrder(res));
     }
     
   
      
  }
  // payForOrder(){
  //   var request = {
  //     makePayment : {
  //       cardNumber:this.creditCard,
  //       expirationDate:this.expirationDate,
  //       cardCode:this.cvc,
  //       totalAmount:this.cartTotal.totalPrice,
  //       userDetails:this.user
  //     },
  //     placeOrder:{
  //       userId:this.user.id,
  //       billingAddressId:this.shippingAddressId,
  //       shippingAddressId:this.shippingAddressId,
  //       paymentMethod:"PayByCArd"

  //     }
  //   }
  //  this.isModalOpen3 = true;
  //   this._orderService.payByCredit(request).then(res=>this.cb_payForOrder(res))

  // }
  cb_payForOrder(res){
    if(res.isSuccess){
     this.isModalOpen3 = false;
      console.log(res.orderResponse)
      this._loggingService.logDebug(this.getName(), JSON.stringify(res));
      this._sessionStorageService.setObject("placeOrderResponse",res.orderResponse.order);
      AlertService.getInstance().publishMessage('success','Order place sucessfully! Order#:'+ res.orderResponse.order.id);
      SessionDataService.getInstance().updateTotalCartItemsCount("0");
      this._router.navigate(['dashboard/order-summary']);
    // alert(res.isSuccess);
    }else{
      this.isModalOpen3 = false;
      this.isModalOpen = true;
      this.cvc = "";
    }
  }
  cb_placeOrder(res){
    if(res.isSuccess){
      this.isModalOpen3 = false;
      this._loggingService.logDebug(this.getName(), JSON.stringify(res));
      this._sessionStorageService.setObject("placeOrderResponse",res.order);
      AlertService.getInstance().publishMessage('success','Order place sucessfully! Order#:'+ res.order.id);
      SessionDataService.getInstance().updateTotalCartItemsCount("0");
      this._router.navigate(['dashboard/order-summary']);
    // alert(res.isSuccess);
    }else{
      this.isModalOpen3 = false;
      this.isModalOpen = true;
    }
  }
  addressChanged(event)
   {
     this.billingAddressId = event.addressId;
   } 
   onCredit(value){
    if(value == 3){
      this.isCreditOpen = true;
      this.openBillingAddress = true;
    }
    else{
      this.isCreditOpen = false;
    }
      
   } 
   deleteModal(){
    this.isModalOpen =false;
   }
   deleteModal2(){
    this.isModalOpen2 =false;
   }
   onRadioChange(id){
    if(id == 2)
      this.newAddress = true;
    else
      this.newAddress = false;
   }
   openAddress(id,value){
     alert(value)
    this.shippingAddId = id;
    if(value == false){
    this.newAddress = false;
    this.openDeliveryAddress = true;
    }
    else{
    this.newAddress =true;this.openDeliveryAddress = false;
    }
   }
   openNewAddress(value){
     if(value == false)
      this.newAddress =true;
     else
      this.newAddress = false
   }
   cb_addNewAddress(res){
    this.shippingAddressId = res.addressId
    this.newAddress = false;
    this.openDeliveryAddress = true;
   // this.addressForm.reset();
   // this.getShippingAddress();
   }
   addNewAddress(){
     this.address.userId = this.user.id
    this.address.addressType = 1;
    this._userMgmtService.addNewAddress(this.address).then(res => this.cb_addNewAddress(res));
   }
   addBillingAddress(){
    this.billingAddress.userId = this.user.id
    this.billingAddress.addressType = 2;
    this._userMgmtService.addNewAddress(this.billingAddress).then(res => this.cb_addNewAddress(res));
   }
   getOrderSummary(){
     var request = {
       userId: this.user.id,
       city:this.city
     }
     this._orderService.getOrderCalculation(request).then(res=>this.cb_getOrderSummary(res))
   }
   cb_getOrderSummary(res){
    this.orderCalculation = res.orderCalculation;
   }
}