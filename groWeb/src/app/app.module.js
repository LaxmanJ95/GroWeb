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
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var common_1 = require('@angular/common');
var core_2 = require('@angular/core');
// Create config options (see ILocalStorageServiceConfigOptions) for deets:
var localStorageServiceConfig = {
    prefix: 'my-app',
    storageType: 'sessionStorage'
};
//----
var com_pharmacy_routing_js_1 = require('./com/pharmacy/com.pharmacy.routing.js');
var com_pharmacy_module_js_1 = require('./com/pharmacy/com.pharmacy.module.js');
//import { DashboardModule } from './com/dashboard/com.dashboard.module.js';
var com_usermgmt_module_js_1 = require('./com/usermgmt/com.usermgmt.module.js');
var com_usermgmt_routing_js_1 = require('./com/usermgmt/com.usermgmt.routing.js');
var com_home_module_js_1 = require('./com/home/com.home.module.js');
var com_common_module_js_1 = require('./com/common/com.common.module.js');
var playarea_module_js_1 = require('./com/zplayarea/playarea.module.js');
var com_common_service_config_configmanager_js_1 = require('./com/common/service/config/com.common.service.config.configmanager.js');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                com_common_module_js_1.CommonModule,
                //   DashboardModule,
                com_home_module_js_1.HomeModule,
                com_usermgmt_module_js_1.UserMgmtModule,
                com_pharmacy_module_js_1.PharmacyModule,
                playarea_module_js_1.PlayAreaModule,
                com_usermgmt_routing_js_1.UsermgmtRouting,
                com_pharmacy_routing_js_1.PharmacyRouting,
                app_routing_1.routing],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' },
                com_common_service_config_configmanager_js_1.ConfigService,
                {
                    provide: core_2.APP_INITIALIZER,
                    useFactory: function (config) { return function () { return config.load(); }; },
                    deps: [com_common_service_config_configmanager_js_1.ConfigService],
                    multi: true
                },
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map