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
var com_common_basic_formcomponent_1 = require('../../common/basic/com.common.basic.formcomponent');
var ng2_file_upload_1 = require('ng2-file-upload');
var router_1 = require('@angular/router');
var com_ebiz_service_productservice_1 = require('./../service/com.ebiz.service.productservice');
var com_ebiz_service_fileservice_1 = require('./../service/com.ebiz.service.fileservice');
var com_pharmacy_service_cartservice_1 = require('./../service/com.pharmacy.service.cartservice');
var com_pharmacy_model_cart_1 = require('./../model/com.pharmacy.model.cart');
var com_pharmacy_model_cart_2 = require('./../model/com.pharmacy.model.cart');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
//const URL = "http://localhost:8080/ebizWAPI/upload/uploader"
var UploadPrescription = (function (_super) {
    __extends(UploadPrescription, _super);
    function UploadPrescription(injector, _userProfileService, _route, _fileService, _cartService) {
        var _this = this;
        _super.call(this, injector);
        this._userProfileService = _userProfileService;
        this._route = _route;
        this._fileService = _fileService;
        this._cartService = _cartService;
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.PRES_UPLOAD_URL = this._APIURL + "/upload/uploader";
        this.alertMsg = '';
        // cart: Cart;
        this.cartTotal = new com_pharmacy_model_cart_2.CartTotal();
        this.totalQuantity = '0';
        this.totalPrice = '0';
        // userId: any;
        this.id = 0;
        this.uploadedFiles = [];
        // alert(1)
        this.cartTotal = _cartService.getCartSummaryFromSession();
        //    alert(JSON.stringify(this.cartTotal));
        //this.order = new OrderSummary
        //this._orderService.retrieveCustomerOrders().then(res => this.handleResponse(res));
        //this.orders = this._sessionStorageService.getObject("placeOrderResponse");
        this.uploader = new ng2_file_upload_1.FileUploader({ url: this.PRES_UPLOAD_URL });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, status, response);
            _this.uploadedFiles.push(response);
         //   alert(response);
            if (_this.id > 0) {
                _this.updateUploadedFiles();
            }
        };
    }
    UploadPrescription.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.params.subscribe(function (params) {
            _this.id = +params["id"];
            // alert(this.id)
            if (Number.isInteger(_this.id)) {
                _this._fileService.getFilesByCartId(_this.id).then(function (res) { return _this.cb_getFilesByOrderId(res); });
            }
            else {
                _this.id = 0;
            }
        });
    };
    UploadPrescription.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UploadPrescription.prototype.cb_getFilesByOrderId = function (res) {
        if (res.isSuccess) {
            // alert(JSON.stringify(res));
            this.uploadedFiles = res.prescriptionUploads;
        }
        else {
            alert("Error occured!");
        }
    };
    UploadPrescription.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    UploadPrescription.prototype.dragFileAccepted = function (e) {
        var _this = this;
        setTimeout(function () {
            _this.upload();
        }, 300);
    };
    UploadPrescription.prototype.upload = function () {
        //  alert(2)
        //  alert(this.uploader.queue.length)
        for (var _i = 0, _a = this.uploader.queue; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!item.isSuccess) {
                console.log("Uploading ..." + item._file);
                item.upload();
            }
        }
    };
    UploadPrescription.prototype.add2Cart = function () {
        var _this = this;
        var cartItems = [];
        var cartItem = new com_pharmacy_model_cart_1.CartItem();
        cartItem.productId = 1;
        cartItem.quantity = this.uploader.queue.length;
        cartItem.price = 0;
        cartItem.userId = this._userProfileService.getUserId();
        cartItem.uploadedFiles = this.uploadedFiles.join();
        cartItem.presOrder = 1;
        cartItems.push(cartItem);
        this._cartService.add2Cart({ "cart": cartItems }).then(function (res) { return _this.cb_add2Cart(res, true); });
    };
    UploadPrescription.prototype.cb_add2Cart = function (res, navigate2cart) {
        console.log(res);
        if (res.isSuccess) {
            this.mapCartResponse(res);
            if (navigate2cart)
                this.showCart();
        }
        else {
            alert("Error add2Cart");
        }
    };
    UploadPrescription.prototype.mapCartResponse = function (res) {
        //   this.cartTotal.totalQuantity=res.cartTotal.totalQuantity;
        //   this.cartTotal.totalPrice= res.cartTotal.totalPrice;
        //    SessionDataService.getInstance().updateTotalCartItemsCount(""+res.cartTotal.totalQuantity);
        this.alertMsg = "PRESCRIPTIONS UPLOADED added to the cart.";
        com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', this.alertMsg);
        //alert(this.alertMsg);
    };
    UploadPrescription.prototype.updateUploadedFiles = function () {
        var _this = this;
        //   alert(id);
        var request = {
            cartId: this.id,
            uploadedFiles: this.uploadedFiles.join()
        };
        //  alert(JSON.stringify(request));
        this._cartService.updateUploadedFiles(request).then(function (res) { return _this.cb_updateUploadedFiles(res); });
    };
    UploadPrescription.prototype.cb_updateUploadedFiles = function (res) {
        if (res.isSuccess) {
            this.alertMsg = "Uploaded files  added to the cart.";
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', this.alertMsg);
        }
        else {
            alert("Error occured");
        }
    };
    UploadPrescription.prototype.deleteUploadeFile = function (index, uploadedFile) {
        var _this = this;
        var request = {
            filePath: uploadedFile
        };
        this._cartService.deleteUploadedFiles(request).then(function (res) { return _this.cb_deleteUploadedFiles(res); });
        this.fileDeleteIndex = index;
        //alert(index)
    };
    UploadPrescription.prototype.cb_deleteUploadedFiles = function (res) {
        if (res.isSuccess) {
            this.uploadedFiles.splice(this.fileDeleteIndex, 1);
            this.alertMsg = "Files Deleted from the cart.";
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', this.alertMsg);
        }
        else {
            alert("Error occured");
        }
    };
    UploadPrescription.prototype.showCart = function () {
        this._router.navigate(['dashboard/view-cart']);
    };
    UploadPrescription = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'upload-prescription',
            templateUrl: 'com.ebiz.uploadprescription.html',
            providers: [com_ebiz_service_productservice_1.ProductService, com_pharmacy_service_cartservice_1.CartService, com_ebiz_service_fileservice_1.FileService]
        }), 
        __metadata('design:paramtypes', [core_2.Injector, com_service_userprofile_1.UserProfileService, router_1.ActivatedRoute, com_ebiz_service_fileservice_1.FileService, com_pharmacy_service_cartservice_1.CartService])
    ], UploadPrescription);
    return UploadPrescription;
}(com_common_basic_formcomponent_1.FormComponent));
exports.UploadPrescription = UploadPrescription;
//# sourceMappingURL=com.ebiz.uploadprescription.js.map