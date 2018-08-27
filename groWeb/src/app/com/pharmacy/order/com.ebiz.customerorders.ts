import { Component,ViewChild,ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router,Route	,RouterLink, RouterModule } from '@angular/router';
import {  ActivatedRoute } from '@angular/router';
import  {FormControl, Validators,FormGroup,FormBuilder}  from '@angular/forms'; 
import { URLSearchParams ,RequestOptions, Http } from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {CartService} from './../service/com.pharmacy.service.cartservice';
import {OrderService} from './../service/com.ebiz.service.orderservice';
import {Cart} from './../model/com.pharmacy.model.cart';
import {CartItem} from './../model/com.pharmacy.model.cart';
import {OrderRequest} from './../model/com.ebiz.model.order';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {Address} from '../../common/model/com.common.model.address';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import { RestApiService } from '../../common/service/restapi/com.common.service.restapiservice';
import {ProductSearch} from './../model/com.ebiz.model.product'

@Component({
  moduleId: module.id,
  selector: 'customer-orders',
  templateUrl: 'com.ebiz.customerorders.html',
  styleUrls:['com.ebiz.customerorders.css'],
  providers:[OrderService,RestApiService]
})
export class CustomerOrders extends FormComponent{
  orders:any;
  orderCount:any;
  currentPage:number=0;
  lastPage:number;
  isOpen:boolean ;false;
  downloadFrom:any;
  search = new ProductSearch();
  @ViewChild('searchItems') searchItems:ElementRef;
  @ViewChild('searchId') searchId:ElementRef;
  @ViewChild('searchName') searchName:ElementRef;
  @ViewChild('searchPrice') searchPrice:ElementRef;
  // @ViewChild('searchFromDate') searchFromDate:ElementRef;
  // @ViewChild('searchToDate') searchToDate:ElementRef;
  @ViewChild('searchStatus') searchStatus:ElementRef;

