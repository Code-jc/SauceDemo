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
      this.ShoppingCartIcon = Selector('#shopping_cart_container');

      this.productList = Selector('.inventory_item'); //Item List
      this.addToCartButtons = Selector('button').withText('ADD TO CART'); //Add To Cart button list
   }

   async navigateToShoppingCart() {
      await t.click(this.ShoppingCartIcon);
   }
}

export default new ProductsPage();
