"use strict";
var router_1 = require('@angular/router');
//----------
var com_ebiz_searchproduct_1 = require('./searchproduct/com.ebiz.searchproduct');
var com_ebiz_viewproduct_1 = require('./viewproduct/com.ebiz.viewproduct');
var com_pharmacy_viewcart_1 = require('./cart/com.pharmacy.viewcart');
var com_ebiz_checkoutcart_1 = require('./checkout/com.ebiz.checkoutcart');
var com_dashboard_1 = require('./dashboard/com.dashboard');
var com_ebiz_ordersummary_1 = require('./order/com.ebiz.ordersummary');
var com_ebiz_editorder_1 = require('./order/com.ebiz.editorder');
var com_ebiz_myorders_1 = require('./order/com.ebiz.myorders');
var com_ebiz_addeditproduct_1 = require('./addproduct/com.ebiz.addeditproduct');
var com_ebiz_customerorders_1 = require('./order/com.ebiz.customerorders');
var com_usermgmt_userprofile_1 = require('../usermgmt/profile/com.usermgmt.userprofile');
var com_ebiz_uploadprescription_1 = require('./uploadprescription/com.ebiz.uploadprescription');
var com_ebiz_paymentform_1 = require('./payment/com.ebiz.paymentform');
var com_ebiz_payment_confirm_1 = require('./payment/com.ebiz.payment.confirm');
exports.PharmacyRouting = router_1.RouterModule.forChild([
    { path: 'dashboard', component: com_dashboard_1.DashboardComponent,
        children: [
            { path: '', component: com_ebiz_searchproduct_1.SearchProduct },
            { path: 'pharmacy-searchdrugs', component: com_ebiz_searchproduct_1.SearchProduct },
            { path: 'pharmacy-viewdrug/:id', component: com_ebiz_viewproduct_1.ViewProduct },
            { path: 'view-cart', component: com_pharmacy_viewcart_1.ViewCart },
            { path: 'checkout-cart', component: com_ebiz_checkoutcart_1.CheckoutCart },
            { path: 'my-orders', component: com_ebiz_myorders_1.MyOrders },
            { path: 'customer-orders', component: com_ebiz_customerorders_1.CustomerOrders },
            { path: 'order-summary/:id', component: com_ebiz_ordersummary_1.OrderSummary },
            { path: 'edit-order/:id', component: com_ebiz_editorder_1.EditOrder },
            { path: 'order-summary', component: com_ebiz_ordersummary_1.OrderSummary },
            { path: 'user-profile', component: com_usermgmt_userprofile_1.UserProfile },
            { path: 'upload-prescription', component: com_ebiz_uploadprescription_1.UploadPrescription },
            { path: 'upload-prescription/:id', component: com_ebiz_uploadprescription_1.UploadPrescription },
            { path: 'payment-form/:id', component: com_ebiz_paymentform_1.PaymentForm },
            { path: 'payment-form', component: com_ebiz_paymentform_1.PaymentForm },
            { path: 'payment.confirm', component: com_ebiz_payment_confirm_1.PaymentConfirmation },
            { path: 'add-product', component: com_ebiz_addeditproduct_1.AddEditProduct },
            { path: 'edit-product/:id', component: com_ebiz_addeditproduct_1.AddEditProduct }
        ]
    },
]);
//# sourceMappingURL=com.pharmacy.routing.js.map