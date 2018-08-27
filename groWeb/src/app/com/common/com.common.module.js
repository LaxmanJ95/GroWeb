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
var com_common_header_1 = require('./header/com.common.header');
var com_common_footer_1 = require('./footer/com.common.footer');
var com_common_menu_1 = require('./menu/com.common.menu');
var com_common_homemenu_1 = require('./menu/com.common.homemenu');
var com_usermgmt_userheader_1 = require('./userheader/com.usermgmt.userheader');
var com_common_cartcount_1 = require('./cartcount/com.common.cartcount');
var com_common_alert_1 = require('./alert/com.common.alert');
var router_1 = require('@angular/router');
//import {UserMgmtModule} from '../usermgmt/com.usermgmt.module'
var CommonModule = (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule],
            declarations: [com_common_header_1.HeaderComponent, com_common_footer_1.FooterComponent, com_usermgmt_userheader_1.UserHeader, com_common_cartcount_1.CartCount, com_common_menu_1.Menu, com_common_homemenu_1.HomeMenu, com_common_alert_1.Alert],
            exports: [com_common_header_1.HeaderComponent, com_common_footer_1.FooterComponent, com_usermgmt_userheader_1.UserHeader, com_common_cartcount_1.CartCount, com_common_menu_1.Menu, com_common_homemenu_1.HomeMenu, com_common_alert_1.Alert]
        }), 
        __metadata('design:paramtypes', [])
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;
//# sourceMappingURL=com.common.module.js.map