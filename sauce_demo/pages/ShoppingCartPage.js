import { Selector, t } from 'testcafe';

class ShoppingCartPage {
   constructor() {
      this.headerTitle = Selector('.subheader'); //.withText('Your Cart');
      this.shoppingCartIcon = Selector('#shopping_cart_link fa-layers fa-fw');
      this.quantityLabel = Selector('.cart_quantity_label');
      this.productLabel = Selector('.cart_desc_label');
      this.continueShoppingButton = Selector('.btn_secondary');
      this.checkoutButton = Selector('.btn_action.checkout_button');
   }
}

export default new ShoppingCartPage();
