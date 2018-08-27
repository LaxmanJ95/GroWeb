"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var core_2 = require('@angular/core');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_basic_baseservice_1 = require('../../common/basic/com.common.basic.baseservice');
var OrderService = (function (_super) {
    __extends(OrderService, _super);
    /* initURL(_configService:ConfigService){
          URL = _configService.getProperty("APIService");
     }*/
    function OrderService(_userProfileService, injector) {
        _super.call(this, injector);
        this._userProfileService = _userProfileService;
        this.GET_CUSTOMER_ORDERS_URL = this._APIURL + "/order/getOrders";
        this.GET_MY_ORDERS_URL = this._APIURL + "/order/getMyOrders";
        this.PLACE_ORDER_URL = this._APIURL + "/order/placeOrder";
        this.GET_ORDER_BYID_URL = this._APIURL + "/order/getOrderById";
        this.CHANGE_ORDER_URL = this._APIURL + "/order/changeOrder";
        this.COPY_OLD_ORDER_URL = this._APIURL + "/order/copyOldOrder";
        this.DOWNLOAD_ORDER_URL = this._APIURL + "/download/xls";
        //this.initURL(this._configService);
        this.userId = _userProfileService.getUserId();
        this._loggingService.logDebug(this.getName(), "APIService" + this._configService.getProperty("APIService"));
        this._loggingService.logInfo(this.getName(), "UserId:" + this.userId);
    }
    OrderService.prototype.getDownloadURL = function () {
        return this.DOWNLOAD_ORDER_URL;
    };
    OrderService.prototype.placeOrder = function (request) {
        request.userId = this.userId;
        return this._http.post(this.PLACE_ORDER_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    OrderService.prototype.retrieveOrderById = function (orderId) {
        return this._http.get(this.GET_ORDER_BYID_URL + "/" + orderId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    OrderService.prototype.retrieveMyOrders = function () {
        return this._http.get(this.GET_MY_ORDERS_URL + "/" + this.userId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    OrderService.prototype.retrieveCustomerOrders = function () {
        return this._http.get(this.GET_CUSTOMER_ORDERS_URL, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    OrderService.prototype.saveOrder = function (order) {
        // request.userId = this.userId;
        return this._http.post(this.CHANGE_ORDER_URL, JSON.stringify(order), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    OrderService.prototype.copyOldOrder = function (orderId) {
        // alert(orderId)
        return this._http.get(this.COPY_OLD_ORDER_URL + "/" + orderId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [com_service_userprofile_1.UserProfileService, core_2.Injector])
    ], OrderService);
    return OrderService;
}(com_common_basic_baseservice_1.BaseService));
exports.OrderService = OrderService;
//# sourceMappingURL=com.ebiz.service.orderservice.js.map