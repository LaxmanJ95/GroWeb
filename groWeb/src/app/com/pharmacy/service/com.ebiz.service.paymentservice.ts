import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {SearchRequest} from './../model/com.model.searchrequest'
import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';

@Injectable()
export class PaymentService extends BaseService{

    private PAYMENT_URL=  this._APIURL+ "/payment/";
    private PAYMENT_PAGINATION_URL = this._APIURL+ "/payment/paymentPagination";
    
    constructor(injector:Injector) {
            super(injector);
    }

    get(operation:string,userId:number): Promise<any> {
          //  alert(userId)
        return this._http.get(this.PAYMENT_URL+operation+"/"+userId, this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }

    post(operation:string, request:any): Promise<any> {
           // alert(operation)
            return this._http.post(this.PAYMENT_URL+ operation, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    getPaymentPagination(request : any){
        return this._http.post(this.PAYMENT_PAGINATION_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }


}