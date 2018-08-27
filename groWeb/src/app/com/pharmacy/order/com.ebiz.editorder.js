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
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var core_2 = require('@angular/core');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var EditOrder = (function (_super) {
    __extends(EditOrder, _super);
    function EditOrder(injector, _orderService, _route) {
        _super.call(this, injector);
        this._orderService = _orderService;
        this._route = _route;
        console.log("OOOESWE:" + JSON.stringify(this.order));
        this.order = this._sessionStorageService.getObject("placeOrderResponse");
    }
    EditOrder.prototype.viewMyOrders = function () {
        this._router.navigate(['dashboard/my-orders']);
    };
    EditOrder.prototype.saveOrder = function () {
        var _this = this;
        console.log("@@@@" + JSON.stringify(this.order));
        this._orderService.saveOrder({ "order": this.order }).then(function (res) { return _this.cb_saveOrder(res); });
    };
    EditOrder.prototype.cb_saveOrder = function (res) {
        this._loggingService.logInfo(this.getName(), JSON.stringify(res));
        com_common_service_alertservice_1.AlertService.getInstance().publishMessage('warning', 'Order saved sucessfully! ');
        this._router.navigate(['dashboard/customer-orders']);
    };
    EditOrder.prototype.ngOnInit = function () {
        var _this = this;
        // alert(JSON.stringify(this._route.params));
        this.subscription = this._route.params.subscribe(function (params) {
            var id = +params["id"];
            //  alert(id)
            if (Number.isInteger(id)) {
                _this.order = _this.getEmptyOrderObj();
                // alert(1)
                _this._orderService.retrieveOrderById(id).then(function (res) { return _this.handleMyOrderResponse(res); });
            }
            else {
            }
        });
    };
    EditOrder.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this._sessionStorageService.setObject("placeOrderResponse", "");
    };
    EditOrder.prototype.handleMyOrderResponse = function (res) {
        //if(res.isSuccess){
        console.log("##RES#" + JSON.stringify(res.order));
        this.order = res.order;
        //}
    };
    EditOrder.prototype.getEmptyOrderObj = function () {
        var str = '{"date": "","totalQuantity": 0,"totalPrice": 0,"shippingAddress": {"street": "","city": "","state": "","country": ""},"orderId": 0,"userId": 0,"orderDetail": [{"orderId": 0,"itemId": 0,"itemDescription": "","quantity": 0,"price": 0}]}';
        return JSON.parse(str);
    };
    EditOrder.prototype.quantityUpdate = function () {
        var totalPrice = 0;
        for (var _i = 0, _a = this.order.orderDetail; _i < _a.length; _i++) {
            var orderDetail = _a[_i];
            totalPrice += orderDetail.price * orderDetail.quantity;
        }
        // totalPrice = ;
        this.order.totalPrice = totalPrice.toFixed(2);
    };
    EditOrder = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'checkout-cart',
            templateUrl: 'com.ebiz.editorder.html',
            providers: [com_pharmacy_service_cartservice_1.CartService, com_ebiz_service_orderservice_1.OrderService]
        }), 
        __metadata('design:paramtypes', [core_2.Injector, com_ebiz_service_orderservice_1.OrderService, router_1.ActivatedRoute])
    ], EditOrder);
    return EditOrder;
}(com_common_basic_formcomponent_1.FormComponent));
exports.EditOrder = EditOrder;
//# sourceMappingURL=com.ebiz.editorder.js.map