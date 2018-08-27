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
require('rxjs/add/operator/toPromise');
var com_common_basic_baseservice_1 = require('../../common/basic/com.common.basic.baseservice');
var core_2 = require('@angular/core');
var FileService = (function (_super) {
    __extends(FileService, _super);
    function FileService(injector) {
        _super.call(this, injector);
        this.GET_FILES_BY_CART_ID_URL = this._APIURL + "/upload/getPrescriptionsByCartId";
        this.GET_FILES_BY_ORDER_ID_URL = this._APIURL + "/upload/getPrescriptionsByOrderId";
    }
    FileService.prototype.getFilesByCartId = function (id) {
        return this._http.get(this.GET_FILES_BY_CART_ID_URL + "/" + id, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    FileService.prototype.getFilesByOrderIdAndCartId = function (orderId, cartId) {
        return this._http.get(this.GET_FILES_BY_ORDER_ID_URL + "/" + orderId + "/" + cartId, this._httpHeaderOptions)
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    FileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_2.Injector])
    ], FileService);
    return FileService;
}(com_common_basic_baseservice_1.BaseService));
exports.FileService = FileService;
//# sourceMappingURL=com.ebiz.service.fileservice.js.map