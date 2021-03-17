import { Selector, t } from 'testcafe';

class CheckoutOverviewPage {
    constructor(){
        //Static elements of the page
        this.headerTitle = Selector('div').withText('Checkout: Your Information');
        this.quantityLabel = Selector('.cart_quantity_label');
        this.descriptionLabel = Selector('.cart_desc_label');
        this.paymentInfoLabel = Selector('div').withText('Payment Information:');
        this.shippingInfoLabel = Selector('div').withText('Shipping Information:');
        this.itemTotalLabel = Selector('.summary_subtotal_label');
        this.taxLabel = Selector('.summary_tax_label');
        this.totalLabel = Selector('.summary_total_label');
        this.cancelButton = Selector('.cart_cancel_link btn_secondary');
        this.finishButton = Selector('.btn_primary.cart_button');

        //Item list

    }

    async validateOverviewPage(){
            await t.expect(this.headerTitle.exists).ok();
            await t.expect(this.quantityLabel.exists).ok();
            await t.expect(this.descriptionLabel.exists).ok();
            await t.expect(this.paymentLabel.exists).ok();
            await t.expect(this.shippingInfoLabel.exists).ok();
            await t.expect(this.itemTotalLabel.exists).ok();
            await t.expect(this.taxLabel.exists).ok();
            await t.expect(this.totalLabel.exists).ok();
            await t.expect(this.cancelButton.exists).ok();
            await t.expect(this.finishButton.exists).ok();
    }

    async validateProducts (){

    }


}
export default new CheckoutOverviewPage();





