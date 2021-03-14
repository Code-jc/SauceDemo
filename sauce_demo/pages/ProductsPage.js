import { Selector, t } from 'testcafe';

class ProductsPage {
   constructor() {
      this.menuIcon = Selector('#react-burger-menu-btn');
      this.productsTitle = Selector('.product_label');
   }
}

export default new ProductsPage();
