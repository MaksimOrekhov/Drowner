class Fulness {
    constructor(scene, fulness) {
        this.scene = scene;
        this.fulness = fulness;

        this.fulnessBar();
    }
    fulnessBar() {
        this.fulnessBarTxt = this.scene.add.text(
            20,
            20,
            `Сытость: ${this.fulness}`
        );
    }

    updateFulnessBar(fulness) {
        this.fulnessBarTxt.setText(`Сытость: ${fulness}`);
    }
}

module.exports = Fulness;
