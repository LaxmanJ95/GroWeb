"use strict";
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
var router_1 = require('@angular/router');
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var CartSummary = (function () {
    function CartSummary(_router, _cartService) {
        var _this = this;
        this._router = _router;
        this._cartService = _cartService;
        this.totalQuantity = '0';
        this.totalPrice = '0';
        _cartService.getCartSummary().then(function (res) { return _this.handleResponse(res); });
        com_common_sessiondata_1.SessionDataService.getInstance().totalCartItemCount$.subscribe(function (total) {
            //alert(total);
            _this.totalQuantity = total;
            //console.log("Header Total cart items:"+total);
        });
    }
    CartSummary.prototype.handleResponse = function (res) {
        this.totalQuantity = res.cart.totalQuantity;
        this.totalPrice = res.cart.totalPrice;
    };
    CartSummary.prototype.showCart = function () {
        this._router.navigate(['dashboard/view-cart']);
    };
    CartSummary = __decorate([
        core_1.Component({
            selector: 'cart-summary',
            templateUrl: 'app/com/pharmacy/cart/com.pharmacy.cartsummary.html',
            providers: [com_pharmacy_service_cartservice_1.CartService, com_common_sessiondata_1.SessionDataService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, com_pharmacy_service_cartservice_1.CartService])
    ], CartSummary);
    return CartSummary;
}());
exports.CartSummary = CartSummary;
//# sourceMappingURL=com.pharmacy.cartsummary.js.map