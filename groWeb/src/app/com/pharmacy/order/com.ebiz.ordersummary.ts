import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {  ActivatedRoute } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {OrderService} from './../service/com.ebiz.service.orderservice';
import {CartService} from './../service/com.pharmacy.service.cartservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {OrderRequest} from './../model/com.ebiz.model.order';
import {Order} from './../model/com.ebiz.model.order';
import {FileService} from './../service/com.ebiz.service.fileservice';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {Address} from '../../common/model/com.common.model.address';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
@Component({
  moduleId: module.id,
  selector: 'checkout-cart',  
  templateUrl: 'com.ebiz.ordersummary.html',
  providers: [CartService,OrderService,FileService]

})
export class OrderSummary extends FormComponent{
  order:any;
  prescriptionUploads: any;
  firstPrescription: string;
  billingAddress = new Address;
  subscription;
  accountNo:any;
  orderId:number = 0;
  isModalOpen:boolean = false;
  constructor(injector:Injector,
              private _orderService : OrderService,
              private _fileService : FileService,
              private _cartService : CartService,
              private _route : ActivatedRoute,
             ) {
              super(injector); 
              //console.log("OOOESWE:"+JSON.stringify(this.order))        
              this.order = this._sessionStorageService.getObject("placeOrderResponse");
              this.accountNo = this._sessionStorageService.getObject("accountNo")
  }
  viewMyOrders(){
      this._router.navigate(['dashboard/my-orders']);
  }
  ngOnInit(){
   // alert(JSON.stringify(this._route.params));
    this.subscription= this._route.params.subscribe(params=>{
         var id=+params["id"];
       //  alert(id)
         if(Number.isInteger(id)){
           this.orderId = id;
           this.order = this.getEmptyOrderObj();
          // alert(JSON.stringify(this.order.shippingAddress));
           this.retriveOrderById()
          
         }else{
          //this.order = this._sessionStorageService.getObject("placeOrderResponse");
         }
    });
  }
  ngOnDestroy(){
     this.subscription.unsubscribe();
     this._sessionStorageService.setObject("placeOrderResponse","");
  }
  retriveOrderById(){
    this._orderService.retrieveOrderById(this.orderId).then(res => this.cb_retrieveOrderById(res));
  }
  cb_retrieveOrderById(res){
      //if(res.isSuccess){
       console.log("##RES#"+JSON.stringify(res.order));
       this.order = res.order;
    this.billingAddress = this.order.billingAddress
    //   alert(this.billingAddress)
      //}
  }
  cb_getFilesByOrderId(res){
    if(res.isSuccess){
     // alert(JSON.stringify(res));
      this.prescriptionUploads =res.prescriptionUploads;
      this.firstPrescription = res.prescriptionUploads[0];
    }else{
      alert("Error occured!")
    }
  }
  getEmptyOrderObj(){
      var str ='{"date": "","totalQuantity": 0,"totalPrice": 0,"shippingAddress": {"street": "","city": "","state": "","country": ""},"orderId": 0,"userId": 0,"orderDetail": [{"orderId": 0,"itemId": 0,"itemDescription": "","quantity": 0,"price": 0}]}';
      return JSON.parse(str);  
  }
  showUpoloadedFiles(orderId,cartId){
  //  alert(orderId+","+cartId);
    this._fileService.getFilesByOrderIdAndCartId(orderId,cartId).then(res => this.cb_getFilesByOrderId(res));
  }
  addOrder2Cart(orderId){
   // alert(orderId)
    this._cartService.add2CartFromOldOrder(orderId).then(res => this.cb_add2CartFromOldOrder(res));
  }
  cb_add2CartFromOldOrder(res){
    if(res.isSuccess){
        //alert(res);
        AlertService.getInstance().publishMessage('success','Order added to cart sucessfully! ');
        this.showCart();
    }else{
      alert("Error occured")
    }
  }

  copyOldOrder(orderId){
   // alert(orderId)
   // alert(orderId)
    this._orderService.copyOldOrder(orderId).then(res => this.cb_copyOldOrder(res));
    this.isModalOpen = true;
  }
  cb_copyOldOrder(res){
    this.isModalOpen = false;
    if(res.isSuccess){
        //alert(res);
        
        AlertService.getInstance().publishMessage('success','Order copied & placed sucessfully! ');
        this.showOrderSummary(res.id);
    }else{
      alert("Error occured")
    }
  }
  cancelOrder(){
    var request = {
      id:this.orderId
    }
    this._orderService.cancelOrder(request).then(res => this.retriveOrderById())
  }
  showCart(){
    this._router.navigate(['dashboard/view-cart/']);
  }
  showOrderSummary(orderId){
      this._router.navigate(['dashboard/order-summary/'+orderId]);
  }
  makePayment(orderId){
      var orderInfo = {
        orderId: this.order.orderId,
        currentOrderPrice: this.order.totalPrice,
        paymentMethod: this.order.paymentMethod
       // totalPrice: this.order.totalPrice,
     };
    this._sessionStorageService.setObject("order",this.order);

    this._router.navigate(['dashboard/payment-form/'+orderId]);
  }
  print(){
    window.print();
  }
}