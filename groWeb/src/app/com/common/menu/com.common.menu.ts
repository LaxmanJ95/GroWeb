import { Component } from '@angular/core';
import {FormComponent} from '../../common/basic/com.common.basic.formcomponent';
import {Injector} from '@angular/core';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';
import { RestApiService } from '../service/restapi/com.common.service.restapiservice';
@Component({
  moduleId:module.id,
  selector: 'my-menu',
  styleUrls:['com.common.menu.css'],
  templateUrl: 'com.common.menu.html',
  providers:[RestApiService]
})
export class Menu extends FormComponent{
    roleId:number;
    userId: number = 0;
    categories:any;
    subCategories:any;
    
     constructor(injector:Injector, private _userProfileService: UserProfileService,
    private _restService:RestApiService) {
       
          super(injector);
          this.getCategory();
          this.userId = this._userProfileService.getUserId();
          var userProfile = this._sessionStorageService.getObject("userProfile");
        //  alert(userProfile)
        var role = this._sessionStorageService.getObject("roleId");
        if(role != null ){
          this.roleId = userProfile["roleId"];
          this._loggingService.logDebug(this.getName(), "User RoleId"+this.roleId);
          this.roleId = role;
        }
        else{
          this.roleId = 5;
        }

     }
     cb_getCategory(res){
      this.categories = res.categories;
      this.getSubCategory();
    }
    getCategory(){
      this._restService.get('/product/getCategories').then(res=>this.cb_getCategory(res))
    }
    cb_getSubCategory(res){
      this.subCategories = res.categories;
    }
    getSubCategory(){
      this._restService.get('/product/getSubCategories').then(res=>this.cb_getSubCategory(res))
    }

 }
