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
        setTimeout(() => {
            this.increaseMoneyValue();
        }, 2000);
    }

    increaseMoneyValue() {
        this.scene.moneyAmount += Phaser.Math.Between(this.minAmount, this.maxAmount) + this.scene.strength;
        this.scene.localStorageSetter.setDataToStorage();
        this.updateMoneyAmount();
    }

    updateMoneyAmount() {
        this.scene.pet.setActive(true).setVisible(true);
        if (this.scene.energy !== 0) this.scene.goHuntButton.setText('Пойти на охоту');
        this.scene.moneyAmountTxt.setText(`Деньги: ${this.scene.moneyAmount}`);
    }
}

module.exports = Hunt;
