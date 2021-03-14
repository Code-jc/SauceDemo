import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Shopping Cart fixture testing').page`https://www.saucedemo.com/`;

test('User is able to navigate to the Shopping Cart page', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();
   await t.click(ProductsPage.ShoppingCartIcon);
   await t
      .expect(ShoppingCartPage.headerTitle.exists)
      .ok()
      .expect(ShoppingCartPage.continueShoppingButton.exists)
      .ok()
      .expect(ShoppingCartPage.checkoutButton.exists)
      .ok();
});
