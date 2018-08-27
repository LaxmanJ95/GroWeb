import {Router , RouterModule } from '@angular/router';

//----------

import { SignUpComponent }   from './signup/ui/com.usermgmt.signup';
import { ConfirmSignUpComponent }   from './signup/ui/com.usermgmt.signup.confirm';
import { SignUpSuccessComponent }   from './signup/ui/com.usermgmt.signup.success';
import { SignUpErrorComponent }   from './signup/ui/com.usermgmt.signup.error';
import {ForgotUsername} from './forgot/com.usermgmt.forgotusername';
import {ForgotPassword} from './forgot/com.usermgmt.forgotpassword';
import {BusinessInfoComponent} from './businessInfo/com.usermgmt.businessInfo'

export const UsermgmtRouting = RouterModule.forChild([
    {path: 'signup', component: SignUpComponent},
    {path: 'confirmsignup', component: ConfirmSignUpComponent},
    {path: 'usermgmt.signup.success', component: SignUpSuccessComponent},
    {path: 'usermgmt.signup.error', component: SignUpErrorComponent} ,
    {path: 'forgot-username', component: ForgotUsername},
    {path: 'forgot-password', component: ForgotPassword},
    {path: 'businessInfo', component: BusinessInfoComponent}
]);