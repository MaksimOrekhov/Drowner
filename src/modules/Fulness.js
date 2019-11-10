class Fulness {
    constructor(scene) {
        this.scene = scene;
        this.fulness = 100;

        this.fulnessBar();
        this.scene.time.addEvent({
            delay: this.scene.globalTimeValue / 28800, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });
    }

    fulnessBar() {
        this.fulnessBarTxt = this.scene.add.text(
            20,
            20,
            `Сытость: ${this.fulness}`
        );
    }

    updateFulness() {
        this.scene.fulness -= 1;
        if (this.scene.fulness <= 50) {
            this.scene.add.text(100, 250, 'Я голоден! Дай хавки!');
        }
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
