import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,Router} from '@angular/router';
import {SessionStorageService} from '../../common/service/com.common.sessionstorage';
import {UserProfileService} from '../../usermgmt/service/com.service.userprofile';

class Permissions {
  canActivate(role): boolean {
   if(role < 3)
      return true;
   else
      return false;
  }
}
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  userId:number = 0;
  roleId:number;
constructor(
private _sessionStorageService : SessionStorageService,
private _userProfileService : UserProfileService,
private _router: Router,){
      
    }

  canActivate() {
    console.log('checking  route access');
    this.roleId = this._sessionStorageService.getObject("roleId");
    this.userId= this._userProfileService.getUserId();
     //alert("child "+this.userId);
    if(this.userId != 0 && this.roleId < 3)
            return true;        
    else{
        return false;
    }
    
  }

  canActivateChild() {
    alert(this.roleId)
    console.log('checking child route access');
    this.roleId = this._sessionStorageService.getObject("roleId");
    alert(this.roleId)
    if(this.roleId != null && this.roleId < 3)
      return true;
    else
      return false;
        
  }

  canActivateByRole(){
    this.roleId = this._sessionStorageService.getObject("roleId");
    if(this.roleId != null && this.roleId < 3)
      return true;
    else
      return false;
  }

}