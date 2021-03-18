import LoginPage from '../pages/LoginPage';
import { Role, Selector } from 'testcafe';


const adminRole = Role(async t => {
    //Not implemented at this time
});

const standardUserRole = Role( async t => {
  
    await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );

});

const locked_out_user = Role(async t => {
     await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );

});

const problem_user = Role(async t => {});

const performance_glitch_user = Role(async t => {});

export default new Role
