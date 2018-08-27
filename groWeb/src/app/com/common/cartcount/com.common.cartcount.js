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
var com_common_sessionstorage_1 = require('../../common/service/com.common.sessionstorage');
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var CartCount = (function () {
    function CartCount(_router, _sessionStorageService) {
        var _this = this;
        this._router = _router;
        this._sessionStorageService = _sessionStorageService;
        this.totalQuantity = '0';
        this.totalPrice = '0';
        this.userName = '';
        this.getLoggedUser();
        com_common_sessiondata_1.SessionDataService.getInstance().totalCartItemCount$.subscribe(function (total) {
            //alert(total);
            _this.totalQuantity = total;
            //console.log("Header Total cart items:"+total);
        });
    }
    CartCount.prototype.getLoggedUser = function () {
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
        var userName;
        if (userProfileObj) {
            userName = userProfileObj["firstName"];
        }
        if (userName != null) {
            this.userName = userName;
        }
    };
    CartCount.prototype.showCart = function () {
        this._router.navigate(['dashboard/view-cart']);
    };
    CartCount = __decorate([
        core_1.Component({
            selector: 'cart-count',
            templateUrl: 'app/com/common/cartcount/com.common.cartcount.html',
            providers: [com_common_sessiondata_1.SessionDataService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, com_common_sessionstorage_1.SessionStorageService])
    ], CartCount);
    return CartCount;
}());
exports.CartCount = CartCount;
//# sourceMappingURL=com.common.cartcount.js.map