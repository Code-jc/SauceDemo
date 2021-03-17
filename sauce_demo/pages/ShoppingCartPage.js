import { Selector, t } from 'testcafe';

class ShoppingCartPage {
   constructor() {
      this.headerTitle = Selector('.subheader'); //.withText('Your Cart');
      this.shoppingCartIcon = Selector('#shopping_cart_container');
      this.quantityLabel = Selector('.cart_quantity_label');
      this.descriptionLabel = Selector('.cart_desc_label');
      this.continueShoppingButton = Selector('.btn_secondary');
      this.checkoutButton = Selector('a.btn_action.checkout_button');

      //Cart Items
      this.cartItems = Selector('.cart_item');
   }
    
    async continueShopping (){
        await t.click(this.continueShoppingButton);    } 

   async checkOut (){
       await t.click(this.checkoutButton);
      

   }


}

export default new ShoppingCartPage();
