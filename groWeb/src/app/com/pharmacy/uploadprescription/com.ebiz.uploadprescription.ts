import { Component } from '@angular/core';
import {Injector} from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { Router, ActivatedRoute,RouterModule } from '@angular/router';

import {ProductService} from './../service/com.ebiz.service.productservice';
import {FileService} from './../service/com.ebiz.service.fileservice';
import {Products} from './../model/com.ebiz.model.product';
import {CartService} from './../service/com.pharmacy.service.cartservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {CartTotal} from './../model/com.pharmacy.model.cart';
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'

//const URL = "http://localhost:8080/ebizWAPI/upload/uploader"
@Component({
  moduleId: module.id,
  selector: 'upload-prescription',
  templateUrl: 'com.ebiz.uploadprescription.html',
  providers: [ProductService,CartService,FileService]
})
export class UploadPrescription extends FormComponent{
  public uploader:FileUploader ;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  private PRES_UPLOAD_URL =  this._APIURL+ "/upload/uploader";

    alertMsg:string='';
  products :Products;
 // cart: Cart;
  cartTotal: CartTotal=new CartTotal();
  totalQuantity: string ='0';
  totalPrice: string ='0';
 // userId: any;
 id:number=0;
  uploadedFiles =[];
  subscription;
  fileDeleteIndex:number;
 prescriptionUploads:any;


   constructor(injector:Injector,
              private _userProfileService: UserProfileService,
              private _route: ActivatedRoute,
              private _fileService : FileService,
              private _cartService : CartService
              ) {
        super(injector);  
       // alert(1)
        this.cartTotal = _cartService.getCartSummaryFromSession();  
    //    alert(JSON.stringify(this.cartTotal));
              //this.order = new OrderSummary
              //this._orderService.retrieveCustomerOrders().then(res => this.handleResponse(res));
              //this.orders = this._sessionStorageService.getObject("placeOrderResponse");
              
              this.uploader = new FileUploader({url: this.PRES_UPLOAD_URL});
   
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.uploadedFiles.push(response)
         //   alert(response)
            if(this.id>0){ //if update cart then automatically update these files to cart
                this.updateUploadedFiles();
            }
        };
  }
  ngOnInit(){
    this.subscription= this._route.params.subscribe(params=>{
         this.id=+params["id"];
        // alert(this.id)
         if(Number.isInteger(this.id)){
            this._fileService.getFilesByCartId(this.id).then(res => this.cb_getFilesByOrderId(res));
         }else{
             this.id=0
         }
         
    });
  }
  ngOnDestroy(){
     this.subscription.unsubscribe();
  }

   cb_getFilesByOrderId(res){
    if(res.isSuccess){
     // alert(JSON.stringify(res));
      this.uploadedFiles =res.prescriptionUploads;
      //this.firstPrescription = res.prescriptionUploads[0];
    }else{
      alert("Error occured!")
    }
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  public dragFileAccepted(e:any):void{
    setTimeout(() => {
       this.upload();
    }, 300);

  }

  public upload(){
    //  alert(2)
    //  alert(this.uploader.queue.length)
        for (let item of this.uploader.queue) {
            if(!item.isSuccess){
                console.log("Uploading ..."+item._file);
                item.upload()
            }
            
      }
  }

   add2Cart(){
    
    var cartItems: CartItem[] = [];
    var cartItem = new CartItem();
   // cartItem.productId = 1; 
    cartItem.quantity=this.uploader.queue.length;
    cartItem.price=0;
    cartItem.userId=this._userProfileService.getUserId();
    cartItem.uploadedFiles = this.uploadedFiles.join();
    cartItem.presOrder=1;
    cartItems.push(cartItem);
          
    this._cartService.add2Cart({"cart":cartItems}).then(res => this.cb_add2Cart(res,true));
  }
cb_add2Cart(res,navigate2cart){
    console.log(res);
    if(res.isSuccess){
      this.mapCartResponse(res);
      if(navigate2cart)
        this.showCart();
    }else{
      alert("Error add2Cart")
    }
  }

   mapCartResponse(res){
      this.cartTotal.totalQuantity=res.cartTotal.totalQuantity;
      this.cartTotal.totalPrice= res.cartTotal.totalPrice;
      SessionDataService.getInstance().updateTotalCartItemsCount(""+res.cartTotal.totalQuantity);
      this.alertMsg = "PRODUCT UPLOADED added to the cart."
      AlertService.getInstance().publishMessage('Success',this.alertMsg);
      //alert(this.alertMsg);
  }
 updateUploadedFiles(){
  //   alert(id);
      var request = {
        cartId: this.id,
        uploadedFiles: this.uploadedFiles.join()
     };
   //  alert(JSON.stringify(request));

     this._cartService.updateUploadedFiles(request).then(res => this.cb_updateUploadedFiles(res));

 }
 cb_updateUploadedFiles(res){
     if(res.isSuccess){
         this.alertMsg = "Uploaded files  added to the cart."
         AlertService.getInstance().publishMessage('Success',this.alertMsg);
        // this.showCart();
     }else{
         alert("Error occured");
     }
 }
deleteUploadeFile(index,uploadedFile){
    var request = {
        filePath: uploadedFile
     };
    this._cartService.deleteUploadedFiles(request).then(res => this.cb_deleteUploadedFiles(res));
    this.fileDeleteIndex=index;

    //alert(index)
}
cb_deleteUploadedFiles(res){
    if(res.isSuccess){
        this.uploadedFiles.splice(this.fileDeleteIndex,1)
        this.alertMsg = "Files Deleted from the cart."
        AlertService.getInstance().publishMessage('Success',this.alertMsg);
    }else{
        alert("Error occured");
    }
}
  showCart(){
      this._router.navigate(['dashboard/view-cart']);
  }
  
}