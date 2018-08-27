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
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var core_2 = require('@angular/core');
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var PaymentConfirmation = (function (_super) {
    __extends(PaymentConfirmation, _super);
    //paymentAmount:number;
    function PaymentConfirmation(_userProfileService, injector) {
        _super.call(this, injector);
        this._userProfileService = _userProfileService;
        this.paymentInfo = this._sessionStorageService.getObject("paymentInfo");
        // this.email = ;
    }
    PaymentConfirmation.prototype.showDashboard = function () {
        this._router.navigate(['dashboard']);
    };
    PaymentConfirmation = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'payment-confirm',
            templateUrl: 'com.ebiz.payment.confirm.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [com_service_userprofile_1.UserProfileService, core_2.Injector])
    ], PaymentConfirmation);
    return PaymentConfirmation;
}(com_common_basic_formcomponent_1.FormComponent));
exports.PaymentConfirmation = PaymentConfirmation;
//# sourceMappingURL=com.ebiz.payment.confirm.js.map