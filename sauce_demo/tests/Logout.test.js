import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Logout fixture testing').page`https://www.saucedemo.com/`;

test('Logout, user navigates to the Login page.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.productsTitle.exists).ok();

   await t
      .click(ProductsPage.menuIcon)
      .click(ProductsPage.logout)
      .expect(LoginPage.loginButton.exists)
      .ok();
});
