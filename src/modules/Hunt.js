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
        if (this.executionProbability()) {
            setTimeout(() => {
                this.increaseMoneyValue();
            }, 2000);
        } else {
            setTimeout(() => {
                this.setHuntingFailMessage();
            }, 2000);
        }
    }

    increaseMoneyValue() {
        this.scene.moneyAmount += Phaser.Math.Between(this.minAmount, this.maxAmount) + this.scene.strength;
        this.scene.localStorageSetter.setDataToStorage();
        this.updateMoneyAmount();
        this.scene.huntFailedButton.setText('');
    }

    updateMoneyAmount() {
        this.scene.pet.setActive(true).setVisible(true);
        if (this.scene.energy !== 0) this.scene.goHuntButton.setText('Пойти на охоту');
        this.scene.moneyAmountTxt.setText(`Деньги: ${this.scene.moneyAmount}`);
    }

    setHuntingFailMessage() {
        this.scene.pet.setActive(true).setVisible(true);
        if (this.scene.energy !== 0) this.scene.goHuntButton.setText('Пойти на охоту');
        this.scene.huntFailedButton.setText(
            'Ваш питомец потерпел неудачу. Попробуйте поохотиться в другом месте.'
        );
    }

    executionProbability(petStrength = 1, enemyStrength = 5) {
        if (petStrength - enemyStrength >= 0) {
            return true;
        } else {
            let failProbability = 1 - (enemyStrength - petStrength) / 10;
            return Math.random() >= failProbability;
        }
    }
}

module.exports = Hunt;
