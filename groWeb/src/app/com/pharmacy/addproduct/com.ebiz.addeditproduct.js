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
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var core_2 = require('@angular/core');
var router_2 = require('@angular/router');
var ng2_file_upload_1 = require('ng2-file-upload');
//----
var com_common_sessiondata_1 = require('../../common/service/com.common.sessiondata');
var com_service_usermgmt_1 = require('../../usermgmt/service/com.service.usermgmt');
var com_ebiz_service_productservice_1 = require('./../service/com.ebiz.service.productservice');
var com_common_basic_basecomponent_1 = require('../../common/basic/com.common.basic.basecomponent');
var com_service_userprofile_1 = require('../../usermgmt/service/com.service.userprofile');
var com_common_service_alertservice_1 = require('../../common/service/alert/com.common.service.alertservice');
var com_ebiz_model_product_1 = require('../model/com.ebiz.model.product');
var AddEditProduct = (function (_super) {
    __extends(AddEditProduct, _super);
    function AddEditProduct(_router, injector, _userProfileService, _route, _productService, _userMgmtService, fb) {
        var _this = this;
        _super.call(this, injector);
        this._router = _router;
        this._userProfileService = _userProfileService;
        this._route = _route;
        this._productService = _productService;
        this._userMgmtService = _userMgmtService;
        this.fb = fb;
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.PRES_UPLOAD_URL = this._APIURL + "/upload/productImageUploader";
        this.isFormValid = true;
        this.product = new com_ebiz_model_product_1.Product();
        this.uploadedFiles = [];
        // this.loadUserProfile();
        this.productForm = this.fb.group({
            _productName: new FormControl('',forms_1.Validators.required), 
        //    _productName: ['', forms_1.Validators.required],
            _productDescription: ['', forms_1.Validators.required],
            _packing: ['', forms_1.Validators.required],
            _price: ['', forms_1.Validators.required]
        });
        this.roleId = this._userProfileService.getUserProfile()['roleId'];
        //this.userId = this._userProfileService.getUserId();
        this.product.userId = this._userProfileService.getUserId();
        this.uploader = new ng2_file_upload_1.FileUploader({ url: this.PRES_UPLOAD_URL });
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("ImageUpload:uploaded:", item, status, response);
            _this.uploadedFiles.push(response);
            _this.product.imageFile = response;
            _this.isProductImageAvailable = true;
        };
    }
    AddEditProduct.prototype.ngOnInit = function () {
        var _this = this;
        // alert(JSON.stringify(this._route.params));
        this.subscription = this._route.params.subscribe(function (params) {
            var id = +params["id"];
            //  alert(id)
            if (Number.isInteger(id)) {
                //this.order = this.getEmptyOrderObj();
                // alert(1)
                _this._productService.viewProduct(id).then(function (res) { return _this.cb_viewProduct(res); });
            }
            else {
            }
        });
    };
    AddEditProduct.prototype.cb_viewProduct = function (res) {
        if (res.isSuccess) {
            this.product = res.product;
            //   alert(this.product.imageFile)
            if (this.product.imageFile == '' || this.product.imageFile == null || this.product.imageFile == 'drugrx.png') {
                this.isProductImageAvailable = false;
            }
            else {
                this.isProductImageAvailable = true;
            }
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', 'Product ' + this.product.name + ' has been saved successfully!.');
        }
        else {
            alert('Error Occurred');
        }
    };
    AddEditProduct.prototype.saveProduct = function () {
        var _this = this;
        // alert(this.product.active);
        if (this.product.inInventory == 0) {
            var index = this.product.name.indexOf('(NEW*)');
            if (index < 0)
                this.product.name += "(NEW*)";
        }
        else {
            this.product.name = this.product.name.replace('(NEW*)', "");
        }
        //  if(this.uploadedFiles.length>0){
        //  this.product.imageFile = this.uploadedFiles[1];
        //   alert(this.product.imageFile);
        // }
        // alert(JSON.stringify(this.product))
        this._productService.post("addProduct", { "product": this.product }).then(function (res) { return _this.cb_addProduct(res); });
    };
    AddEditProduct.prototype.cb_addProduct = function (res) {
        if (res.isSuccess) {
            // alert(res.id);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', 'Product ' + this.product.name + ' has been added.');
            this._router.navigate(['dashboard/pharmacy-searchdrugs']);
        }
        else {
            alert('Error occured');
        }
    };
    AddEditProduct.prototype.changeCheckbox = function (event) {
        var isChecked = event.currentTarget.checked;
        if (isChecked) {
            this.product.active = 1;
        }
        else {
            this.product.active = 0;
        }
    };
    AddEditProduct.prototype.changeInventoryCheckbox = function (event) {
        if (this.product.price == 0) {
            alert('Please enter the price');
        }
        var isChecked = event.currentTarget.checked;
        if (isChecked) {
            this.product.inInventory = 1;
        }
        else {
            this.product.inInventory = 0;
        }
        // alert(this.product.addedBy)
    };
    AddEditProduct.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    AddEditProduct.prototype.dragFileAccepted = function (e) {
        var _this = this;
        setTimeout(function () {
            _this.upload();
        }, 300);
    };
    AddEditProduct.prototype.upload = function () {
        //  alert(this.uploader.queue.length)
        for (var _i = 0, _a = this.uploader.queue; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!item.isSuccess) {
                console.log("Uploading ..." + item._file);
                item.upload();
            }
        }
    };
    AddEditProduct.prototype.deleteProductImage = function (id) {
        var _this = this;
        if (id == 0) {
            this.product.imageFile = '';
            this.isProductImageAvailable = false;
            return;
        }
        var request = {
            id: id
        };
        this._productService.post("deleteProductImage", request).then(function (res) { return _this.cb_deleteProductImage(res); });
    };
    AddEditProduct.prototype.cb_deleteProductImage = function (res) {
        if (res.isSuccess) {
            // alert(res.id);
            com_common_service_alertservice_1.AlertService.getInstance().publishMessage('Success', 'Product ' + this.product.name + ' image has been deleted.');
            this.product.imageFile = '';
            this.isProductImageAvailable = false;
        }
        else {
            alert('Error occured');
        }
    };
    AddEditProduct = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'addproduct',
            templateUrl: 'com.ebiz.addeditproduct.html',
            providers: [com_common_sessiondata_1.SessionDataService, com_ebiz_service_productservice_1.ProductService, com_service_usermgmt_1.UserMgmtService, common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_2.Injector, com_service_userprofile_1.UserProfileService, router_2.ActivatedRoute, com_ebiz_service_productservice_1.ProductService, com_service_usermgmt_1.UserMgmtService, forms_1.FormBuilder])
    ], AddEditProduct);
    return AddEditProduct;
}(com_common_basic_basecomponent_1.BaseComponent));
exports.AddEditProduct = AddEditProduct;
//# sourceMappingURL=com.ebiz.addeditproduct.js.map