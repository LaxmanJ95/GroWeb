import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';

@Injectable()
export class FileService extends BaseService{

    private GET_FILES_BY_CART_ID_URL=  this._APIURL+ "/upload/getPrescriptionsByCartId";
    private GET_FILES_BY_ORDER_ID_URL=  this._APIURL+ "/upload/getPrescriptionsByOrderId";
    
    constructor(injector:Injector) {
            super(injector);
    }

    getFilesByCartId(id:any): Promise<any> {

        return this._http.get(this.GET_FILES_BY_CART_ID_URL+"/"+id, this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }

    getFilesByOrderIdAndCartId(orderId:any,cartId:any): Promise<any> {

        return this._http.get(this.GET_FILES_BY_ORDER_ID_URL+"/"+orderId+"/"+cartId ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }

}