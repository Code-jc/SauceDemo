import { Selector, t } from 'testcafe';

class ProductsPage {
   constructor() {
      //Sidebar elements
      this.menuIcon = Selector('#react-burger-menu-btn');
      this.about = Selector('#about_sidebar_link');
      this.logout = Selector('#logout_sidebar_link');
      this.resetAppState = Selector('#reset_sidebar_link');

      //Products page elements
      this.productsTitle = Selector('.product_label');
      this.ShoppingCartIcon = Selector('.shopping_cart_link.fa-layers.fa-fw');
                        

      this.productList = Selector('.inventory_item'); //Item List
      this.addToCartButtons = Selector('.btn_primary.btn_inventory');

      //Product Details
      this.itemName = Selector('.inventory_item_name');
      this.itemDescription = Selector('.inventory_item_desc');
      this.itemPrice = Selector('.inventory_item_price');

   }

   async navigateToShoppingCart() {
      await t.click(this.ShoppingCartIcon);
   }

}

export default new ProductsPage();
