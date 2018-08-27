import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {Injector} from '@angular/core';
import {ElementRef,ViewChild} from '@angular/core' /*Import View Child*/
import {  ActivatedRoute } from '@angular/router';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
//----



import {SessionDataService} from '../../common/service/com.common.sessiondata'
import { UserMgmtService } from '../../usermgmt/service/com.service.usermgmt'
import {ProductService} from './../service/com.ebiz.service.productservice';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import {Product} from '../model/com.ebiz.model.product'

@Component({
  moduleId: module.id,
  selector: 'addproduct',
  templateUrl: 'com.ebiz.addeditproduct.html',
  providers: [SessionDataService,ProductService,UserMgmtService,Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class AddEditProduct extends BaseComponent{

  public uploader:FileUploader ;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  private PRES_UPLOAD_URL =  this._APIURL+ "/upload/productImageUploader";
  productId:number = 0;
   isFormValid :boolean= true;

  productForm : FormGroup;

 product: Product = new Product();
  subscription;
  roleId:number;
  userId:number;
  uploadedFiles =[];
  isProductImageAvailable:boolean;
 constructor(private _router: Router,
            injector:Injector,
            private _userProfileService: UserProfileService,
            private _route : ActivatedRoute,
            private _productService : ProductService,
    private _userMgmtService: UserMgmtService,
    private fb: FormBuilder){
      super(injector); 
       // this.loadUserProfile();



      this.productForm = this.fb.group({ 
        _productName: new FormControl('',Validators.required), 
       // _productName: ['',Validators.required],
        _productDescription: ['',Validators.required],
        _productClass:[],
        _subClass:[],
        _specialPrice:[],
        _packing: ['',Validators.required],
         _price: ['',Validators.required],
         _productExpiry: ['',Validators.required]
      });
      this.roleId = this._userProfileService.getUserProfile()['roleId'];
      //this.userId = this._userProfileService.getUserId();
      this.product.userId = this._userProfileService.getUserId();


      this.uploader = new FileUploader({url: this.PRES_UPLOAD_URL});
   
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            this.uploadedFiles.push(response)
            this.product.imageFile= response;
            this.isProductImageAvailable=true;
            
        };
 }

   ngOnInit(){
   // alert(JSON.stringify(this._route.params));
    this.subscription= this._route.params.subscribe(params=>{
         var id=+params["id"];
       //  alert(id)
         if(Number.isInteger(id)){
           this.productId = id
           //this.order = this.getEmptyOrderObj();
          // alert(1)
           this._productService.viewProduct(id).then(res => this.cb_viewProduct(res));
         }else{
          // alert('Error Occurred');
          //this.order = this._sessionStorageService.getObject("placeOrderResponse");
         }
    });
  }
  cb_viewProduct(res){
    if(res.isSuccess){
      this.product = res.product;
  //   alert(this.product.imageFile)
       if(this.product.imageFile=='' || this.product.imageFile==null || this.product.imageFile=='drugrx.png') {
         this.isProductImageAvailable=false;
       }else{
         this.isProductImageAvailable=true;
       }
    //  AlertService.getInstance().publishMessage('Success','Product '+this.product.name +' has been saved successfully!.');
    }else{
       alert('Error Occurred');
    }
  }
 saveProduct(){
  // alert(this.product.active);
   if(this.product.inInventory==0){
       var index = this.product.name.indexOf('(NEW*)');
       if(index<0)
         this.product.name+= "(NEW*)"
   }else{
     this.product.name = this.product.name.replace('(NEW*)',"");
   }
 //  if(this.uploadedFiles.length>0){
  //  this.product.imageFile = this.uploadedFiles[1];
 //   alert(this.product.imageFile);
  // }
  // alert(JSON.stringify(this.product))
   this._productService.post("addProduct",{"product":this.product}).then(res => this.cb_addProduct(res));
 }
cb_addProduct(res){
  if(res.isSuccess){
   // alert(res.id);
    AlertService.getInstance().publishMessage('Success','Product '+this.product.name +' has been added.');
     this._router.navigate(['dashboard/grocery-products']);
  }else{
    alert('Error occured');
  }
}
 changeCheckbox(event){
   var isChecked = event.currentTarget.checked;
   if(isChecked){
     this.product.active=1;
   }else{
      this.product.active=0;
   }
 }
 changeInventoryCheckbox(event){
   if(this.product.specialPrice==0){
     alert('Please enter the price');
   }
  var isChecked = event.currentTarget.checked;
     if(isChecked){
     this.product.inInventory=1;
   }else{
      this.product.inInventory=0;
   }
  // alert(this.product.addedBy)
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
    //  alert(this.uploader.queue.length)
        for (let item of this.uploader.queue) {
            if(!item.isSuccess){
                console.log("Uploading ..."+item._file);
                item.upload()
            }
            
      }
  }
  deleteProductImage(id){
    if(id==0){
      this.product.imageFile='';
      this.isProductImageAvailable=false;
      return;
    }
      var request = {
        id: id
     };
     this._productService.post("deleteProductImage",request).then(res => this.cb_deleteProductImage(res));
  }
  cb_deleteProductImage(res){
    if (res.isSuccess) {
      // alert(res.id);
      AlertService.getInstance().publishMessage('Success', 'Product ' + this.product.name + ' image has been deleted.');
      this.product.imageFile='';
      this.isProductImageAvailable=false;
    } else {
      alert('Error occured');
    }
  }
 }

  

