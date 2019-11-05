class Fulness {
    constructor(scene, fulness) {
        this.fulnessBarTxt = scene.add.text(20, 20, `Сытость: ${this.fulness}`);
        this.fulness = fulness;

        this.fulnessBar();
    }
    fulnessBar() {
        this.fulnessBarTxt.setText(`Сытость: ${this.fulness}`);
    }

    updateFulnessBar(fulness) {
        this.fulnessBarTxt.setText(`Сытость: ${fulness}`);
    }
}

module.exports = Fulness;
