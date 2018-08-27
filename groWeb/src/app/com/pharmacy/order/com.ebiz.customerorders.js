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
var com_ebiz_service_orderservice_1 = require('./../service/com.ebiz.service.orderservice');
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var core_2 = require('@angular/core');
var CustomerOrders = (function (_super) {
    __extends(CustomerOrders, _super);
    function CustomerOrders(injector, _orderService) {
        var _this = this;
        _super.call(this, injector);
        this._orderService = _orderService;
        //this.order = new OrderSummary
        this._orderService.retrieveCustomerOrders().then(function (res) { return _this.handleResponse(res); });
        //this.orders = this._sessionStorageService.getObject("placeOrderResponse");
    }
    CustomerOrders.prototype.handleResponse = function (res) {
        console.log("Customer orders:" + JSON.stringify(res));
        this.orders = res.orders;
    };
    CustomerOrders.prototype.viewMyOrder = function (orderId) {
        // alert(orderId);
        this._router.navigate(['dashboard/order-summary/' + orderId]);
    };
    CustomerOrders.prototype.editOrder = function (orderId) {
        // alert(orderId);
        this._router.navigate(['dashboard/edit-order/' + orderId]);
    };
    CustomerOrders.prototype.downloadXls = function () {
        window.location.href = this._orderService.getDownloadURL();
    };
    CustomerOrders = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customer-orders',
            templateUrl: 'com.ebiz.customerorders.html',
            providers: [com_ebiz_service_orderservice_1.OrderService]
        }), 
        __metadata('design:paramtypes', [core_2.Injector, com_ebiz_service_orderservice_1.OrderService])
    ], CustomerOrders);
    return CustomerOrders;
}(com_common_basic_formcomponent_1.FormComponent));
exports.CustomerOrders = CustomerOrders;
//# sourceMappingURL=com.ebiz.customerorders.js.map