import {Router , RouterModule, PreloadAllModules } from '@angular/router';

//----------
import { DashboardComponent }   from './com/pharmacy/dashboard/com.dashboard';
import { HomeMainComponent }   from './com/home/main/ui/com.home.main';
import {HomeSearchComponent} from './com/home/main/ui/com.searchhome'
import {SearchProduct} from './com/pharmacy/searchproduct/com.ebiz.searchproduct';

export const routing = RouterModule.forRoot([
 //   {path: 'login', component: HomeMainComponent},
    {path: 'home', component: HomeMainComponent},
    {path:'',component: SearchProduct},
    {path: 'login', component:HomeMainComponent},
    {path: 'dashboard', component: DashboardComponent}
], { useHash: true , preloadingStrategy:PreloadAllModules});
