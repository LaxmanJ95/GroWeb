import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {CommonModule} from '../common/com.common.module';

import {SearchProduct} from './searchproduct/com.ebiz.searchproduct';
import {ViewCart} from './cart/com.pharmacy.viewcart';
import {CheckoutCart} from './checkout/com.ebiz.checkoutcart';
import {ViewProduct} from './viewproduct/com.ebiz.viewproduct';
//import {CartSummary} from './cart/com.pharmacy.cartsummary';
import {OrderSummary} from './order/com.ebiz.ordersummary';
import {DashboardComponent} from './dashboard/com.dashboard';
import {UserProfileService} from '../usermgmt/service/com.service.userprofile';
import {SessionStorageService} from '../common/service/com.common.sessionstorage';
import {LoggingService} from '../common/service/logging/com.common.service.logging';
import {MyOrders} from './order/com.ebiz.myorders';
import {CustomerOrders} from './order/com.ebiz.customerorders';
import {EditOrder} from './order/com.ebiz.editorder';
import {Alert} from '../common/alert/com.common.alert';
import {UploadPrescription} from './uploadprescription/com.ebiz.uploadprescription'
import {FileUploadModule} from "ng2-file-upload";
import {PaymentForm} from './payment/com.ebiz.paymentform';
import {PaymentConfirmation} from './payment/com.ebiz.payment.confirm';
import {AddEditProduct} from './addproduct/com.ebiz.addeditproduct';
import {UserMgmtModule} from '../usermgmt/com.usermgmt.module'
import {UserAddress} from '../usermgmt/address/com.usermgmt.useraddress'
import{MainSearchComponent} from './searchproduct/com.main.search';
import {ViewWishList} from './wishlist/com.pharmacy.wishlist'
import { TextMaskModule } from 'angular2-text-mask';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { DatepickerModule } from 'angular-mat-datepicker'
import {AuthGuard} from './gaurd/com.common.gaurd'
import {PaymentDetails} from './payment/paymentDetails/com.ebiz.paymentDetails'
import { PhoneMaskComponent } from './mask/com.mask';
import {OnlyNumber} from './gaurd/com.textmask.directive'
@NgModule({
  imports:      [ BrowserModule,TextMaskModule,DatepickerModule ,AngularDateTimePickerModule,FormsModule,HttpModule,ReactiveFormsModule,RouterModule,CommonModule,FileUploadModule,UserMgmtModule],
  declarations: [ OnlyNumber,MainSearchComponent,SearchProduct,ViewProduct,ViewCart,DashboardComponent,CheckoutCart,OrderSummary,PaymentDetails,
                  MyOrders,CustomerOrders,EditOrder,UploadPrescription,PaymentForm,PaymentConfirmation,AddEditProduct,ViewWishList],
  exports:    [ OnlyNumber,MainSearchComponent, SearchProduct,ViewProduct,ViewCart,DashboardComponent,CheckoutCart,OrderSummary,PaymentDetails,
                  MyOrders,CustomerOrders,EditOrder,UploadPrescription,PaymentForm,PaymentConfirmation,AddEditProduct,ViewWishList],
  providers: [{provide: APP_BASE_HREF, useValue : '/' },
               UserProfileService ,PhoneMaskComponent,
              SessionStorageService,
              LoggingService,AuthGuard],
  
})
export class PharmacyModule { }


