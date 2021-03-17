import { Selector, t } from 'testcafe';
import { CREDENTIALS } from '../data/Constants';

class CheckoutInformationPage {
   constructor() {
      this.headerTitle = Selector('div').withText('Checkout: Your Information');
      this.firstNameField = Selector('#first-name');
      this.lastNameField = Selector('#last-name');
      this.postalCodeField = Selector('#postal-code');
      this.cancelButton = Selector('.cart_cancel_link btn_secondary');
      this.continueButton = Selector('.btn_primary.cart_button');

      //Error Messages
      this.fistNameIsRequired = Selector('h3').withText('First Name is required');
      this.lastNameIsRequired = Selector('h3').withText('Last Name is required');
      this.postalCodeIsRequired = Selector('h3').withText('Postal Code is required');
   }

   async fillOutUserInformation(firstName, lastName, postalCode) {
      
      if (firstName === ''){
          await t
            .typeText(this.lastNameField, lastName)
            .typeText(this.postalCodeField, postalCode)  
      }
      else
      if (lastName === ''){
          await t 
            .typeText(this.firstNameField, firstName)
            .typeText(this.postalCodeField, postalCode)  
      }
      else
      if (postalCode === ''){
          await t
            .typeText(this.firstNameField, firstName)
            .typeText(this.lastNameField, lastName)
      }

      else {
         await t
            .typeText(this.firstNameField, firstName)
            .typeText(this.lastNameField, lastName)
            .typeText(this.postalCodeField, postalCode) 
      }
        
   }

   async continueWithOrder() {
      await t.click(this.continueButton);
   }

   async cancelOrder() {
      await t.click(this.cancelButton);
   }
}

export default new CheckoutInformationPage();
