import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {Injector} from '@angular/core';
//-----
import {UserExt} from '../../model/com.usermgmt.user.model'
import { UserMgmtService } from '../../service/com.service.usermgmt'
import {SessionStorageService} from '../../../common/service/com.common.sessionstorage';
import {BaseComponent} from '../../../common/basic/com.common.basic.basecomponent';

@Component({
  moduleId:module.id,
  selector: 'login',
  templateUrl: 'com.usermgmt.newlogin.html',
  styleUrls: ['../styles/com.usermgmt.login.css'],
  providers: [UserMgmtService,SessionStorageService]

})
export class LoginComponent extends BaseComponent{
  loginFailed :boolean = false;
  userName:string='';
  constructor(private _router: Router,
    private _userMgmtService: UserMgmtService,
         injector:Injector) {
          super(injector); 
          //this.getLoggedUser();
          console.log('ngConstructor()')
  }

  onSubmit(f: NgForm) {
  
    this._sessionStorageService.clear();
    this._userMgmtService.login(f.value).then(res => this.cb_login(res))

  }

  cb_login(res) {
    if (res.isSuccess) {
    //   alert(res.userProfile.userExt);
      if(res.userProfile.userExt==null){
       
        var userExt = new UserExt();
        userExt.profileImageUrl='app/img/profile-avatar.png';
        res.userProfile.userExt = userExt;

      }
      this._sessionStorageService.setObject("userProfile",res.userProfile);
      this._sessionStorageService.setObject("roleId",res.userProfile.roleId)
      this._loggingService.logInfo(this.getName(),"User Profile:"+JSON.stringify(this._sessionStorageService.getObject("userProfile")))
     // alert(JSON.stringify(res.userProfile.address))
      // if(res.userProfile.address){
        this._router.navigate(['dashboard/grocery-products'])
      // }else{
      //   this._router.navigate(['dashboard/user-profile'])
      // }
    } else {
    //  this._router.navigate([''])
      this.loginFailed = true;
    }

  }
  inputFocus(){
    this.loginFailed=false;
  }
  getLoggedUser(){
        var userProfileObj = this._sessionStorageService.getObject("userProfile");
        var userName;
        if(userProfileObj){
            userName = userProfileObj["firstName"];
        }
        if(userName!=null){
            this.userName=userName;
        }
  }
  
/*
   ngOnInit() {
    // Properties are resolved and things like
    // this.mapWindow and this.mapControls
    // had a chance to resolve from the
    // two child components <map-window> and <map-controls>
    console.log('ngOnInit()')
  }
  ngOnDestroy() {
    // Speak now or forever hold your peace
    console.log('ngOnDestroy()')
  }
  ngDoCheck() {
    // Custom change detection
    console.log('ngDoCheck()')
  }
  ngOnChanges(changes) {
    // Called right after our bindings have been checked but only
    // if one of our bindings has changed.
    //
    // changes is an object of the format:
    // {
    //   'prop': PropertyUpdate
    // }
    console.log('ngOnChanges()')
  }
  ngAfterContentInit() {
    // Component content has been initialized
    console.log('ngAfterContentInit()')
  }
  ngAfterContentChecked() {
    // Component content has been Checked
    console.log('ngAfterContentChecked()')
     this.getLoggedUser();
  }
  ngAfterViewInit() {
    // Component views are initialized
    console.log('ngAfterViewInit()')
  }
  ngAfterViewChecked() {
    // Component views have been checked
     console.log('ngAfterViewChecked()')
  }*/
}