import { Component,Injector } from '@angular/core';

import {BaseComponent} from '../../common/basic/com.common.basic.basecomponent';
import {RestApiService} from '../../common/service/restapi/com.common.service.restapiservice';
import {ContactInfo} from '../model/com.usermgmt.user.model'
import { CartService } from '../../pharmacy/service/com.pharmacy.service.cartservice';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import {SessionDataService} from '../../common/service/com.common.sessiondata'
import {CartTotal} from '../../pharmacy/model/com.pharmacy.model.cart';
@Component({
    selector: 'business-info',
    templateUrl:'com.usermgmt.businessInfo.html',
    styleUrls:['com.usermgmt.businessInfo.css'],
    providers:[RestApiService,CartService]
})
export class BusinessInfoComponent extends BaseComponent{

    businessInfo = new ContactInfo();
    lat: number = 37.747615;
    lng: number = -121.893870
    cartTotal:any;
    userId:number = 0;

    constructor(injector:Injector,private _cartService:CartService,
        private _userProfileService :UserProfileService,
            private _restApiService : RestApiService){
    super(injector)
                this._restApiService.get('/address/getInfo').then(res=>this.loadInfo(res))
                this.cartTotal = new CartTotal();      
                this.userId = this._userProfileService.getUserId()        
                _cartService.viewMyCart().then(res => this.handleListCartResponse(res));
                this.mapCart();
    }

    loadInfo(res){
       
        this.businessInfo = res.businessInfo;
        console.log( this.businessInfo)
    }
    mapCart(){
        if(this.userId != 0)
        this._cartService.viewMyCart().then(res => this.handleListCartResponse(res));
    }
    handleListCartResponse(res){
        this.cartTotal = res.cartTotal;
        this._loggingService.logDebug(this.getName(), JSON.stringify(res));
        this._cartService.setCartSummaryToSession(this.cartTotal);
        this.mapCartResponse()
    }
    mapCartResponse(){
        SessionDataService.getInstance().updateTotalCartItemsCount(""+this.cartTotal.totalQuantity);
    }
}