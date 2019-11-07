import Phaser from 'phaser';

class Hunt {
    constructor(scene) {
        this.scene = scene;
        this.minAmount = 1;
        this.maxAmount = 5;
    }

    goHunting() {
        this.scene.goHuntButton.setText('');
        this.scene.pet.setActive(false).setVisible(false);
        this.scene.time.addEvent({
            delay: 2000,
            callback: this.increaseMoneyValue,
            callbackScope: this,
            loop: false,
        });
    }

    increaseMoneyValue() {
        this.scene.moneyAmount += Phaser.Math.Between(this.minAmount, this.maxAmount) * this.scene.strength;
        this.updateMoneyAmount();
    }

    updateMoneyAmount() {
        this.scene.pet.setActive(true).setVisible(true);
        if (this.scene.energy !== 0) this.scene.goHuntButton.setText('Пойти на охоту');
        this.scene.moneyAmountTxt.setText(`Денег: ${this.scene.moneyAmount}`);
    }
}

module.exports = Hunt;
