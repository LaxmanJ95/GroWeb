"use strict";
var router_1 = require('@angular/router');
//----------
var com_dashboard_1 = require('./com/pharmacy/dashboard/com.dashboard');
var com_home_main_1 = require('./com/home/main/ui/com.home.main');
var test_1 = require('./com/zplayarea/test');
exports.routing = router_1.RouterModule.forRoot([
    { path: '', component: com_home_main_1.HomeMainComponent },
    { path: 'home', component: com_home_main_1.HomeMainComponent },
    { path: 'dashboard', component: com_dashboard_1.DashboardComponent },
    { path: 'test', component: test_1.PlayAreaComponent },
    { path: '**', component: test_1.PlayAreaComponent },
], { useHash: true, preloadingStrategy: router_1.PreloadAllModules });
//# sourceMappingURL=app.routing.js.map