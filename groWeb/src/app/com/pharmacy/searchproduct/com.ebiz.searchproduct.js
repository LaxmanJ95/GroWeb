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
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var com_ebiz_service_productservice_1 = require('./../service/com.ebiz.service.productservice');
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_pharmacy_model_cart_1 = require('./../model/com.pharmacy.model.cart');
var com_pharmacy_model_cart_2 = require('./../model/com.pharmacy.model.cart');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var SearchProduct = (function () {
    function SearchProduct(_router, el, _productService, _userProfileService, _cartService) {
        var _this = this;
        this._router = _router;
        this.el = el;
        this._productService = _productService;
        this._userProfileService = _userProfileService;
        this._cartService = _cartService;
        this.alertMsg = '';
        this.totalQuantity = '0';
        this.totalPrice = '0';
        this.cartTotal = new com_pharmacy_model_cart_2.CartTotal();
        _cartService.getCartCount().then(function (res) { return _this.cb_getCartCount(res); });
        this.roleId = this._userProfileService.getUserProfile()['roleId'];
        this.userId = _userProfileService.getUserId();
        //  alert(this.userId)
        //  alert(this.roleId)
        var searchRequest = {
            userId: this._userProfileService.getUserId(),
            roleId: this.roleId
        };
        _productService.searchProduct(searchRequest).then(function (res) { return _this.cp_searchProduct(res); });
    }
    SearchProduct.prototype.search = function () {
        //this._productService.searchProduct("").then(res => this.cp_searchProduct(res));
    };
    SearchProduct.prototype.ngOnInit = function () {
        var _this = this;
        var keyups = Observable_1.Observable.fromEvent(this.searchBox.nativeElement, "keyup")
            .map(function (event) { return event.target.value; })
            .debounceTime(400)
            .distinctUntilChanged()
            .map(function (searchTerm) {
            console.log("searchTerm.." + searchTerm);
            // alert(searchTerm);
            var searchRequest = {
                userId: _this._userProfileService.getUserId(),
                searchKey: searchTerm,
                roleId: _this.roleId
            };
            _this._productService.searchProduct(searchRequest).then(function (res) { return _this.cp_searchProduct(res); });
        });
        keyups.subscribe(function (data) { return console.log("keyup" + data); });
    };
    SearchProduct.prototype.cp_searchProduct = function (res) {
        this.products = res.products;
        // console.log(JSON.stringify(this.drugs));
    };
    SearchProduct.prototype.viewItem = function (id) {
        this._router.navigate(['dashboard/pharmacy-viewdrug/' + id]);
    };
    SearchProduct.prototype.addItem2Cart = function (index) {
        var _this = this;
        // alert(this.searchBox.nativeElement);
        // alert(index)
        var cartItems = [];
        var i = 0;
        var product = this.products[index];
        var cartItem = new com_pharmacy_model_cart_1.CartItem();
        //cartItem.cartId= 4;
        cartItem.productId = product.id;
        cartItem.quantity = product.quantity;
        cartItem.price = product.price;
        cartItem.userId = this.userId;
        cartItems.push(cartItem);
        this.alertMsg = this.alertMsg + product.name + ":" + product.quantity + ",";
        this.products[index].inCart = true;
        if (this.alertMsg.length > 0) {
            this.alertMsg = this.alertMsg.substr(0, this.alertMsg.length - 1);
            this.alertMsg += " added to the cart.";
        }
        //this.cart.cartItems= cartItems;
        // console.log("CART ITEMS:"+JSON.stringify(cartItems));
        this._cartService.add2Cart({ "cart": cartItems }).then(function (res) { return _this.cb_add2Cart(res, false); });
    };
    SearchProduct.prototype.add2Cart = function () {
        var _this = this;
        var cartItems = [];
        var i = 0;
        var myProducts;
        myProducts = this.products;
        for (var _i = 0, myProducts_1 = myProducts; _i < myProducts_1.length; _i++) {
            var product = myProducts_1[_i];
            if (product.checkedFlag) {
                var cartItem = new com_pharmacy_model_cart_1.CartItem();
                //cartItem.cartId= 4;
                cartItem.productId = product.id;
                cartItem.quantity = product.quantity;
                cartItem.price = product.price;
                cartItem.userId = this.userId;
                cartItems.push(cartItem);
                this.alertMsg = this.alertMsg + product.name + ":" + product.quantity + ",";
            }
        }
        if (this.alertMsg.length > 0) {
            this.alertMsg = this.alertMsg.substr(0, this.alertMsg.length - 1);
            this.alertMsg += " added to the cart.";
        }
        //this.cart.cartItems= cartItems;
        // console.log("CART ITEMS:"+JSON.stringify(cartItems));
        this._cartService.add2Cart({ "cart": cartItems }).then(function (res) { return _this.cb_add2Cart(res, true); });
    };
    SearchProduct.prototype.cb_getCartCount = function (res) {
        //console.log(res);
        if (res.isSuccess) {
            // alert(this.alertMsg);
            this.mapCartResponse(res);
        }
        else {
            alert("Error cart count");
        }
    };
    SearchProduct.prototype.cb_add2Cart = function (res, navigate2cart) {
        console.log(res);
        if (res.isSuccess) {
            this.mapCartResponse(res);
            if (navigate2cart)
                this.showCart();
        }
        else {
            alert("Error add2Cart");
        }
    };
    SearchProduct.prototype.mapCartResponse = function (res) {
        this.cartTotal.totalQuantity = res.cartTotal.totalQuantity;
        this.cartTotal.totalPrice = res.cartTotal.totalPrice;
        this._cartService.setCartSummaryToSession(this.cartTotal);
        com_common_sessiondata_1.SessionDataService.getInstance().updateTotalCartItemsCount("" + res.cartTotal.totalQuantity);
        com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', this.alertMsg);
        //alert(this.alertMsg);
    };
    SearchProduct.prototype.showCart = function () {
        this._router.navigate(['dashboard/view-cart']);
    };
    SearchProduct.prototype.uploadPrescription = function () {
        this._router.navigate(['dashboard/upload-prescription']);
    };
    SearchProduct.prototype.showAddProductForm = function () {
        this._router.navigate(['dashboard/add-product']);
    };
    SearchProduct.prototype.editProduct = function (id) {
        this._router.navigate(['dashboard/edit-product/' + id]);
    };
    __decorate([
        core_1.ViewChild('searchBox'), 
        __metadata('design:type', core_1.ElementRef)
    ], SearchProduct.prototype, "searchBox", void 0);
    SearchProduct = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-drugs',
            templateUrl: 'com.ebiz.searchproduct.html',
            styleUrls: ['com.ebiz.searchproduct.css'],
            providers: [com_ebiz_service_productservice_1.ProductService, com_pharmacy_service_cartservice_1.CartService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef, com_ebiz_service_productservice_1.ProductService, com_service_userprofile_1.UserProfileService, com_pharmacy_service_cartservice_1.CartService])
    ], SearchProduct);
    return SearchProduct;
}());
exports.SearchProduct = SearchProduct;
//# sourceMappingURL=com.ebiz.searchproduct.js.map