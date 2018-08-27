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
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_basic_baseservice_1 = require('../../common/basic/com.common.basic.baseservice');
var CartService = (function (_super) {
    __extends(CartService, _super);
    function CartService(_userProfileService, injector) {
        _super.call(this, injector);
        this._userProfileService = _userProfileService;
        this.ADD_TO_CART_URL = this._APIURL + "/cart/add2Cart";
        this.VIEW_MY_CART_URL = this._APIURL + "/cart/viewMyCart";
        this.UPDATE_QUANTITY_URL = this._APIURL + "/cart/updateQuantity";
        this.GET_CART_COUNT_URL = this._APIURL + "/cart/getCartCount";
        this.UPDATE_UPLOADED_FILES_URL = this._APIURL + "/cart/updateUploadedFiles";
        this.ADD_TO_CART_FROM_OLDORDER_URL = this._APIURL + "/cart/add2CartFromOldOrder";
        this.DELETE_UPLOADED_FILE_URL = this._APIURL + "/cart/deleteUploadedFiles";
        this.initURL(this._configService);
        this.userId = _userProfileService.getUserId();
        this._loggingService.logInfo(this.getName(), "UserId:" + this.userId);
    }
    CartService.prototype.initURL = function (_configService) {
    };
    CartService.prototype.add2Cart = function (request) {
        this._loggingService.logDebug(this.getName(), "add2Cart:" + JSON.stringify(request));
        return this._http.post(this.ADD_TO_CART_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CartService.prototype.updateQuantity = function (request) {
        this._loggingService.logDebug(this.getName(), JSON.stringify(request));
        return this._http.post(this.UPDATE_QUANTITY_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CartService.prototype.updateUploadedFiles = function (request) {
        this._loggingService.logDebug(this.getName(), JSON.stringify(request));
        return this._http.post(this.UPDATE_UPLOADED_FILES_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CartService.prototype.deleteUploadedFiles = function (request) {
        this._loggingService.logDebug(this.getName(), JSON.stringify(request));
        return this._http.post(this.DELETE_UPLOADED_FILE_URL, JSON.stringify(request), this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CartService.prototype.viewMyCart = function () {
        return this._http.get(this.VIEW_MY_CART_URL + "/" + this.userId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CartService.prototype.add2CartFromOldOrder = function (orderId) {
        return this._http.get(this.ADD_TO_CART_FROM_OLDORDER_URL + "/" + orderId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    CartService.prototype.getCartCount = function () {
        return this._http.get(this.GET_CART_COUNT_URL + "/" + this.userId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
        //this.listCartItems(userId).then(res => this.handleResponse(res));
    };
    CartService.prototype.getCartSummaryFromSession = function () {
        return this._sessionStorageService.getObject("myCartTotal");
    };
    CartService.prototype.setCartSummaryToSession = function (cartTotal) {
        this._sessionStorageService.setObject("myCartTotal", cartTotal);
    };
    CartService.prototype.handleResponse = function (res) {
        com_common_sessiondata_1.SessionDataService.getInstance().updateTotalCartItemsCount("" + res.cart.totalQuantity);
        // alert(res.cart.totalQuantity)
    };
    CartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [com_service_userprofile_1.UserProfileService, core_2.Injector])
    ], CartService);
    return CartService;
}(com_common_basic_baseservice_1.BaseService));
exports.CartService = CartService;
//# sourceMappingURL=com.pharmacy.service.cartservice.js.map