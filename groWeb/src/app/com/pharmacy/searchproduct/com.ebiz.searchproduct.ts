import { Component,ViewChild,ElementRef,Injector,Directive } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import {ProductService} from './../service/com.ebiz.service.productservice';
import {Products} from './../model/com.ebiz.model.product';
import {CartService} from './../service/com.pharmacy.service.cartservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import{WishList} from './../model/com.ebiz.model.wishlist'
import {CartTotal} from './../model/com.pharmacy.model.cart';
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {AlertService} from '../../common/service/alert/com.common.service.alertservice'
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import { resetFakeAsyncZone } from '@angular/core/testing';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {UserHeader} from '../../common/userheader/com.usermgmt.userheader'
@Component({
  moduleId: module.id,
  selector: 'search-products',
  templateUrl: 'com.ebiz.searchproduct.html',
  styleUrls :['com.ebiz.searchproduct.css'],
  providers: [ProductService,CartService,RestApiService,SessionStorageService],
 

})
export class SearchProduct extends BaseComponent{
  alertMsg:string='';
  products :Products;
  productList:any;
  categories:any;
  subCategories:any;
  isModalLogin:boolean =false;
  cartTotal: CartTotal;
  totalQuantity: string ='0';
  totalPrice: string ='0';
  userId: number = 0;
  roleId:number;
  currentPage:number= 0;
  lastPage:number;
  count:any;
  categoryOnSelect :string ="ALL"
  @ViewChild('searchBox') searchBox:ElementRef;
  private quantity_mask = [/[1-9]/, /\d/];
 
  

  constructor(private _router: Router,
  private el: ElementRef,
              private _productService : ProductService,
              private _userProfileService: UserProfileService,
              private _restService:RestApiService,
              private _cartService : CartService,
               injector:Injector) {
                super(injector); 
              this.cartTotal = new CartTotal();
              this.getCategory();
              this.userId = this._userProfileService.getUserId()
              console.log(this._sessionStorageService.getObject("roleId"))
              var role = this._sessionStorageService.getObject("roleId");
              if(role != null ){
                _cartService.getCartCount().then(res => this.cb_getCartCount(res));
                this.roleId = role;
              } 
              else
                  this.roleId = 5;
              var searchRequest = {
                  userId: this._userProfileService.getUserId(),
                  roleId:this.roleId
              };

          
         _productService.searchProduct(searchRequest).then(res => this.cb_searchProduct(res));
         this.getWishList();
          
          
  }
  
