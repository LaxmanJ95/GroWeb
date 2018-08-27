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
var com_ebiz_service_productservice_1 = require('./../service/com.ebiz.service.productservice');
var com_ebiz_model_Product_1 = require('./../model/com.ebiz.model.Product');
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_pharmacy_model_cart_1 = require('./../model/com.pharmacy.model.cart');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_pharmacy_model_cart_2 = require('./../model/com.pharmacy.model.cart');
var ViewProduct = (function () {
    function ViewProduct(_router, _route, _productService, _cartService) {
        var _this = this;
        this._router = _router;
        this._route = _route;
        this._productService = _productService;
        this._cartService = _cartService;
        this.product = new com_ebiz_model_Product_1.Product();
        this.cart = new com_pharmacy_model_cart_1.Cart();
        _cartService.getCartSummary().then(function (res) { return _this.handleCartSummaryResponse(res); });
    }
    ViewProduct.prototype.add2Cart = function () {
        var _this = this;
        var cartItems = [];
        var cartItem = new com_pharmacy_model_cart_2.CartItem();
        cartItem.cartId = 4;
        cartItem.itemId = this.product.id;
        cartItem.quantity = this.product.quantity;
        cartItem.price = this.product.price;
        cartItem.quantity = this.product.quantity;
        cartItem.userId = 2;
        cartItems.push(cartItem);
        this.cart.cartItems = cartItems;
        // console.log("CART ITEMS:"+JSON.stringify(cartItems));
        this._cartService.add2Cart(cartItems).then(function (res) { return _this.handleAdd2CartResponse(res); });
    };
    ViewProduct.prototype.handleAdd2CartResponse = function (res) {
        // console.log(res);
        if (res.isSuccess) {
            this.mapCartResponse(res);
            this.showCart();
        }
        else {
        }
    };
    ViewProduct.prototype.mapCartResponse = function (res) {
        this.cart.totalQuantity = res.cart.totalQuantity;
        this.cart.totalPrice = res.cart.totalPrice;
        com_common_sessiondata_1.SessionDataService.getInstance().updateTotalCartItemsCount("" + res.cart.totalQuantity);
    };
    ViewProduct.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.params.subscribe(function (params) {
            _this.id = +params["id"];
            _this._productService.viewDrug(_this.id).then(function (res) { return _this.handleResponse(res); });
        });
    };
    ViewProduct.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ViewProduct.prototype.handleCartSummaryResponse = function (res) {
        // console.log(res);
        if (res.isSuccess) {
            this.mapCartResponse(res);
        }
        else {
        }
    };
    ViewProduct.prototype.handleResponse = function (res) {
        this.product = res.product;
        // console.log(JSON.stringify(this.drug));
    };
    ViewProduct.prototype.back2SearchDrug = function () {
        this._router.navigate(['dashboard/pharmacy-searchdrugs']);
    };
    ViewProduct.prototype.showCart = function () {
        this._router.navigate(['dashboard/view-cart']);
    };
    ViewProduct = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'view-drug',
            templateUrl: 'com.pharmacy.viewdrug.html',
            providers: [com_ebiz_service_productservice_1.ProductService, com_pharmacy_service_cartservice_1.CartService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, com_ebiz_service_productservice_1.ProductService, com_pharmacy_service_cartservice_1.CartService])
    ], ViewProduct);
    return ViewProduct;
}());
exports.ViewProduct = ViewProduct;
//# sourceMappingURL=com.pharmacy.viewdrug.js.map