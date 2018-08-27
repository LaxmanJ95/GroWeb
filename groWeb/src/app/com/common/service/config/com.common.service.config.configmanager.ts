import { Http ,ConnectionBackend} from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { ReflectiveInjector,Injectable } from '@angular/core';
import {SessionDataService} from '../com.common.sessiondata'

@Injectable()
export class ConfigService {
    private Server:string = "";
    private AppKey = "";
    private configData: any;
  //  _http: Http;
    constructor(private _http:Http) {
        console.log("Config constructor loaded..");
    }


    public load( ) {

   //  var injector = ReflectiveInjector.resolveAndCreate([
                   //         Http
                  //          ]);
     //  this._http=injector.get(Http);
        return new Promise((resolve, reject) => {
            var host = window.location.host;
            console.log("Domain22 .."+ this.getDomain());
           // alert(1)
           console.log("config file loading.."+'app/config/'+this.getDomain()+'.config.json');
            this._http.get('app/config/'+this.getDomain()+'.config.json')  // path of your config.json file
            
            .map(res => res.json())
            .subscribe(
                (data:any) => {
                this.Server = data.server;
                this.AppKey = data.appkey;
                this.configData = data;
               // aelr
               SessionDataService.init().setData("configData",data);
               // alert(SessionDataService.init().getData("configData"));
             //   sessionStorage.setItem("configData",JSON.stringify(data));
              //  alert(sessionStorage.getItem("configData"));
               // sessionStorage.setObject("configData",data);
            //   console.log("[ConfigService]>>config file loaded successfully2.."+sessionStorage.getItem("configData"));

                resolve(true);
                },
                err=>console.log(err)
            );
        });
    }
    getDomain(){
        var host = window.location.host;
        let domain = host.split(":");
        return domain[0];
    }
    public getServer(){
        return  this.Server;
    }

    public getAppKey(){
           return  this.AppKey;
    }
    public getProperty(key:string){
        return this.configData[key];
    }
  }