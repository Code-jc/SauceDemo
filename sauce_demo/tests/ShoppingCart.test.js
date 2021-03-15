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
      .expect(ShoppingCartPage.quantityLabel.exists)
      .ok()
      .expect(ShoppingCartPage.descriptionLabel.exists)
      .ok()
      .expect(ShoppingCartPage.continueShoppingButton.exists)
      .ok()
      .expect(ShoppingCartPage.checkoutButton.exists)
      .ok();
});

test('User adds a Single Item to the cart', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();

   //Get single item randomly
   const itemsCount = await ProductsPage.addToCartButtons.count; //Get product list
   let productItem = Math.floor(Math.random() * itemsCount); //Select random item of the list
   console.log('Product Item Number ' + productItem);
   await t.click(ProductsPage.addToCartButtons.nth(productItem)); //Add the item into the cart

   //Validate Product is correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(1); //Single element should be added to the cart
});

test('User adds Multiple Items to the cart', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();
   await t.wait(5000);

   const itemsCountProducts = await ProductsPage.addToCartButtons.count;

   for (var index = 0; index <= itemsCountProducts - 1; index++) {
      await t.click(ProductsPage.addToCartButtons.nth(index));
   }

   //Validate Product is correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(itemsCountProducts); //Single element should be added to the cart
});