  settings = {
    bigBanner: false,
    timePicker: true,
    format: 'MM/dd/yyyy',
    defaultOpen: false
}
  constructor(injector:Injector,private http: Http,
            private _orderService : OrderService,
           private _restService : RestApiService
            ) {
              super(injector);  
              //this.order = new OrderSummary
            this.getOrders();
              //this.orders = this._sessionStorageService.getObject("placeOrderResponse");
  }
  ngOnInit() {  
    
     var id = Observable.fromEvent(this.searchId.nativeElement,"keyup")
                 .map(event =>event['target'].value).debounceTime(400).distinctUntilChanged()
                 .map(searchTerm=>{console.log("searchName.."+searchTerm)
                 this.search.id = searchTerm
               var searchRequest = {
                       searchDetail:this.search
                                       };
       this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));});       
                  id.subscribe(data=> console.log("keyup"+data)); 
                  
    var items = Observable.fromEvent(this.searchItems.nativeElement,"keyup")
                  .map(event =>event['target'].value).debounceTime(400).distinctUntilChanged()
                  .map(searchTerm=>{console.log("searchName.."+searchTerm)
                  this.search.totalItems = searchTerm
                var searchRequest = {
                        searchDetail:this.search
                                        };
        this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));});       
           items.subscribe(data=> console.log("keyup"+data));
    var price = Observable.fromEvent(this.searchPrice.nativeElement,"keyup")
           .map(event =>event['target'].value).debounceTime(400).distinctUntilChanged()
           .map(searchTerm=>{console.log("searchName.."+searchTerm)
           this.search.totalPrice = searchTerm
         var searchRequest = {
                 searchDetail:this.search
                                 };
 this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));});       
    price.subscribe(data=> console.log("keyup"+data)); 

    var status = Observable.fromEvent(this.searchStatus.nativeElement,"keyup")
          .map(event =>event['target'].value).debounceTime(400).distinctUntilChanged()
          .map(searchTerm=>{console.log("searchName.."+searchTerm)
          this.search.status = searchTerm
          var searchRequest = {
               searchDetail:this.search
                          };
    this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));});       
    status.subscribe(data=> console.log("keyup"+data)); 

    var name = Observable.fromEvent(this.searchName.nativeElement,"keyup")
          .map(event =>event['target'].value).debounceTime(400).distinctUntilChanged()
          .map(searchTerm=>{console.log("searchName.."+searchTerm)
        this.search.name = searchTerm
          var searchRequest = {
                searchDetail:this.search
                      };
        this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));});       
        name.subscribe(data=> console.log("keyup"+data)); 

    // var fromDate = Observable.fromEvent(this.searchFromDate.nativeElement,"keyup")
    //     .map(event =>event['target'].value).debounceTime(400).distinctUntilChanged()
    //     .map(searchTerm=>{console.log("searchName.."+searchTerm)
    //   this.search.fromDate = searchTerm
    //     var searchRequest = {
    //           searchDetail:this.search
    //                 };
    //   this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));});       
    //   fromDate.subscribe(data=> console.log("keyup"+data)); 

}
  getOrders(){
   this._orderService.retrieveCustomerOrders().then(res => this.handleResponse(res));
  }
 
  handleResponse(res){
    console.log("search:"+JSON.stringify(this.search));
      console.log("Customer orders:"+JSON.stringify(res));
     // this.searchStatus.nativeElement ='';
    //  this.search.status=0
      this.orders =res.orders;
      this.orderCount = res.count;
      // var obj=[];
      // obj = this.orders;
      // this.downloadFrom = obj[0].id
  
      var count = this.orderCount;
      this.currentPage = 1;
     
      console.log("count : "+count)
       var i = count/10;
       console.log("value of  i "+i)
             this.lastPage = Math.floor(i);
         if(i - this.lastPage == 0)
             console.log("this.lastpage :"+this.lastPage)
         else
            this.lastPage+=1;
            console.log("lastpage : "+this.lastPage)
  }
  searchResponse(res){
    this.orders = res.orders
  }
  viewMyOrder(orderId){
     // alert(orderId);
      this._router.navigate(['dashboard/order-summary/'+orderId]);
  }
  editOrder(orderId){
     // alert(orderId);
      this._router.navigate(['dashboard/edit-order/'+orderId]);
  }
  downloadXls(){
    var searchRequest = {
      searchDetail:this.search
            };          
         this._orderService.getDownloadURL(this.search.id,this.search.name,this.search.status,this.search.totalPrice,
            this.search.totalItems,this.search.fromDate,this.search.toDate);    
         //this._orderService.getDownload(searchRequest);
  }
  locationUrl(res){
    window.location.href = res.url
  }
  showContent(tip) {
    
    if(tip == true){
    this.isOpen = false;
  }
  else
    this.isOpen = true
  }
  print(){
    window.print();
  }
  dateFrom(date){
    alert(date)
    this.search.fromDate = date
    var searchRequest = {
      searchDetail:this.search
            };
            console.log(this.search)
this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));
  }
  dateTo(date){
    this.search.toDate = date;
    var searchRequest = {
      searchDetail:this.search
            };
            console.log(this.search)
this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));
  }
  onChange(value){
  //  alert(value)
    this.search.status = value;
    var searchRequest = {
      searchDetail:this.search
            };
            console.log(this.search)
this._orderService.searchOrder(searchRequest).then(res=> this.handleResponse(res));
  }
  refresh(){
    this.search.id = "";
    this.searchId.nativeElement.value="";
    this.search.name ="";
    this.searchName.nativeElement.value="";
    this.searchStatus.nativeElement ='';
    this.search.status=0
    this.search.totalItems="";
    this.searchItems.nativeElement.value="";
    this.search.totalPrice="";
    this.searchPrice.nativeElement.value="";
    this.search.fromDate = "";
     this.search.toDate="";
    this.getOrders()
  }
  cb_getDataPagination(res){
    this.orders = res.orders;
    // var obj=[];
    // obj = this.orders;
    // this.downloadFrom = obj[0].id
  }
  pagesearch(event){
    // alert(this.currentPage)
    // this.currentPage = null;
    this._restService.getById('/order/getOrderPagination',event).then(res=>this.cb_getDataPagination(res));
     console.log("previous value "+this.currentPage)
   }
   start(){
    
        this.currentPage = 1;
        this._restService.getById('/order/getOrderPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
        console.log("previous value "+this.currentPage)
      
   }
   previous(){
    console.log("previous in current "+this.currentPage)
    console.log("previous in last "+this.lastPage)
      if(this.currentPage > 1){
       this.currentPage -= 1;
       this._restService.getById('/order/getOrderPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
       console.log("previous value "+this.currentPage)
     }
   }
   next(){

     if(this.lastPage > this.currentPage){
    
        var page = +this.currentPage
        page+=1;
        this.currentPage = page
        console.log("page befoe send  "+page)

      this._restService.getById('/order/getOrderPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
        
   }
  }
   end(){
     this.currentPage = this.lastPage
     this._restService.getById('/order/getOrderPagination',this.currentPage).then(res=>this.cb_getDataPagination(res));
  
   }
}