class Energy {
    constructor(scene) {
        this.scene = scene;

        this.scene.energyBarTxt = scene.add.text(20, 60, `Энергия: ${this.scene.energy}`);
    }

    decreaseEnergyValue() {
        if (this.scene.energy !== 0) {
            this.scene.energy -= 20;
            this.scene.localStorageSetter.setDataToStorage();
            this.updateEnergyBar();
        }
    }

    updateEnergyBar() {
        this.scene.energyBarTxt.setText(`Энергия: ${this.scene.energy}`);

        if (this.scene.energy === 0) {
            this.scene.goHuntButton.setText('');

            this.scene.goSleepButton = this.scene.add.text(
                20,
                this.scene.cameras.main.height - 35,
                'Пойти спать'
            );
            this.scene.goSleepButton.setInteractive();
            this.scene.goSleepButton.on('pointerdown', () => {
                this.scene.sleepInstance.increaseEnergyValue();
            });
        }
    }
}

module.exports = Energy;
