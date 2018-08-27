import {Router , RouterModule } from '@angular/router';

//----------

import {SearchProduct} from './searchproduct/com.ebiz.searchproduct';
import {ViewProduct} from './viewproduct/com.ebiz.viewproduct';
import {ViewCart} from './cart/com.pharmacy.viewcart';
import {CheckoutCart} from './checkout/com.ebiz.checkoutcart';
import {DashboardComponent} from './dashboard/com.dashboard';
import {OrderSummary} from './order/com.ebiz.ordersummary';
import {EditOrder} from './order/com.ebiz.editorder';
import {MyOrders} from './order/com.ebiz.myorders';
import {AddEditProduct} from './addproduct/com.ebiz.addeditproduct';
import {CustomerOrders} from './order/com.ebiz.customerorders';
import {UserProfile} from '../usermgmt/profile/com.usermgmt.userprofile';
import {UploadPrescription} from './uploadprescription/com.ebiz.uploadprescription';
import {PaymentForm} from './payment/com.ebiz.paymentform';
import {PaymentConfirmation} from './payment/com.ebiz.payment.confirm';
import {ViewWishList} from './wishlist/com.pharmacy.wishlist'
import {AuthGuard} from './gaurd/com.common.gaurd'
import {PaymentDetails} from './payment/paymentDetails/com.ebiz.paymentDetails'
export const PharmacyRouting = RouterModule.forChild([

    {path: 'dashboard', component: DashboardComponent,
        children: [
            { path: '', component: SearchProduct },
            {path: 'grocery-products',component: SearchProduct},
         //   {path: 'pharmacy-searchdrugs', component: SearchProduct},
          
            {path: 'grocery-viewproduct/:id', component: ViewProduct},
            {path: 'view-cart',component: ViewCart},
            {path: 'checkout-cart',  component: CheckoutCart},
            {path: 'my-orders',  component: MyOrders},
            {path: 'customer-orders',  canActivate: [AuthGuard],  component: CustomerOrders},
            {path: 'order-summary/:id',   component: OrderSummary},
            {path: 'edit-order/:id', canActivate: [AuthGuard], component: EditOrder},
            {path: 'order-summary',   component: OrderSummary},
            {path: 'user-profile',    component: UserProfile},
            {path: 'upload-prescription', canActivate: [AuthGuard],  component: UploadPrescription},
            {path: 'upload-prescription/:id', canActivate: [AuthGuard],  component: UploadPrescription},
            {path: 'payment-form/:id',  canActivate: [AuthGuard], component: PaymentForm},
            {path: 'payment-form', canActivate: [AuthGuard],  component: PaymentForm},
            {path: 'payment.confirm',  canActivate: [AuthGuard],  component: PaymentConfirmation},
            {path: 'add-product',  canActivate: [AuthGuard],  component: AddEditProduct},
            {path: 'edit-product/:id',  canActivate: [AuthGuard],  component: AddEditProduct},
            {path: 'view-wishlist',  component:ViewWishList},
            {path: 'paymentDetails', canActivate: [AuthGuard],  component : PaymentDetails}
            
       ]
    }, 

]);