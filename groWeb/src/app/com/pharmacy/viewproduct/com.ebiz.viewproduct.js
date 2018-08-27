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
var com_ebiz_model_product_1 = require('./../model/com.ebiz.model.product');
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_pharmacy_model_cart_1 = require('./../model/com.pharmacy.model.cart');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_pharmacy_model_cart_2 = require('./../model/com.pharmacy.model.cart');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var ViewProduct = (function () {
    function ViewProduct(_router, _route, _productService, _userProfileService, _cartService) {
        var _this = this;
        this._router = _router;
        this._route = _route;
        this._productService = _productService;
        this._userProfileService = _userProfileService;
        this._cartService = _cartService;
        this.product = new com_ebiz_model_product_1.Product();
        this.cart = new com_pharmacy_model_cart_1.Cart();
        this.userId = _userProfileService.getUserId();
        _cartService.getCartCount().then(function (res) { return _this.cb_getCartCount(res); });
        // _cartService.getCartSummary().then(res => this.handleCartSummaryResponse(res));
    }
    ViewProduct.prototype.cb_getCartCount = function (res) {
        //console.log(res);
        if (res.isSuccess) {
            // alert(this.alertMsg);
            this.mapCartResponse(res);
        }
        else {
            alert("Error cart count");
        }
    };
    ViewProduct.prototype.add2Cart = function () {
        var _this = this;
        var cartItems = [];
        var cartItem = new com_pharmacy_model_cart_2.CartItem();
        //cartItem.cartId= 4;
        cartItem.productId = this.product.id;
        cartItem.quantity = this.product.quantity;
        cartItem.price = this.product.price;
        cartItem.userId = this.userId;
        //cartItem.userId=2;
        cartItems.push(cartItem);
        this.cart.cartItems = cartItems;
        // console.log("CART ITEMS:"+JSON.stringify(cartItems));
        this._cartService.add2Cart({ "cart": cartItems }).then(function (res) { return _this.handleAdd2CartResponse(res); });
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
        this.cart.totalQuantity = res.cartTotal.totalQuantity;
        this.cart.totalPrice = res.cartTotal.totalPrice;
        com_common_sessiondata_1.SessionDataService.getInstance().updateTotalCartItemsCount("" + res.cartTotal.totalQuantity);
    };
    ViewProduct.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.params.subscribe(function (params) {
            _this.id = +params["id"];
            _this._productService.viewProduct(_this.id).then(function (res) { return _this.cb_viewProduct(res); });
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
    ViewProduct.prototype.cb_viewProduct = function (res) {
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
            templateUrl: 'com.ebiz.viewproduct.html',
            providers: [com_ebiz_service_productservice_1.ProductService, com_pharmacy_service_cartservice_1.CartService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, com_ebiz_service_productservice_1.ProductService, com_service_userprofile_1.UserProfileService, com_pharmacy_service_cartservice_1.CartService])
    ], ViewProduct);
    return ViewProduct;
}());
exports.ViewProduct = ViewProduct;
//# sourceMappingURL=com.ebiz.viewproduct.js.map