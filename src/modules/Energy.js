class Energy {
    constructor(scene) {
        this.scene = scene;
    }

    decreaseEnergyValue() {
        if (this.scene.energy !== 0) {
            this.scene.energy -= 20;
            this.scene.localStorageSetter.setDataToStorage();
            this.updateEnergyBar();
        }
    }

    updateEnergyBar() {
        this.scene.GameScene.energyBarTxt.setText(`Энергия: ${this.scene.energy}`);

        if (this.scene.energy === 0) {
            this.scene.GameScene.goHuntButton.setText('');

            this.scene.GameScene.goSleepButton = this.scene.add.text(
                20,
                this.scene.cameras.main.height - 35,
                'Пойти спать'
            );
            this.scene.GameScene.goSleepButton.setInteractive();
            this.scene.GameScene.goSleepButton.on('pointerdown', () => {
                this.scene.sleepInstance.increaseEnergyValue();
            });
        }
    }
}

module.exports = Energy;
