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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var com_common_module_1 = require('../common/com.common.module');
var com_ebiz_searchproduct_1 = require('./searchproduct/com.ebiz.searchproduct');
var com_pharmacy_viewcart_1 = require('./cart/com.pharmacy.viewcart');
var com_ebiz_checkoutcart_1 = require('./checkout/com.ebiz.checkoutcart');
var com_ebiz_viewproduct_1 = require('./viewproduct/com.ebiz.viewproduct');
//import {CartSummary} from './cart/com.pharmacy.cartsummary';
var com_ebiz_ordersummary_1 = require('./order/com.ebiz.ordersummary');
var com_dashboard_1 = require('./dashboard/com.dashboard');
var com_service_userprofile_1 = require('../usermgmt/service/com.service.userprofile');
var com_common_sessionstorage_1 = require('../common/service/com.common.sessionstorage');
var com_common_service_logging_1 = require('../common/service/logging/com.common.service.logging');
var com_ebiz_myorders_1 = require('./order/com.ebiz.myorders');
var com_ebiz_customerorders_1 = require('./order/com.ebiz.customerorders');
var com_ebiz_editorder_1 = require('./order/com.ebiz.editorder');
var com_ebiz_uploadprescription_1 = require('./uploadprescription/com.ebiz.uploadprescription');
var ng2_file_upload_1 = require("ng2-file-upload");
var com_ebiz_paymentform_1 = require('./payment/com.ebiz.paymentform');
var com_ebiz_payment_confirm_1 = require('./payment/com.ebiz.payment.confirm');
var com_ebiz_addeditproduct_1 = require('./addproduct/com.ebiz.addeditproduct');
var PharmacyModule = (function () {
    function PharmacyModule() {
    }
    PharmacyModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, forms_1.ReactiveFormsModule, router_1.RouterModule, com_common_module_1.CommonModule, ng2_file_upload_1.FileUploadModule],
            declarations: [com_ebiz_searchproduct_1.SearchProduct, com_ebiz_viewproduct_1.ViewProduct, com_pharmacy_viewcart_1.ViewCart, com_dashboard_1.DashboardComponent, com_ebiz_checkoutcart_1.CheckoutCart, com_ebiz_ordersummary_1.OrderSummary,
                com_ebiz_myorders_1.MyOrders, com_ebiz_customerorders_1.CustomerOrders, com_ebiz_editorder_1.EditOrder, com_ebiz_uploadprescription_1.UploadPrescription, com_ebiz_paymentform_1.PaymentForm, com_ebiz_payment_confirm_1.PaymentConfirmation, com_ebiz_addeditproduct_1.AddEditProduct],
            exports: [com_ebiz_searchproduct_1.SearchProduct, com_ebiz_viewproduct_1.ViewProduct, com_pharmacy_viewcart_1.ViewCart, com_dashboard_1.DashboardComponent, com_ebiz_checkoutcart_1.CheckoutCart, com_ebiz_ordersummary_1.OrderSummary,
                com_ebiz_myorders_1.MyOrders, com_ebiz_customerorders_1.CustomerOrders, com_ebiz_editorder_1.EditOrder, com_ebiz_uploadprescription_1.UploadPrescription, com_ebiz_paymentform_1.PaymentForm, com_ebiz_payment_confirm_1.PaymentConfirmation, com_ebiz_addeditproduct_1.AddEditProduct],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' },
                com_service_userprofile_1.UserProfileService,
                com_common_sessionstorage_1.SessionStorageService,
                com_common_service_logging_1.LoggingService]
        }), 
        __metadata('design:paramtypes', [])
    ], PharmacyModule);
    return PharmacyModule;
}());
exports.PharmacyModule = PharmacyModule;
//# sourceMappingURL=com.pharmacy.module.js.map