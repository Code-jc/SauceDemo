import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Login fixture testing').page`https://www.saucedemo.com/`;

test('Users can login using valid credentials.', async t => {
   
   
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );


   await t
         .expect(ProductsPage.productsTitle.exists).ok();
});

test('Users can not login using invalid credentials.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.INVALID_USER.USERNAME,
      CREDENTIALS.INVALID_USER.PASSWORD
   );
   await t.expect(LoginPage.errorMessage.exists).ok();
});
