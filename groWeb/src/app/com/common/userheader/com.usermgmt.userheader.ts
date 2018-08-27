import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { OnInit ,OnDestroy,OnChanges,AfterViewInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
import { CartService } from '../../pharmacy/service/com.pharmacy.service.cartservice';
import {SessionDataService} from '../../common/service/com.common.sessiondata';
import {UserProfileService}  from '../../usermgmt/service/com.service.userprofile'
@Component({
moduleId:module.id,
  selector: 'user-header',
  templateUrl: 'com.sample.header.html',
  providers: [SessionStorageService,CartService,SessionDataService]

})
export class UserHeader{
  subscription: any;
  userName:string='';  
  profileImageUrl;
  roleId:number = 4;
  wishLists;any;
  count:any;
  userId:any;
  isWishEmpty:boolean = false;
  constructor(private _router: Router,
    private _userProfileService : UserProfileService,
    private _cartService:CartService,
    private _sessionStorageService: SessionStorageService) {
        this.roleId = this._sessionStorageService.getObject("roleId")
        this.userId = this._userProfileService.getUserId(),
   // alert(this.roleId)
     this.getLoggedUser();
     this.wishActiveOrNot();
    //  SessionDataService.getInstance().totalCount$.subscribe(value => {
    //    this.count = value
    //  })
     SessionDataService.getInstance().wishList$.subscribe(value=> {
      //alert(total);
      this.count = value
      if(this.count == "0"){
        this.isWishEmpty = false;
      }
      else{
        this.isWishEmpty = true;
      }
      //console.log("Header Total cart items:"+total);
    });
   //  this.getWishList()
    // alert(document.location.hostname);

  }
  
 /* ngOnInit(): void {
   let timer = TimerObservable.create(2, 1000);
    this.subscription = timer.subscribe(t => {
        console.log("YYYY##")
       
    });
    
  }
  ngAfterViewInit() {
    
   // this.setTimeOut2()
  }
  setTimeOut2(){
       setTimeout(() => {
            this.getLoggedUser()
        },100 );
  }
   ngOnDestroy() {
   // this.subscription.unsubscribe();
  }
  */
  
  getLoggedUser(){
    //  alert(1)
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
     //   alert(JSON.stringify(userProfileObj));
        var userName;
        if(userProfileObj){
            userName = userProfileObj["firstName"];
            console.log(" username  : "+userName)
        }
        if(userName!=null){
            this.userName=userName;
        }
        if(userProfileObj && userProfileObj.userExt){
         this.profileImageUrl =userProfileObj.userExt.profileImageUrl;
        }
  }
  logout(){
      this._sessionStorageService.clear();
      this.userName='';
      this._router.navigate([''])
  }
  showUserProfile(){
      this._router.navigate(['dashboard/user-profile']);
  }
  searchProduct(){
    this._router.navigate(['dashboard/grocery-products'])
  }
  myOrders(){
    if(this.roleId > 2)
    this._router.navigate(['dashboard/my-orders'])
    else
    this._router.navigate(['dashboard/customer-orders'])
  }
  payment(){
    this._router.navigate(['dashboard/paymentDetails'])
  }
  customersOrders(){
    this._router.navigate(['dashboard/customer-orders'])
  }
  businessInfo(){
    this._router.navigate(['businessInfo'])
  }
  products(){
    if(this.userId != 0)
    this._router.navigate(['dashboard/grocery-products'])
    else 
    this._router.navigate([''])

  }
  wishActiveOrNot(){
    this._cartService.viewWishList().then(res =>this.cb_wishActive(res));
  }
  cb_wishActive(res){
    this.wishLists = res.wishList;
    this.count = this.wishLists.length
        if(this.wishLists.length != 0){
          this.isWishEmpty = true;
        }
        else
          this.isWishEmpty = false;
  }
  getWishList(){
  
    this._cartService.viewWishList().then(res => this.handleListCartResponse(res));
  }
  handleListCartResponse(res){
    console.log(res.wishList)
    this.wishLists = res.wishList;

    if(this.wishLists.length != 0){
      this.isWishEmpty = true;
      this._router.navigate(['dashboard/view-wishlist'])
    }
    else{
      this.isWishEmpty = false;
    }
  }

}