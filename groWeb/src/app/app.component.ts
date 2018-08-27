import { Component } from '@angular/core';
//import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import {Router} from "@angular/router";
import {SessionStorageService} from './com/common/service/com.common.sessionstorage'

@Component({
 moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'myapp.template.html'
})
export class AppComponent {
    name = "Raj";
  //   private idleState = 'Not started.';
  //   private timedOut = false;
  //   private isIdle:boolean;
  //   private idleEndCount = 0;
  //   private idleStartCount = 0;
  //   private idleTimeoutCount = 0;
  //   private idleTimeoutWarningCount = 0;
    
    
  //   constructor(private idle: Idle,private router:Router,private sessionStorage: SessionStorageService,) {
    
  //   idle.setIdle(15*60);
  //   // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
  //   idle.setTimeout(10);
  //   // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
  //   idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

  //   idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
  //   idle.onTimeout.subscribe(() => {
  //     this.idleState = 'Timed out!';
  //     this.timedOut = true;
  //     this.sessionStorage.clear();
  //     this.router.navigate(['/home'])
  //       });
  //   idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
  //   idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

  //   // sets the ping interval to 15 seconds


  //   this.reset();
  // }

  // reset() {
  //   this.idle.watch();
  //   this.idleState = 'Started.';
  //   this.timedOut = false;
  // }
  
 }

