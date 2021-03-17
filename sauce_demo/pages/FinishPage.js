import { Selector, t } from 'testcafe';

class FinishPage {
    constructor (){
         this.headerTitle = Selector('div').withText('Finish');
         this.thanksHeaderText = Selector('.complete-header');
         this.orderDispatchedText = Selector('.complete-text');
         this.ponyExpressImage = Selector('.pony_express');
    };


    async validateFinishPage (){

        await t
            .expect(this.headerTitle.exists).ok()
            .expect(this.thanksHeaderText.exists).ok()
            .expect(this.orderDispatchedText.exists).ok()
            .expect(this.ponyExpressImage.exists).ok()
    }

}

export default new FinishPage();