import {Injector} from '@angular/core';
import {LoggingService} from './../../common/service/logging/com.common.service.logging';
import {ConfigService} from './../../common/service/config/com.common.service.config.configmanager';
import { Router ,Route} from '@angular/router';
import {BaseComponent} from './com.common.basic.basecomponent';

export class FormComponent extends BaseComponent {
    protected  _router: Router;
   // protected _route : Route;

    constructor(injector:Injector) {
          super(injector);
          console.log("base component loaded");

          this._router = injector.get(Router);
        //  this._route = injector.get(Route;
    }


}