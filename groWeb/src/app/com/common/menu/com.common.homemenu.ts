import { Component } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';

@Component({
  moduleId:module.id,
  selector: 'home-menu',
  styleUrls:['com.common.menu.css'],
  templateUrl: 'com.common.homemenu.html'
})
export class HomeMenu extends FormComponent{

     constructor(injector:Injector) {
          super(injector);

     }

 }
