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
import {UpdateQuantityRequest} from './../model/com.pharmacy.model.cart';
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
  email: string;
  isChanged:boolean = false;
  user:any;
  cities:any;
  states:any; cartItems: any;
  primaryPhone : string;
  payMethod:any;
 paymentForm:FormGroup;
 addressForm:FormGroup;
 creditCard:any;
 expirationDate:any;
 cvc:any;city:string = "Default";
 isCreditOpen:boolean=false;
isModalOpen:boolean= false;
isModalOpen2:boolean = false;
isModalOpen3:boolean = false;
openAddress:boolean = false;
openDeliveryAddress: boolean = false;
openBillingAddress: boolean = false;
billingAddressTab:boolean = false;
editDeliveryAdd:boolean = false;
shippingAddress:any;
shippingAddId:number = 0;
billingAddressId:number;
deliveryAddress:boolean=false;
closeButton:boolean = false;
address = new Address();
profileAddress = new Address()
newAddress = new Address();
newShippingAdd = new Address();
deliveryMethod : number = 0;
billingAddress = new Address();
orderCalculation = new OrderSummary();
isShippingNeed:number = 0;
openId:number;
// chooseAddress:boolean = false;
// isProfileAddress:boolean= false;
isUpdate: boolean = false;
public cardNo_mask = [ /[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
public date_mask = [ /[0-3]/ , /[0-9]/, '/', /[1-9]/, /\d/]
public cvv_mask = [/[0-9]/, /\d/,/\d/,/\d/]
@ViewChild('editAddressButton') demo:ElementRef;
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
              this.profileAddress = this._userProfileService.getUserProfileValue('address');  
              // if(this.profileAddress == null){
              //   this._sessionStorageService.setObject("session",1)
              //   this.isModalAddress = true;
              //   this._router.navigate(['/dashboard/user-profile'])
              // }
              this.city = this.profileAddress.city
              this.getShippingAddress();  
              this._restApiService.get("/address/getStates/").then(res => this.cb_getState(res));
              this.mapCartResponse();
              this.getOrderSummary();
              this.getCart();
            //  this.copyProfileToDeliveryAddress();
             
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
 
  getShippingAddress(){
    this._restApiService.getById('/usermgmt/getShippingAddress/',this.user.id).then(res=>this.cb_getShippingAddress(res))
  }
  cb_getShippingAddress(res){
    if(res.address != null){
      this.shippingAddress = res.address;
    }
    else{
      this.newShippingAdd = this._userProfileService.getUserProfileValue('address');
      this.newShippingAdd.addressType = 1;this.newShippingAdd.id=0;
      this._userMgmtService.addShippingAddress(this.newShippingAdd).then(res=>this.getShippingAddress())
    }
    // else{
    //   this.deliveryAddress = true;
    //   this.isProfileAddress = true;
    // }
  }  
  getCart(){
    this._cartService.viewMyCart().then(res => this.cb_getCart(res));
  }
  cb_getCart(res){
    this.cartItems = res.cart;
    console.log("cart @ aq "+JSON.stringify(this.cartItems))
  }
  cb_getState(res){
    this.states = res.states;
    this.getCities()
  }
   getCities(){
     this._restApiService.get("/address/getCities").then(res => this.cb_getCities(res));
   }
  cb_getCities(res){
    this.cities = res.cities;
   }
   cb_updateQuantity(res,desc,quantity){
    console.log("updateQuantity.."+res);
   // alert(quantity)
    if(res.isSuccess){
     
      this.getOrderSummary()
      if(quantity>0){
        AlertService.getInstance().publishMessage('success',desc + ' : Quantity updated to '+quantity+' successfully!');
      }else{
        AlertService.getInstance().publishMessage('warning',desc + ' : deleted from cart successfully!');
      }
    }
  }
   calculateTotalPrice(index,quantity){
    if(quantity != 0) {
    this.cartItems[index].saved = 0;
      this.isUpdate = false;
         var request = new UpdateQuantityRequest();
         this.cartItems[index].quantity = quantity;
         request.cartId = this.cartItems[index].id;
         request.productId = this.cartItems[index].productId;
         request.quantity = this.cartItems[index].quantity;
         var desc = this.cartItems[index].productName;
         this._loggingService.logDebug(this.getName(), "UpdateQuantity Request:"+JSON.stringify(request));
        this._cartService.updateQuantity(request).then(res => this.cb_updateQuantity(res, desc,quantity))
       // alert(JSON.stringify(this.cartItems)
    
        this.cartTotal.totalPrice=0;
        this.cartTotal.totalQuantity=0;
         for (let cartItem of this.cartItems) {
           //alert(cartItem.quantity)
           this.cartTotal.totalPrice += (cartItem.price * cartItem.quantity);
           this.cartTotal.totalQuantity += (1*cartItem.quantity);
         }
         SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cartTotal.totalQuantity);
        }
    }
  onRadioChange(value){
    this.deliveryMethod = value
    if(value == 2){
      this.isShippingNeed = value;
      this.openAddress = value;
      this.openDeliveryAddress = true;
    }
    else{
      this.isShippingNeed = 0;
      this.deliveryAddress = false;
      this.openAddress = false;
      this.shippingAddId = 0;
      this.address = this._userProfileService.getUserProfileValue('address');
      this.city = this.address.city
      this.getOrderSummary();
    }
  }
  addDelivery(value){
    if(value == false){
      this.deliveryAddress = true;
      //this.openDeliveryAddress = false
    }
    else
      this.deliveryAddress = false;
  }
  addDeliveryAddress(id){
  //  this.openDeliveryAddress = false
    this._userMgmtService.addNewAddress(id).then(res => this.cb_deliveryAddress(res));
  }
  cb_deliveryAddress(res){
    if(res.isSuccess){
      this.openDeliveryAddress = true;
      this.address.id = res.addressId
      this.city = res.city;
      this.openId = 0;
    this.deliveryAddress = false;
  //  this.openDeliveryAddress = true;
    }
  }
  editDeliveryAddress(id,value){
    if(value == true){
      this.openDeliveryAddress = true;
      this.editDeliveryAdd = false
    }
    else{
      this.editDeliveryAdd = true;
      this.openDeliveryAddress = false;
      }
    this.deliveryAddress = false;
  
    this.openId =id;
  }
  saveDeliveryAddress(){
    this.newAddress.userId = this.user.id;
    this.newAddress.addressType = 1;
    console.log("new address",this.newAddress)
    this._userMgmtService.addShippingAddress(this.newAddress).then(res => this.cb_saveAddress(res));
  }
  cb_saveAddress(res){
    if(res.isSuccess){
      this.addressForm.reset();
      this.deliveryAddress = false;
      this.getShippingAddress()
    }
  }
  deleteDeliveryAddress(id){
    this._restApiService.getById('/usermgmt/deleteAddress/',id).then(res=>this.getShippingAddress())
  }
  choosingAddress(addressID,city){
  //  alert(this.chooseAddress)
    this.city = city
   
   this.shippingAddId = addressID;
   //alert(this.shippingAddId)
   this.getOrderSummary()
  }
  saveBillingAddress(){
    this.billingAddress
 //   alert(this.billingAddress)
    console.log(this.billingAddress)
    //this._userMgmtService.addNewAddress(this.billingAddress).then(res => console.log("check value"+res.isSuccess));
  }
  copyProfileToDeliveryAddress(){
    this.address = this._userProfileService.getUserProfileValue('address');
    this.address.addressType = 1;
    this._userMgmtService.addShippingAddress(this.address).then(res=>this.cb_profile2Shipping(res))
  }
  cb_profile2Shipping(res){
    console.log(res)
  }
  getOrderSummary(){
    var request = {
      userId: this.user.id,
      city:this.city,
      shippingNeed:this.isShippingNeed
    }
    this._orderService.getOrderCalculation(request).then(res=>this.cb_getOrderSummary(res))
  }
  cb_getOrderSummary(res){
   this.orderCalculation = res.orderCalculation;
   console.log("calcilauiua ai iugdu "+JSON.stringify(this.orderCalculation))
  }
  onCredit(value){
    if(value == 3){
      this.isCreditOpen = true;
      this.openBillingAddress = true;
      this.copyProfileToBillingAddress();
    }
    else{
      this.isCreditOpen = false;
    }
  }
  copyProfileToBillingAddress(){
    this.billingAddress = this._userProfileService.getUserProfileValue('address');
    this.billingAddress.id = 0;
    this.billingAddress.addressType = 2;
    this._userMgmtService.addNewAddress(this.billingAddress).then(res => this.cb_profile2Billing(res))
  }
  cb_profile2Billing(res){
    this.billingAddress.id = res.addressId;
  }
  addBillingAddress(){
    this._userMgmtService.addNewAddress(this.billingAddress).then(res => this.cb_billingAddress(res));
  }
  cb_billingAddress(res){
    if(res.isSuccess){
      this.billingAddressTab = false;
      this.openBillingAddress = true;
    }
  }
  editBillingAddress(id,value){
    if(value == true){
      this.openBillingAddress = false
    }
    else
      this.openBillingAddress = true;
    this.billingAddressTab = true
  }

  placeOrder(){
  //  alert(this.shippingAddId)
      if(this.deliveryMethod == 0){
        
        alert("Please provide delivery method");
       return;
      }
      if(this.payMethod==null){
       
        alert("Please provide Payment Method & Checkout");
        
        return;
      }
      if(this.deliveryMethod == 2){
        if(this.shippingAddId == 0){
          alert("Choose the Delivery Address")
          return
        }
      }

      var orderRequest:OrderRequest = new OrderRequest();
     // if(this.address.id!=null){
    //    alert(this.shippingAddId)
        orderRequest.billingAddressId = this.billingAddress.id;
        orderRequest.shippingAddressId = this.shippingAddId;
    //  }
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
          billingAddressId:this.billingAddress.id,
          shippingAddressId:this.shippingAddId,
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
  cb_placeOrder(res){
    if(res.isSuccess){
      this.isModalOpen3 = false;
      //alert(res.accountNo)
      this._loggingService.logDebug(this.getName(), JSON.stringify(res.accountNo));
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
  cb_payForOrder(res){
    if(res.isSuccess){
     this.isModalOpen3 = false;
      console.log(res.orderResponse)
      this._loggingService.logDebug(this.getName(), JSON.stringify(res.accountNo));
      this._sessionStorageService.setObject("placeOrderResponse",res.orderResponse.order);
      this._sessionStorageService.setObject("accountNo",res.accountNo)
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
  updateQuantity(index){
    this.cartItems[index].saved = 1;
    this.isUpdate = true;
  }
  cancelUpdate(index){
    this.cartItems[index].saved = 0;
    this.isUpdate = false
  }
  deleteModal(){
    this.isModalOpen =false;
   }
   deleteModal2(){
    this.isModalOpen2 =false;
   }
   mapCartResponse(){
    SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cartTotal.totalQuantity);
  }
}