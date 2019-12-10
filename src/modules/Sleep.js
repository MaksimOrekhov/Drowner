import { TIMER_CONFIG } from "../scenes/constants";

class Sleep {
    constructor(scene) {
        this.scene = scene;
    }

    increaseEnergyValue() {
        this.increaseEnergyTimer = this.scene.time.addEvent({
            delay: TIMER_CONFIG.sleep,
            callback: this.updateEnergyValue,
            callbackScope: this,
            loop: true,
        });
    }

    updateEnergyValue() {
        if (this.scene.energy !== 100) {
            this.scene.goSleepButton.setText('');
            this.scene.huntFailedText.setText('');
            this.scene.energy += 10;
            this.scene.localStorageSetter.setDataToStorage();
            this.updateEnergyBar();
        } else {
            this.increaseEnergyTimer.remove();
            this.scene.goHuntButton.setText('Пойти на охоту');
        }
    }

    updateEnergyBar() {
        this.scene.energyBarTxt.setText(`Энергия: ${this.scene.energy}`);
    }
}

module.exports = Sleep;
