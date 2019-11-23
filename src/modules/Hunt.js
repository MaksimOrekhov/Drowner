import Phaser from 'phaser';

class Hunt {
    constructor(scene) {
        this.scene = scene;
        this.minAmount = 1;
        this.maxAmount = 5;
        this.HUNT_DURATION = 2000;
    }

    goHunting(enemyStrength) {
        this.scene.goHuntButton.setText('');
        this.scene.pet.setActive(false).setVisible(false);
        if (!this.meetWitcherOnHunt()) {
            if (this.executionProbability(enemyStrength)) {
                setTimeout(() => {
                    this.increaseMoneyValue();
                }, this.HUNT_DURATION);
            } else {
                setTimeout(() => {
                    this.setHuntingFailMessage();
                }, this.HUNT_DURATION);
            }
        } else {
            setTimeout(() => {
                this.setWitcherMeetingMessage();
            }, this.HUNT_DURATION);
        }
    }

    increaseMoneyValue() {
        this.scene.moneyAmount += Phaser.Math.Between(this.minAmount, this.maxAmount) + this.scene.strength;
        this.scene.localStorageSetter.setDataToStorage();
        this.updateMoneyAmount();
        this.scene.huntFailedText.setText('');
    }

    updateMoneyAmount() {
        this.scene.pet.setActive(true).setVisible(true);
        if (this.scene.energy !== 0) this.scene.goHuntButton.setText('Пойти на охоту');
        this.scene.moneyAmountTxt.setText(`Золото: ${this.scene.moneyAmount}`);
    }

    setHuntingFailMessage() {
        this.scene.pet.setActive(true).setVisible(true);
        if (this.scene.energy !== 0) this.scene.goHuntButton.setText('Пойти на охоту');
        this.scene.huntFailedText.setText(
            'Ваш питомец потерпел неудачу. Попробуйте поохотиться в другом месте.'
        );
    }

    executionProbability(enemyStrength) {
        let petStrength = this.scene.strength;
        if (petStrength - enemyStrength >= 0) {
            return true;
        } else {
            let failProbability = (enemyStrength - petStrength) / 10;
            return Math.random() >= failProbability;
        }
    }

    meetWitcherOnHunt() {
        return Math.random() <= 0.1;
    }

    setWitcherMeetingMessage() {
        this.scene.huntFailedText.setText(
            'Ваш питомец встретил ведьмака на охоте и получил увечья. Ему необходимо отдохнуть.'
        );
        this.scene.pet.setActive(true).setVisible(true);
        this.scene.energy = 0;
        this.scene.localStorageSetter.setDataToStorage();
        this.scene.energyInstance.updateEnergyBar();
        this.scene.goSleepButton.setText('Пойти спать');
    }
}

module.exports = Hunt;
