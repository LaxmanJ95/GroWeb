import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { SignUpRequest } from '../signup/model/com.usermgmt.signup.model';
import { LoginRequest } from '../login/model/com.usermgmt.login.model';
import {BaseService} from '../../common/basic/com.common.basic.baseservice';
import {Injector} from '@angular/core';
import {User} from '../model/com.usermgmt.user.model'

@Injectable()
export class UserMgmtService extends BaseService{

    private _loginURL = this._APIURL+ "/usermgmt/login";
    private _registerUserURL=  this._APIURL+ "/usermgmt/registerUser";
    private CHECK_USERNAME_EXISTS=  this._APIURL+ "/usermgmt/usernameExists";
    private ADD_UPDATE_ADDRESS=  this._APIURL+ "/usermgmt/addUpdateAddress";
    private UPDATE_USER_PROFILE = this._APIURL+ "/usermgmt/updateUserProfile";
    private CHANGE_PASSWORD_URL = this._APIURL+ "/usermgmt/changePassword";
    private FORGOT_USERNAME_URL = this._APIURL+ "/usermgmt/forgotUsername";
    private FORGOT_PASSWORD_URL = this._APIURL+ "/usermgmt/forgotPassword";
    private EMAILID_EXISTS_URL = this._APIURL+ "/usermgmt/emailIdExist";
    private ADD_SHIPPING_ADDRESS=  this._APIURL+ "/usermgmt/addShippingAddress";

    constructor(injector:Injector) {
            super(injector);
    }

    login(loginRequest: LoginRequest): Promise<any> {

        // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        // let options = new RequestOptions( {method: 'Post', headers: headers });

        // let body = this.serializeObj(loginRequest);
        return this._http.post(this._loginURL, JSON.stringify(loginRequest), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }

    registerUser(request:User) : Promise<any>{

         return this._http.post(this._registerUserURL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
            
    }
    updateUserProfile(request:any) : Promise<any>{

         return this._http.post(this.UPDATE_USER_PROFILE, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
            
    }    
    changePassword(request:any) : Promise<any>{

         return this._http.post(this.CHANGE_PASSWORD_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
            
    } 
    forgotUsername(request:any) : Promise<any>{
         return this._http.post(this.FORGOT_USERNAME_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());     
    } 
    forgotPassword(request:any) : Promise<any>{
         return this._http.post(this.FORGOT_PASSWORD_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());     
    } 
   checkUserExists(userName:string){
             return this._http.post(this.CHECK_USERNAME_EXISTS, {"userName":userName}, this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    emailIdExists(email: string){
        return this._http.post(this.EMAILID_EXISTS_URL,{"email":email}, this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    addNewAddress(address:any){
             return this._http.post(this.ADD_UPDATE_ADDRESS, {"address":address}, this._httpHeaderOptions)
            .toPromise()
            .then(res => res.json());
    }
    addShippingAddress(address:any){
        return this._http.post(this.ADD_UPDATE_ADDRESS, {"address":address}, this._httpHeaderOptions)
        .toPromise()
        .then(res => res.json());
    }
    
//     private serializeObj(obj) {
//         var result = [];
//         for (var property in obj)
//             result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
    
//         return result.join("&");
//     }
}