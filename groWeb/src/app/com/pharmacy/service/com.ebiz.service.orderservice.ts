
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable, Inject,ViewChild,ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import {Injector} from '@angular/core';


import {Cart} from './../model/com.pharmacy.model.Cart';
import {CartItem} from './../model/com.pharmacy.model.Cart';
import {ConfigService} from './../../common/service/config/com.common.service.config.configmanager';
import {LoggingService} from './../../common/service/logging/com.common.service.logging';
import {HttpUtil} from './../../common/util/com.common.util.httputil'
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import {Observable} from 'rxjs/Observable';
import { URLSearchParams , Http } from '@angular/http';
@Injectable()
export class OrderService extends BaseService{
    private GET_CUSTOMER_ORDERS_URL=  this._APIURL+ "/order/getOrders";
    private GET_MY_ORDERS_URL=  this._APIURL+ "/order/getMyOrders";
    private PLACE_ORDER_URL =  this._APIURL+ "/order/placeOrder";
    private GET_ORDER_BYID_URL = this._APIURL + "/order/getOrderById";
    private CHANGE_ORDER_URL = this._APIURL +"/order/changeOrder";
    private COPY_OLD_ORDER_URL = this._APIURL +"/order/copyOldOrder";
    private DOWNLOAD_ORDER_URL = this._APIURL+"/download/xls";
    private MYORDERS_PAGINATION_URL = this._APIURL+ "/order/getMyOdersPagination"
    private PAY_BY_CREDIT_URL=this._APIURL+"/order/payByCredit"
    private GET_ORDER_CALCULATION = this._APIURL+"/order/orderCalculation";
    private SEARCH_ORDER_URL = this._APIURL+"/order/searchOrders";
    private DOWNLOAD_URL = this._APIURL + "/order/getXls";
    private CANCEL_ORDER_URL = this._APIURL+ "/order/cancelOrder"
    userId :any;

    constructor(
        private _userProfileService: UserProfileService,
        injector:Injector) {

          super(injector);
          //this.initURL(this._configService);
          this.userId = _userProfileService.getUserId();
       //   this._loggingService.logDebug( this.getName(), "APIService"+this._configService.getProperty("APIService"));
          this._loggingService.logInfo( this.getName(), "UserId:"+this.userId);

          
    }
    getDownload(request :any){
        let headers = new Headers();
       return this._http.post(this.DOWNLOAD_URL ,JSON.stringify(request), this._httpHeaderOptions).map(res => new Blob([res],{ type: 'application/vnd.ms-excel' }));
    }
   
    getDownloadURL(id,name,status,totalPrice,totalItems,fromDate,toDate) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id',id);
        params.set('name',name);
        params.set('status',status);
        params.set('totalPrice',totalPrice);
        params.set('totalItems',totalItems);
        params.set('fromDate',fromDate);
        params.set('toDate',toDate);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;
        return this._http.get(this.DOWNLOAD_ORDER_URL, requestOptions)
        .subscribe(data => this.downloadFile(data))
    
    }
    downloadFile(data){
        var blob = new Blob([data], { type: 'text/xls' });
        var url= window.URL.createObjectURL(blob);
        window.open(data.url);
    }
    placeOrder(request : any){
        request.userId = this.userId;
        return this._http.post(this.PLACE_ORDER_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    retrieveOrderById(orderId){
        return this._http.get(this.GET_ORDER_BYID_URL+"/"+orderId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    retrieveMyOrders(){
        return this._http.get(this.GET_MY_ORDERS_URL+"/"+this.userId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    retrieveCustomerOrders(){
        return this._http.get(this.GET_CUSTOMER_ORDERS_URL ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    saveOrder(order:any){
       // request.userId = this.userId;
        return this._http.post(this.CHANGE_ORDER_URL, JSON.stringify(order), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    copyOldOrder(orderId:number){
       // alert(orderId)
        return this._http.get(this.COPY_OLD_ORDER_URL+"/"+orderId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    getMyOrderPagination(request : any){
        return this._http.post(this.MYORDERS_PAGINATION_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    payByCredit(request: any){
        return this._http.post(this.PAY_BY_CREDIT_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    getOrderCalculation(request:any){
        return this._http.post(this.GET_ORDER_CALCULATION, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    searchOrder(request:any){
        return this._http.post(this.SEARCH_ORDER_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    cancelOrder(request:any){
        return this._http.post(this.CANCEL_ORDER_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
}