class Fulness {
    constructor(scene) {
        this.scene = scene;

        this.fulnessBar();
        this.scene.time.addEvent({
            delay: this.scene.globalTimeValue / 2880, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });
    }

    fulnessBar() {
        this.fulnessBarTxt = this.scene.add.text(
            20,
            20,
            `Сытость: ${this.scene.fulness}`
        );
    }

    updateFulness() {
        this.scene.fulness -= 1;
        this.scene.localStorageSetter.setDataToStorage();
        this.hungryTxt = this.scene.add.text(100, 250, '');

        this.hungryTxt.setText('');
        if (!this.scene.fulness) {
            this.scene.scene.start('GameOver');
        }
        this.updateFulnessBar(this.scene.fulness);
    }

    updateFulnessBar(fulness) {
        this.fulnessBarTxt.setText(`Сытость: ${fulness}`);
    }
}

module.exports = Fulness;
