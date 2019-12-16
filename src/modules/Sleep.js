class Sleep {
    constructor(scene) {
        this.scene = scene;
    }

    increaseEnergyValue() {
        this.increaseEnergyTimer = this.scene.time.addEvent({
            delay: this.scene.globalTimeValue / 288000,
            callback: this.updateEnergyValue,
            callbackScope: this,
            loop: true,
        });
    }

    updateEnergyValue() {
        if (this.scene.energy !== 100) {
            this.scene.GameScene.goSleepButton.setText('');
            this.scene.GameScene.huntFailedText.setText('');
            this.scene.energy += 10;
            this.scene.setDataToStorage({ scene: this.scene.energy });
            this.updateEnergyBar();
        } else {
            this.increaseEnergyTimer.remove();
            this.scene.GameScene.goHuntButton.setText('Пойти на охоту');
        }
    }

    updateEnergyBar() {
        this.scene.GameScene.energyBarTxt.setText(`Энергия: ${this.scene.energy}`);
    }
}

module.exports = Sleep;
