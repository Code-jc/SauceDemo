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
   }
}

export default new ProductsPage();
