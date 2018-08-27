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
export class ProductService extends BaseService{

    private SEARCH_PRODUCT_URL=  this._APIURL+ "/product/searchProduct";
    private VIEW_PRODUCT_URL=  this._APIURL+ "/product/getProduct";
    private PRODUCT_URL=  this._APIURL+ "/product/";
    private SEARCH_BY_CATEGORY_URL = this._APIURL+ "/product/searchCategory";
    private SEARCH_BY_SUBCATEGORY_URL = this._APIURL+ "/product/searchSubCategory";

    constructor(injector:Injector) {
            super(injector);
    }

    searchProduct(request:any): Promise<any> {

        return this._http.post(this.SEARCH_PRODUCT_URL,JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }

    viewProduct(id: number): Promise<any> {

        return this._http.get(this.VIEW_PRODUCT_URL+"/"+id ,  this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    post(operation:string,request:any){
       // request.userId = this.userId;
        return this._http.post(this.PRODUCT_URL+operation, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    searchCategory(request:any){
        return this._http.post(this.SEARCH_BY_CATEGORY_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    searchSubCategory(request:any){
        return this._http.post(this.SEARCH_BY_SUBCATEGORY_URL, JSON.stringify(request), this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }

}