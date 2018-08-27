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
var http_1 = require('@angular/http');
var http_2 = require('@angular/http');
var http_3 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
var com_common_service_config_configmanager_1 = require('./../../common/service/config/com.common.service.config.configmanager');
var com_common_service_logging_1 = require('./../../common/service/logging/com.common.service.logging');
var SearchDrugsService = (function () {
    function SearchDrugsService(_http, _router, _loggingService, _configService) {
        this._http = _http;
        this._router = _router;
        this._loggingService = _loggingService;
        this._configService = _configService;
        this.initURL(_configService);
        //console.log( "APIService"+_configService.getProperty("APIService"));
    }
    SearchDrugsService.prototype.initURL = function (_configService) {
        URL = _configService.getProperty("APIService");
        this.SEARCH_DRUG_URL = URL + "/pharmacy/searchDrugs";
        this.VIEW_DRUG_URL = URL + "/pharmacy/viewdrug";
    };
    SearchDrugsService.prototype.searchDrugs = function (request) {
        return this._http.post(this.SEARCH_DRUG_URL, JSON.stringify(request), this.getHeaderOptions())
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    SearchDrugsService.prototype.viewDrug = function (drugId) {
        return this._http.get(this.VIEW_DRUG_URL + "/" + drugId, this.getHeaderOptions())
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    SearchDrugsService.prototype.getHeaderOptions = function () {
        var headers = new http_2.Headers({
            'Content-Type': 'application/json'
        });
        var options = new http_3.RequestOptions({
            headers: headers
        });
        return options;
    };
    SearchDrugsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, com_common_service_logging_1.LoggingService, com_common_service_config_configmanager_1.ConfigService])
    ], SearchDrugsService);
    return SearchDrugsService;
}());
exports.SearchDrugsService = SearchDrugsService;
//# sourceMappingURL=com.pharmacy.service.drugservice.js.map