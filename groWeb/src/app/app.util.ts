  
  import {ConfigService} from './com/common/service/config/com.common.service.config.configmanager.js';

  export class AppUtil {

  static initFactory(config: ConfigService) {
        //sessionStorage.clear();
       return () => config.load();
    }
  }