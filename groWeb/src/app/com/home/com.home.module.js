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
//========
var com_common_module_1 = require('../common/com.common.module');
var com_usermgmt_login_1 = require('./../usermgmt/login/ui/com.usermgmt.login');
//import { LoginComponent }   from 'app/com/usermgmt/login/ui/com.usermgmt.login';
var com_home_main_1 = require('./main/ui/com.home.main');
var com_home_contentbox_1 = require('./contentbox/ui/com.home.contentbox');
var HomeModule = (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, com_common_module_1.CommonModule],
            declarations: [com_home_contentbox_1.ContentBoxComponent, com_usermgmt_login_1.LoginComponent, com_home_main_1.HomeMainComponent],
            exports: [com_home_contentbox_1.ContentBoxComponent, com_usermgmt_login_1.LoginComponent, com_home_main_1.HomeMainComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=com.home.module.js.map