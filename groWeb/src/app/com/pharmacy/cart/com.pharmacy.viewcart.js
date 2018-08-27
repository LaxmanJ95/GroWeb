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
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_pharmacy_model_cart_1 = require('./../model/com.pharmacy.model.cart');
var com_pharmacy_model_cart_2 = require('./../model/com.pharmacy.model.cart');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var ViewCart = (function (_super) {
    __extends(ViewCart, _super);
    function ViewCart(injector, _cartService) {
        var _this = this;
        _super.call(this, injector);
        this._cartService = _cartService;
        this.cartTotal = new com_pharmacy_model_cart_1.CartTotal();
        _cartService.viewMyCart().then(function (res) { return _this.handleListCartResponse(res); });
    }
    ViewCart.prototype.handleListCartResponse = function (res) {
        this.cartTotal = res.cartTotal;
        this.cartItems = res.cart;
        this._loggingService.logDebug(this.getName(), JSON.stringify(res));
        this._cartService.setCartSummaryToSession(this.cartTotal);
    };
    ViewCart.prototype.cp_updateQuantity = function (res, desc, quantity) {
        console.log("updateQuantity.." + res);
        // alert(quantity)
        if (res.isSuccess) {
            if (quantity > 0) {
                com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', desc + ' : Quantity updated to ' + quantity + ' successfully!');
            }
            else {
                com_common_service_alertservice_1.AlertService.getInstance().publishMessage('warning', desc + ' : deleted from cart successfully!');
            }
        }
    };
    // updateQuantity(){
    //   var request = new UpdateQuantityRequest();
    //    this._cartService.updateQuantity(request).then(res => this.cp_updateQuantity(res, desc,quantity));
    //  }
    ViewCart.prototype.calculateTotalPrice = function (index, quantity) {
        var _this = this;
        var request = new com_pharmacy_model_cart_2.UpdateQuantityRequest();
        this.cartItems[index].quantity = quantity;
        request.cartId = this.cartItems[index].id;
        request.productId = this.cartItems[index].productId;
        request.quantity = this.cartItems[index].quantity;
        var desc = this.cartItems[index].productName;
        this._loggingService.logDebug(this.getName(), "UpdateQuantity Request:" + JSON.stringify(request));
        this._cartService.updateQuantity(request).then(function (res) { return _this.cp_updateQuantity(res, desc, quantity); });
        if (quantity == 0) {
            this.cartItems.splice(index, 1);
        }
        // alert(JSON.stringify(this.cartItems)
        this.cartTotal.totalPrice = 0;
        this.cartTotal.totalQuantity = 0;
        for (var _i = 0, _a = this.cartItems; _i < _a.length; _i++) {
            var cartItem = _a[_i];
            //alert(cartItem.quantity)
            this.cartTotal.totalPrice += (cartItem.price * cartItem.quantity);
            this.cartTotal.totalQuantity += (1 * cartItem.quantity);
        }
        com_common_sessiondata_1.SessionDataService.getInstance().updateTotalCartItemsCount("" + this.cartTotal.totalQuantity);
    };
    ViewCart.prototype.viewItem = function (id) {
        this._router.navigate(['dashboard/pharmacy-viewdrug/' + id]);
    };
    ViewCart.prototype.checkout = function () {
        this._router.navigate(['dashboard/checkout-cart']);
    };
    ViewCart.prototype.uploadPrescription = function (id) {
        this._router.navigate(['dashboard/upload-prescription/' + id]);
    };
    ViewCart = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-cart',
            templateUrl: 'com.pharmacy.viewcart.html',
            styleUrls: ['com.ebiz.viewcart.css'],
            providers: [com_pharmacy_service_cartservice_1.CartService]
        }), 
        __metadata('design:paramtypes', [core_2.Injector, com_pharmacy_service_cartservice_1.CartService])
    ], ViewCart);
    return ViewCart;
}(com_common_basic_formcomponent_1.FormComponent));
exports.ViewCart = ViewCart;
//# sourceMappingURL=com.pharmacy.viewcart.js.map