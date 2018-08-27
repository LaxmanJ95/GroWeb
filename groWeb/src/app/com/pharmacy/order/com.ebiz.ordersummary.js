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
var router_1 = require('@angular/router');
var com_ebiz_service_orderservice_1 = require('./../service/com.ebiz.service.orderservice');
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_ebiz_service_fileservice_1 = require('./../service/com.ebiz.service.fileservice');
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var core_2 = require('@angular/core');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var OrderSummary = (function (_super) {
    __extends(OrderSummary, _super);
    function OrderSummary(injector, _orderService, _fileService, _cartService, _route) {
        _super.call(this, injector);
        this._orderService = _orderService;
        this._fileService = _fileService;
        this._cartService = _cartService;
        this._route = _route;
        //console.log("OOOESWE:"+JSON.stringify(this.order))        
        this.order = this._sessionStorageService.getObject("placeOrderResponse");
    }
    OrderSummary.prototype.viewMyOrders = function () {
        this._router.navigate(['dashboard/my-orders']);
    };
    OrderSummary.prototype.ngOnInit = function () {
        var _this = this;
        // alert(JSON.stringify(this._route.params));
        this.subscription = this._route.params.subscribe(function (params) {
            var id = +params["id"];
            //  alert(id)
            if (Number.isInteger(id)) {
                _this.order = _this.getEmptyOrderObj();
                // alert(JSON.stringify(this.order.shippingAddress));
                _this._orderService.retrieveOrderById(id).then(function (res) { return _this.cb_retrieveOrderById(res); });
            }
            else {
            }
        });
    };
    OrderSummary.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._sessionStorageService.setObject("placeOrderResponse", "");
    };
    OrderSummary.prototype.cb_retrieveOrderById = function (res) {
        //if(res.isSuccess){
        console.log("##RES#" + JSON.stringify(res.order));
        this.order = res.order;
        //}
    };
    OrderSummary.prototype.cb_getFilesByOrderId = function (res) {
        if (res.isSuccess) {
            // alert(JSON.stringify(res));
            this.prescriptionUploads = res.prescriptionUploads;
            this.firstPrescription = res.prescriptionUploads[0];
        }
        else {
            alert("Error occured!");
        }
    };
    OrderSummary.prototype.getEmptyOrderObj = function () {
        var str = '{"date": "","totalQuantity": 0,"totalPrice": 0,"shippingAddress": {"street": "","city": "","state": "","country": ""},"orderId": 0,"userId": 0,"orderDetail": [{"orderId": 0,"itemId": 0,"itemDescription": "","quantity": 0,"price": 0}]}';
        return JSON.parse(str);
    };
    OrderSummary.prototype.showUpoloadedFiles = function (orderId, cartId) {
        var _this = this;
        //  alert(orderId+","+cartId);
        this._fileService.getFilesByOrderIdAndCartId(orderId, cartId).then(function (res) { return _this.cb_getFilesByOrderId(res); });
    };
    OrderSummary.prototype.addOrder2Cart = function (orderId) {
        var _this = this;
        // alert(orderId)
        this._cartService.add2CartFromOldOrder(orderId).then(function (res) { return _this.cb_add2CartFromOldOrder(res); });
    };
    OrderSummary.prototype.cb_add2CartFromOldOrder = function (res) {
        if (res.isSuccess) {
            //alert(res);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'Order added to cart sucessfully! ');
            this.showCart();
        }
        else {
            alert("Error occured");
        }
    };
    OrderSummary.prototype.copyOldOrder = function (orderId) {
        var _this = this;
        // alert(orderId)
        // alert(orderId)
        this._orderService.copyOldOrder(orderId).then(function (res) { return _this.cb_copyOldOrder(res); });
    };
    OrderSummary.prototype.cb_copyOldOrder = function (res) {
        if (res.isSuccess) {
            //alert(res);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('success', 'Order copied & placed sucessfully! ');
            this.showOrderSummary(res.id);
        }
        else {
            alert("Error occured");
        }
    };
    OrderSummary.prototype.showCart = function () {
        this._router.navigate(['dashboard/view-cart/']);
    };
    OrderSummary.prototype.showOrderSummary = function (orderId) {
        this._router.navigate(['dashboard/order-summary/' + orderId]);
    };
    OrderSummary.prototype.makePayment = function (orderId) {
        var orderInfo = {
            orderId: this.order.orderId,
            currentOrderPrice: this.order.totalPrice,
            paymentMethod: this.order.paymentMethod
        };
        this._sessionStorageService.setObject("order", this.order);
        this._router.navigate(['dashboard/payment-form/' + orderId]);
    };
    OrderSummary = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'checkout-cart',
            templateUrl: 'com.ebiz.ordersummary.html',
            providers: [com_pharmacy_service_cartservice_1.CartService, com_ebiz_service_orderservice_1.OrderService, com_ebiz_service_fileservice_1.FileService]
        }), 
        __metadata('design:paramtypes', [core_2.Injector, com_ebiz_service_orderservice_1.OrderService, com_ebiz_service_fileservice_1.FileService, com_pharmacy_service_cartservice_1.CartService, router_1.ActivatedRoute])
    ], OrderSummary);
    return OrderSummary;
}(com_common_basic_formcomponent_1.FormComponent));
exports.OrderSummary = OrderSummary;
//# sourceMappingURL=com.ebiz.ordersummary.js.map