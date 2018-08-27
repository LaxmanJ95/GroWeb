import { Injectable } from '@angular/core';
import {SessionDataService} from './com.common.sessiondata'
@Injectable()
export class SessionStorageService {
    data={};
    isStorage=true;


    isStorageSupported() {
        var testKey = 'test', storage = window.sessionStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    constructor(){
       if(this.isStorageSupported()){
            this.isStorage=true;
       }else{
            this.isStorage=false;
       }

         console.log("Session Storage loaded..private browsing.."+this.isStorage);
    }
    private setItem (key, valueObj){
      //  sessionStorage.setItem(key,valueObj);
    //  this.data[key]=valueObj;
       if(this.isStorage){
           sessionStorage.setItem(key,valueObj);
       }else{
           SessionDataService.init().setData(key,valueObj);
       }
       
    }
    private getItem(key){
        //return sessionStorage.getItem(key);
     //   return this.data[key];
      //  return SessionDataService.init().getData(key);

       if(this.isStorage){
           return sessionStorage.getItem(key);
       }else{
           return SessionDataService.init().getData(key);
       }
    }
    setObject (key, valueObj){
       
       // alert(sessionStorage+".isPrivateBrowsing->"+this.isStorage);
        //if (typeof sessionStorage === 'object') {
       if(this.isStorage){
           sessionStorage.setItem(key,JSON.stringify(valueObj));
       }else{
         // sessionStorage.setItem(key,valueObj);
         SessionDataService.init().setData(key,valueObj);
          
         //  alert(sessionStorage.getItem(key));
       }
       //  this.data[key]=valueObj;
      //   alert(this.data[key]);
      //  this.data[key]=JSON.stringify(valueObj);
       // sessionStorage.setItem(key,JSON.stringify(valueObj));
    }
    getObject(key){
       // return JSON.parse(sessionStorage.getItem(key));
      // return JSON.parse(this.data[key]);
       // return this.data[key];
       if(this.isStorage){
           return JSON.parse(sessionStorage.getItem(key));
          
       }else{
        //   alert(sessionStorage.getItem(key))
         //  if(sessionStorage.getItem(key)!='')
       //  alert(key+","+JSON.stringify(sessionStorage.getItem(key)));
     //  alert(sessionStorage.getItem(key));
       return SessionDataService.init().getData(key);
            // return sessionStorage.getItem(key);
         //  else
         //    return null
       }
    }
    clear(){
       // SessionDataService.init().clear();
      //  var data = sessionStorage.getItem("configData");
       if(this.isStorage){
             sessionStorage.clear();
       }else{
         
       }
      //  sessionStorage.setItem("configData",JSON.stringify(data));

    }
  /*  setObjectInLocalStorage(key, valueObj){
        localStorage.setItem(key,JSON.stringify(valueObj));
    }
    getObjectFromLocalStorage(key){
        return JSON.parse(localStorage.getItem(key));
    }*/
}