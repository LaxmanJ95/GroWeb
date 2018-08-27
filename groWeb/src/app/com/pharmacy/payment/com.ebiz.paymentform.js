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
var com_ebiz_service_paymentservice_1 = require('./../service/com.ebiz.service.paymentservice');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var PaymentForm = (function (_super) {
    __extends(PaymentForm, _super);
    function PaymentForm(_userProfileService, injector, _paymentService) {
        var _this = this;
        _super.call(this, injector);
        this._userProfileService = _userProfileService;
        this._paymentService = _paymentService;
        this.customerBalance = 0;
        this.order = this._sessionStorageService.getObject("order");
        var userId = this._userProfileService.getUserId();
        this._paymentService.get("customerBalance", userId).then(function (res) { return _this.cb_customerBalance(res); });
    }
    PaymentForm.prototype.onSubmit = function (f) {
        var _this = this;
        // alert(f.value.paymentAmount);
        this.paymentAmount = f.value.paymentAmount;
        var request = {
            userId: this._userProfileService.getUserId(),
            orderId: this.order.id,
            payment: f.value.paymentAmount,
            paymentMethod: f.value.paymentMethod,
            paymentAgent: f.value.paymentAgent
        };
        //   alert(JSON.stringify(request))
        this._paymentService.post("customerPayment", request).then(function (res) { return _this.cb_customerPayment(res); });
    };
    PaymentForm.prototype.cb_customerBalance = function (res) {
        if (res.isSuccess) {
            this.customerBalance = res.paymentDue;
        }
    };
    PaymentForm.prototype.cb_customerPayment = function (res) {
        if (res.isSuccess) {
            var paymentInfo = {
                error: false,
                paymentAmount: this.paymentAmount,
                email: this._userProfileService.getUserProfile()['email']
            };
        }
        else {
            var paymentInfo = {
                error: true,
                paymentAmount: this.paymentAmount,
                email: this._userProfileService.getUserProfile()['email']
            };
            alert("Error Occured!!");
        }
        this._sessionStorageService.setObject("paymentInfo", paymentInfo);
        this._router.navigate(['dashboard/payment.confirm']);
    };
    PaymentForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'payment-form',
            templateUrl: 'com.ebiz.paymentform.html',
            providers: [com_ebiz_service_paymentservice_1.PaymentService, com_common_service_alertservice_1.AlertService]
        }), 
        __metadata('design:paramtypes', [com_service_userprofile_1.UserProfileService, core_2.Injector, com_ebiz_service_paymentservice_1.PaymentService])
    ], PaymentForm);
    return PaymentForm;
}(com_common_basic_formcomponent_1.FormComponent));
exports.PaymentForm = PaymentForm;
//# sourceMappingURL=com.ebiz.paymentform.js.map