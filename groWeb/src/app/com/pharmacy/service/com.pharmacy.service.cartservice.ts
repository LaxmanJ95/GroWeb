
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import {Injector} from '@angular/core';


import {Cart} from './../model/com.pharmacy.model.Cart';
import {CartItem} from './../model/com.pharmacy.model.Cart';
import {CartTotal} from './../model/com.pharmacy.model.cart';
import {ConfigService} from './../../common/service/config/com.common.service.config.configmanager';
import {LoggingService} from './../../common/service/logging/com.common.service.logging';
import {HttpUtil} from './../../common/util/com.common.util.httputil'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import { TimerObservable } from 'rxjs/observable/TimerObservable';

@Injectable()
export class CartService extends BaseService{


    private ADD_TO_CART_URL=  this._APIURL+ "/cart/add2Cart";
    private ADD_2_CART_BY_ID= this._APIURL+ "/cart/add2CartById"
    private VIEW_MY_CART_URL=  this._APIURL+ "/cart/viewMyCart";
    private UPDATE_QUANTITY_URL=  this._APIURL+ "/cart/updateQuantity";
    private GET_CART_COUNT_URL=  this._APIURL+ "/cart/getCartCount";
    private UPDATE_UPLOADED_FILES_URL = this._APIURL+ "/cart/updateUploadedFiles";
    private ADD_TO_CART_FROM_OLDORDER_URL = this._APIURL+ "/cart/add2CartFromOldOrder";
    private DELETE_UPLOADED_FILE_URL=  this._APIURL+ "/cart/deleteUploadedFiles";
    private ADD_TO_WISH_LIST = this._APIURL+ "/wishlist/add2WishList";
    private VIEW_MY_WISHLIST_URL = this._APIURL+"/wishlist/getWishList"
    private SAVE_TO_WISHLIST_URL = this._APIURL+"/wishlist/copyFromCart"


    userId :any;

    initURL(_configService:ConfigService){

    }

    constructor(
        private _userProfileService: UserProfileService,
        injector:Injector) {

          super(injector);
          this.initURL(this._configService);
          this.userId = _userProfileService.getUserId();
          this._loggingService.logInfo( this.getName(), "UserId:"+this.userId);

          
    }


    add2Cart(request: any): Promise<any> {
        this._loggingService.logDebug(this.getName() , "add2Cart:" +JSON.stringify(request));
        return this._http.post(this.ADD_TO_CART_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    add2CartById(request: any): Promise<any> {
        return this._http.post(this.ADD_2_CART_BY_ID, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    updateQuantity(request: any): Promise<any> {
        this._loggingService.logDebug(this.getName(), JSON.stringify(request));
        return this._http.post(this.UPDATE_QUANTITY_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    updateUploadedFiles(request: any): Promise<any> {
        this._loggingService.logDebug(this.getName(), JSON.stringify(request));
        return this._http.post(this.UPDATE_UPLOADED_FILES_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    deleteUploadedFiles(request: any): Promise<any> {
        this._loggingService.logDebug(this.getName(), JSON.stringify(request));
        return this._http.post(this.DELETE_UPLOADED_FILE_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    viewMyCart(): Promise<any> {

        return this._http.get(this.VIEW_MY_CART_URL+"/"+this.userId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    add2CartFromOldOrder(orderId:any): Promise<any> {

        return this._http.get(this.ADD_TO_CART_FROM_OLDORDER_URL+"/"+orderId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    getCartCount(){
        return this._http.get(this.GET_CART_COUNT_URL+"/"+this.userId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());

        //this.listCartItems(userId).then(res => this.handleResponse(res));
    }
    getCartSummaryFromSession(){
            return this._sessionStorageService.getObject("myCartTotal");
    }
    setCartSummaryToSession(cartTotal:CartTotal){
            this._sessionStorageService.setObject("myCartTotal",cartTotal);
    }
    handleResponse(res){
      SessionDataService.getInstance().updateTotalCartItemsCount(""+res.cart.totalQuantity);
     // alert(res.cart.totalQuantity)
    }
    add2WishList(request : any) : Promise<any>{
        this._loggingService.logDebug(this.getName() , "add2Wish:" +JSON.stringify(request));
        return this._http.post(this.ADD_TO_WISH_LIST, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    viewWishList() : Promise<any>{
        
        return this._http.get(this.VIEW_MY_WISHLIST_URL+"/"+this.userId ,  this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    saveWishList(request:any): Promise<any> {
        
        return this._http.post(this.SAVE_TO_WISHLIST_URL ,JSON.stringify(request),  this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
     }

}