  search(){
    //this._productService.searchProduct("").then(res => this.cp_searchProduct(res));
  }  
  ngOnInit() {


         var keyups = Observable.fromEvent(this.searchBox.nativeElement,"keyup")
                                 .map(event=>event['target'].value)
                              // .filter(text=> text.length>=3)
                               .debounceTime(400)
                               .distinctUntilChanged()
                               .map(searchTerm=> {
                                  console.log("searchTerm.."+searchTerm);
                                 // alert(searchTerm);
                                       var searchRequest = {
                                        userId: this._userProfileService.getUserId(),
                                        searchKey: searchTerm,
                                        roleId:this.roleId
                                      };

                                  this._productService.searchProduct(searchRequest).then(res => this.cb_searchProduct(res));
                                });
        keyups.subscribe(data=> console.log("keyup"+data));
      //  this.getWishList()
  }
  all(){
    this.categoryOnSelect = "ALL"
    var searchRequest = {
      userId: this._userProfileService.getUserId(),
      roleId:this.roleId
  };
 this._productService.searchProduct(searchRequest).then(res => this.cb_searchProduct(res));
  }
  cb_searchProduct(res){
    this.products = res.products;
    this.productList = res.products;
    this.getWishList();
    this.getCartList();
    this.currentPage = 1;
    var count = res.count;
    console.log("count : "+count)
     var i = count/18;
     console.log("value of  i "+i)
           this.lastPage = Math.floor(i);
       if(i - this.lastPage == 0)
           console.log("this.lastpage :"+this.lastPage)
       else
          this.lastPage+=1;
          console.log("lastpage : "+this.lastPage)
   // console.log(JSON.stringify(this.drugs));
  }
  getBackground(value){
    if(value == 0){
    var styles = {
      'background-color':'#d8d3d3'
    }
    return styles;
  }
  }
  cb_getCategory(res){
    this.categories = res.categories;
    this.getSubCategory();
  }
  getCategory(){
    this._restService.get('/product/getCategories').then(res=>this.cb_getCategory(res))
  }
  cb_getSubCategory(res){
    this.subCategories = res.categories;
  }
  getSubCategory(){
    this._restService.get('/product/getSubCategories').then(res=>this.cb_getSubCategory(res))
  }
  category(value){
    this.categoryOnSelect = value
    var request={
      category:value,
      subCategory:""
    }
    this._productService.searchCategory(request).then(res=>this.cb_searchProduct(res))
  }
  subCategory(value){
    this.categoryOnSelect = value
    var request={
      category:"",
      subCategory:value
    }
    this._productService.searchCategory(request).then(res=>this.cb_searchProduct(res))
  }
  getCartList(){
    if(this.userId != 0)
    this._cartService.viewMyCart().then(res => this.cb_getCartList(res))
  }
  cb_getCartList(res){
    if(res.isSuccess){
      for(let x of this.productList){
         for(let y of res.cart){
             if(x.id == y.productId){
               x.inCart = true;
             }
         }
      }
    }
  }
  getWishList(){
    if(this.userId != 0)
    this._cartService.viewWishList().then(res=>this.cb_getWishList(res))
  }
  cb_getWishList(res){
   if(res.isSuccess){
     for(let x of this.productList){
        for(let y of res.wishList){
            if(x.id == y.productId){
              x.isWished = true;
            }
        }
     }
  }
  this.count = res.wishList.length
  this.mapWishListResponse();
  }
  mapWishListResponse(){
      SessionDataService.getInstance().updateWishListActive(""+this.count)
    }
  viewItem(id:string){

     this._router.navigate(['dashboard/grocery-viewproduct/'+id]);

  }
  add2wish(index){
    if(this.userId != 0){
      var wishLists: WishList[] = [];
      var i=0;
      let product = this.products[index];
       var wishList = new WishList();
       wishList.productId = product.id;
       wishList.quantity=product.quantity;
       wishList.price=product.costPrice;
       wishList.userId=this.userId;
       wishLists.push(wishList);
       this.products[index].isWished=true;   
    if(this.alertMsg.length>0){
      this.alertMsg = this.alertMsg.substr(0,this.alertMsg.length-1);
      this.alertMsg +=" added to the wish list.";
     }
     this._cartService.add2WishList({"wishList":wishLists}).then(res => this.cb_add2Wish(res));
    }
    else{
     this.isModalLogin = true;
    }
  }
  cb_add2Wish(res){
    if(res.isSuccess){
      console.log("added");
     this.getWishList();
    // var  userheader = new UserHeader(this._router,this._cartService,this._sessionStorageService);
    //  userheader.getWishList();
     }
  }
  addItem2Cart(index){
   // alert(this.searchBox.nativeElement);
   // alert(index)
   if(this.userId != 0){
    var cartItems: CartItem[] = [];
    var i=0;

    let product = this.products[index];

          var cartItem = new CartItem();
          //cartItem.cartId= 4;
          cartItem.productId = product.id; 
          cartItem.quantity=product.quantity;
          cartItem.price=product.costPrice;
          cartItem.userId=this.userId;
          cartItems.push(cartItem);
          this.alertMsg = this.alertMsg + product.name + ":"+product.quantity +",";
      this.products[index].inCart=true;    
     // this.products[index].checkedFlag=false; 

    if(this.alertMsg.length>0){
     this.alertMsg = this.alertMsg.substr(0,this.alertMsg.length-1);
     this.alertMsg +=" added to the cart.";
    }
    //this.cart.cartItems= cartItems;
   // console.log("CART ITEMS:"+JSON.stringify(cartItems));
    this._cartService.add2Cart({"cart":cartItems}).then(res => this.cb_add2Cart(res,false));
  }
  else
    this.isModalLogin = true;
  }
  add2Cart(){
    var cartItems: CartItem[] = [];
    var i=0;
    var myProducts: any;
    myProducts = this.products;
    for (let product of myProducts) {
      if(product.checkedFlag){
          var cartItem = new CartItem();
          //cartItem.cartId= 4;
          cartItem.productId = product.id; 
          cartItem.quantity=product.quantity;
          cartItem.price=product.specialPrice;
          cartItem.userId=this.userId;
          cartItems.push(cartItem);
          this.alertMsg = this.alertMsg + product.name + ":"+product.quantity +",";
      }
    }
    if(this.alertMsg.length>0){
     this.alertMsg = this.alertMsg.substr(0,this.alertMsg.length-1);
     this.alertMsg +=" added to the cart.";
    }
    //this.cart.cartItems= cartItems;
   // console.log("CART ITEMS:"+JSON.stringify(cartItems));
    this._cartService.add2Cart({"cart":cartItems}).then(res => this.cb_add2Cart(res,true));
  }
  cb_getCartCount(res){
    if(res.isSuccess){
      this.mapCartResponse(res);
    }else{
      alert("Error cart count")
    }
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
      this._cartService.setCartSummaryToSession(this.cartTotal);
      SessionDataService.getInstance().updateTotalCartItemsCount(""+res.cartTotal.totalQuantity);
      AlertService.getInstance().publishMessage('Success',this.alertMsg);

      //alert(this.alertMsg);
  }


  showCart(){
      this._router.navigate(['dashboard/view-cart']);
  }
  uploadPrescription(){
    this._router.navigate(['dashboard/upload-prescription']);
  }
  showAddProductForm(){
    this._router.navigate(['dashboard/add-product']);
  }
  editProduct(id){
    this._router.navigate(['dashboard/edit-product/'+id]);
  }
  cb_getDataPagination(res){
    this.products = res.products;
  }
  pagesearch(event){
    // alert(this.currentPage)
    // this.currentPage = null;
    this._restService.getById('/product/productPagination',event).then(res=>this.cb_getDataPagination(res));
     console.log("previous value "+this.currentPage)
   }
   start(){
    
        this.currentPage = 1;
        this._restService.getById('/product/productPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
        console.log("previous value "+this.currentPage)
      
   }
   previous(){
    console.log("previous in current "+this.currentPage)
    console.log("previous in last "+this.lastPage)
      if(this.currentPage > 1){
       this.currentPage -= 1;
       this._restService.getById('/product/productPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
       console.log("previous value "+this.currentPage)
     }
   }
   next(){

     if(this.lastPage > this.currentPage){
     //  alert(this.currentPage)
     
        var page = +this.currentPage
        page+=1;
        this.currentPage = page
        console.log("page befoe send  "+page)

      this._restService.getById('/product/productPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
        
   }
  }
   end(){
     this.currentPage = this.lastPage
     this._restService.getById('/product/productPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
  
   }
   cancelModalLogin(){
     this.isModalLogin = false;
   }
   moveToLogin(){
    this._router.navigate(['login']);
   }
}