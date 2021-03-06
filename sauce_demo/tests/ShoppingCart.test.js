import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CheckoutInformationPage from '../pages/CheckoutInfoPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import FinishPage from '../pages/FinishPage';
import { CREDENTIALS } from '../data/Constants';

fixture('Shopping Cart fixture testing').page`https://www.saucedemo.com/`;

test('User is able to navigate to the Shopping Cart page.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );

   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok()
          .click(ProductsPage.ShoppingCartIcon);

   await t
      .expect(ShoppingCartPage.headerTitle.exists).ok()
      .expect(ShoppingCartPage.quantityLabel.exists).ok()
      .expect(ShoppingCartPage.descriptionLabel.exists).ok()
      .expect(ShoppingCartPage.continueShoppingButton.exists).ok()
      .expect(ShoppingCartPage.checkoutButton.exists).ok();
});



test('User adds a Single Item to the cart.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();

   //Get single item randomly
   const itemsCount = await ProductsPage.addToCartButtons.count; //Get product list
   let productItem = Math.floor(Math.random() * itemsCount); //Select random item of the list
   await t.click(ProductsPage.addToCartButtons.nth(productItem)); //Add the item into the cart

   //Validate Product is correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(1); //Single element should be added to the cart
});


test('User adds Multiple Items to the cart.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();

   //Get the count of all items displayed on the page
   let totalItemsCount = await ProductsPage.addToCartButtons.count;

    // Add all items of the Products Page into the Cart 
   for (let i = 1; i <= totalItemsCount; i++) {   
      await t.click(ProductsPage.addToCartButtons.nth(0));     
   }

   //Validate Products are correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(totalItemsCount); //All items should be added to the cart
});

test('Error message displayed when user information is missing.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();
   

   // Add 3 items from the Products Page into the Cart
   for (var index = 0; index <= 2; index++) {
      await t.click(ProductsPage.addToCartButtons.nth(index));
   }

   //Validate Products are correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(3); //3 items should be added to the cart

   //Checkout Products
   ShoppingCartPage.checkOut();

   await t.expect(CheckoutInformationPage.headerTitle.exists).ok();

   //Validate Error Message for: Fist Name field is required
   CheckoutInformationPage.fillOutUserInformation('', 'test_lastName', '12345') //first name is empty
   CheckoutInformationPage.continueWithOrder();
   await t.expect(CheckoutInformationPage.fistNameIsRequired.exists).ok();

   //Reload the page to clear the text fields
   await t.eval(() => location.reload());

   //Validate Error Message for: Last Name field is required
   CheckoutInformationPage.fillOutUserInformation('test_name' , '', '12345') //last name is empty
   CheckoutInformationPage.continueWithOrder();
   await t.expect(CheckoutInformationPage.lastNameIsRequired.exists).ok();

   //Reload the page to clear the text fields
   await t.eval(() => location.reload());

   //Validate Error Message for: Postal Code field is required
   CheckoutInformationPage.fillOutUserInformation('test_name' , 'test_lastName', '') //postal code is empty
   CheckoutInformationPage.continueWithOrder();
   await t.expect(CheckoutInformationPage.postalCodeIsRequired.exists).ok();
   
});

test("Fill user's information and navigates to the Overview Page.", async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();
   // Add 3 items from the Products Page into the Cart
   for (var index = 0; index <= 2; index++) {
      await t.click(ProductsPage.addToCartButtons.nth(index));
   }

   //Validate Products are correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(3); //3 items should be added to the cart

   //Checkout Products
   ShoppingCartPage.checkOut();
   await t.expect(CheckoutInformationPage.headerTitle.exists).ok();

   //Fill out the User information
   CheckoutInformationPage.fillOutUserInformation('Carlos', 'Guerra', '45110') //first name is empty
   CheckoutInformationPage.continueWithOrder();
   
   //Validate Overview page elements
    CheckoutOverviewPage.validateOverviewPage();


});   

//To Do

//Finalize order
test('User is able to finalize the order.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();
   
   //All items will be added
   let totalItemsCount = await ProductsPage.addToCartButtons.count;

   let itemNameProductPage = new Array(totalItemsCount);
   let itemDescriptionProductPage =  new Array(totalItemsCount);
   let totalItemPriceProductPage = new Array(totalItemsCount);
   
   //Get element information and add it to the cart
   for (let i = 0; i <= totalItemsCount -1; i++) { 
            itemNameProductPage[i] = await ProductsPage.itemName.nth(i).innerText;
            itemDescriptionProductPage[i] = await ProductsPage.itemDescription.nth(i).innerText;
            totalItemPriceProductPage[i] = await ProductsPage.itemPrice.nth(i).innerText;

      await t.click(ProductsPage.addToCartButtons.nth(0));     
   }
   
   //Validate items on the overview page match with the added items
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(totalItemsCount); 

   let itemNameShoppingCart = new Array(cartItemsCount);
   let itemDescriptionShoppingCart =  new Array(cartItemsCount);
   let totalItemPriceShoppingCart = new Array(cartItemsCount);
   let totalPrice;

    for (let i = 0; i <= cartItemsCount -1; i++) { 
         //Get the text of the item on the ShoppingCart
            itemNameShoppingCart[i] = await ProductsPage.itemName.nth(i).innerText;
            itemDescriptionShoppingCart[i] = await ProductsPage.itemDescription.nth(i).innerText;
            totalPrice = await ProductsPage.itemPrice.nth(i).innerText;
            totalItemPriceShoppingCart[i] = '$' + totalPrice;

         //Compare the item selected on Product Page versus the item added into the Shopping Cart
            await t.expect(itemNameProductPage[i]).eql(itemNameShoppingCart[i]); 
            await t.expect(itemDescriptionProductPage[i]).eql(itemDescriptionShoppingCart[i]);
            await t.expect(totalItemPriceProductPage[i]).eql(totalItemPriceShoppingCart[i]); 
   }
   

   //Checkout Products
   ShoppingCartPage.checkOut();
   await t.expect(CheckoutInformationPage.headerTitle.exists).ok();

   //Fill out the User information
   CheckoutInformationPage.fillOutUserInformation('Carlos', 'Guerra', '45110') //first name is empty
   CheckoutInformationPage.continueWithOrder();
   
   //Validate Overview page elements
    CheckoutOverviewPage.validateOverviewPage();
});   


test('User completes a purchase and navigates to the Confirmation page.', async t => {
   await LoginPage.submitLoginForm(
      CREDENTIALS.VALID_USER.USERNAME,
      CREDENTIALS.VALID_USER.PASSWORD
   );
   await t.expect(ProductsPage.ShoppingCartIcon.exists).ok();
   // Add 3 items from the Products Page into the Cart
   for (var index = 0; index <= 2; index++) {
      await t.click(ProductsPage.addToCartButtons.nth(index));
   }

   //Validate Products are correctly added to Shopping cart
   await ProductsPage.navigateToShoppingCart();
   const cartItemsCount = await ShoppingCartPage.cartItems.count;
   await t.expect(cartItemsCount).eql(3); //3 items should be added to the cart

   //Checkout Products
   ShoppingCartPage.checkOut();
   await t.expect(CheckoutInformationPage.headerTitle.exists).ok();

   //Fill out the User information
   CheckoutInformationPage.fillOutUserInformation('Carlos', 'Guerra', '45110') //first name is empty
   CheckoutInformationPage.continueWithOrder();
   
   //Validate Overview page elements
   CheckoutOverviewPage.validateOverviewPage();

   //Validate Finish page
   FinishPage.validateFinishPage();
   


});   
