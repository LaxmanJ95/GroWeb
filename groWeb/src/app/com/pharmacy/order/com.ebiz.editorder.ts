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
  styleUrls:['com.ebiz.customerorders.css'],
  templateUrl: 'com.ebiz.editorder.html',
  providers: [CartService,OrderService,FileService]

})
export class EditOrder extends FormComponent{
  order:any;
  prescriptionUploads: any;
  firstPrescription: string;
  subscription;
  billingAddress = new Address();
  constructor(injector:Injector,
              private _orderService : OrderService,
              private _fileService : FileService,
              private _route : ActivatedRoute,
             ) {
              super(injector); 
              console.log("OOOESWE:"+JSON.stringify(this.order))        
              this.order = this._sessionStorageService.getObject("placeOrderResponse");
  }
  viewMyOrders(){
      this._router.navigate(['dashboard/my-orders']);
  }
  saveOrder(){
      console.log("@@@@"+JSON.stringify(this.order));
      this._orderService.saveOrder({"order":this.order}).then(res => this.cb_saveOrder(res));
  }
  cb_saveOrder(res){
      this._loggingService.logInfo(this.getName(), JSON.stringify(res));
      AlertService.getInstance().publishMessage('warning','Order saved sucessfully! ');
      this._router.navigate(['dashboard/customer-orders']);
  }
  showUpoloadedFiles(orderId,cartId){
  //  alert(orderId+","+cartId);
    this._fileService.getFilesByOrderIdAndCartId(orderId,cartId).then(res => this.cb_getFilesByOrderId(res));
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
  ngOnInit(){
   // alert(JSON.stringify(this._route.params));
    this.subscription= this._route.params.subscribe(params=>{
         var id=+params["id"];
       //  alert(id)
         if(Number.isInteger(id)){
           this.order = this.getEmptyOrderObj();
          // alert(1)
           this._orderService.retrieveOrderById(id).then(res => this.handleMyOrderResponse(res));
         }else{
          //this.order = this._sessionStorageService.getObject("placeOrderResponse");
         }
    });
  }
  ngOnDestroy(){
     this.subscription.unsubscribe();
     this._sessionStorageService.setObject("placeOrderResponse","");
  }

  handleMyOrderResponse(res){
      //if(res.isSuccess){
       console.log("##RES#"+JSON.stringify(res.order));
       this.order = res.order;
       this.billingAddress = this.order.billingAddress
      //}
  }
  getEmptyOrderObj(){
      var str ='{"date": "","totalQuantity": 0,"totalPrice": 0,"shippingAddress": {"street": "","city": "","state": "","country": ""},"orderId": 0,"userId": 0,"orderDetail": [{"orderId": 0,"itemId": 0,"itemDescription": "","quantity": 0,"price": 0}]}';
      return JSON.parse(str);  
  }
  quantityUpdate(){
      var totalPrice=0;
       for (let orderDetail of this.order.orderDetail) {
           totalPrice += orderDetail.price * orderDetail.quantity;
       }
      // totalPrice = ;
       this.order.totalPrice=totalPrice.toFixed(2);
  }

}