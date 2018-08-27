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
var core_2 = require('@angular/core');
var core_3 = require('@angular/core'); /*Import View Child*/
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_ebiz_service_orderservice_1 = require('./../service/com.ebiz.service.orderservice');
var com_ebiz_model_order_1 = require('./../model/com.ebiz.model.order');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_service_usermgmt_1 = require('../../usermgmt/service/com.service.usermgmt');
var com_common_model_address_1 = require('../../common/model/com.common.model.address');
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var CheckoutCart = (function (_super) {
    __extends(CheckoutCart, _super);
    function CheckoutCart(_userProfileService, _userMgmtService, injector, _orderService, _cartService) {
        _super.call(this, injector);
        this._userProfileService = _userProfileService;
        this._userMgmtService = _userMgmtService;
        this._orderService = _orderService;
        this._cartService = _cartService;
        this.cartTotal = _cartService.getCartSummaryFromSession();
        this.profileAddress = _userProfileService.getAddress();
        this.shippingAddress = _userProfileService.getAddress();
        if (!this.shippingAddress) {
            //alert(this.shippingAddress)
            this.shippingAddress = new com_common_model_address_1.Address();
        }
        this.email = _userProfileService.getUserProfileValue('email');
        this.primaryPhone = _userProfileService.getUserProfileValue('phoneNumber');
    }
    CheckoutCart.prototype.placeOrder = function () {
        var _this = this;
        if (this.shippingAddress.id == null) {
            alert("Please provide shipping address");
            return;
        }
        var orderRequest = new com_ebiz_model_order_1.OrderRequest();
        if (this.shippingAddress.id != null) {
            orderRequest.billingAddressId = this.shippingAddress.id;
            orderRequest.shippingAddressId = this.shippingAddress.id;
        }
        else {
        }
        orderRequest.paymentMethod = this.payMethod;
        this._orderService.placeOrder(orderRequest).then(function (res) { return _this.cb_placeOrder(res); });
    };
    CheckoutCart.prototype.cb_placeOrder = function (res) {
        if (res.isSuccess) {
            this._loggingService.logDebug(this.getName(), JSON.stringify(res));
            this._sessionStorageService.setObject("placeOrderResponse", res.order);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'Order place sucessfully! Order#:' + res.order.id);
            com_common_sessiondata_1.SessionDataService.getInstance().updateTotalCartItemsCount("0");
            this._router.navigate(['dashboard/order-summary']);
        }
        else {
            alert("Error in placing order");
        }
    };
    CheckoutCart.prototype.addNewAddress = function () {
        var _this = this;
        //  alert(this.shippingAddress);
        this.shippingAddress.addressType = 1;
        this.shippingAddress.userId = this._userProfileService.getUserId();
        this._loggingService.logDebug(this.getName(), JSON.stringify(this.shippingAddress));
        this._userMgmtService.addNewAddress(this.shippingAddress).then(function (res) { return _this.cb_addNewAddress(res); });
    };
    CheckoutCart.prototype.cb_addNewAddress = function (res) {
        if (res.isSuccess) {
            this.shippingAddress.id = res.id;
            // this.profileAddress = this.shippingAddress;_userProfileService
            this._userProfileService.setUserProfileValue('address', this.shippingAddress);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'Address updated!:' + this.shippingAddress.street + "..");
            //  alert(this.demo);
            this.demo.nativeElement.click();
        }
    };
    __decorate([
        core_3.ViewChild('addAddressButton'), 
        __metadata('design:type', core_3.ElementRef)
    ], CheckoutCart.prototype, "demo", void 0);
    CheckoutCart = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'checkout-cart',
            templateUrl: 'com.ebiz.checkoutcart.html',
            providers: [com_pharmacy_service_cartservice_1.CartService, com_common_service_alertservice_1.AlertService, com_ebiz_service_orderservice_1.OrderService, com_service_usermgmt_1.UserMgmtService]
        }), 
        __metadata('design:paramtypes', [com_service_userprofile_1.UserProfileService, com_service_usermgmt_1.UserMgmtService, core_2.Injector, com_ebiz_service_orderservice_1.OrderService, com_pharmacy_service_cartservice_1.CartService])
    ], CheckoutCart);
    return CheckoutCart;
}(com_common_basic_formcomponent_1.FormComponent));
exports.CheckoutCart = CheckoutCart;
//# sourceMappingURL=com.ebiz.checkoutcart.js.map