class Fulness {
  constructor(scene, fulnessBarTxt, fulness) {
    this.scene = scene
    this.fulnessBarTxt = fulnessBarTxt
    this.fulness = fulness

    this.fulnessBar()
  }
  fulnessBar() {
    this.fulnessBarTxt.setText(`Сытость: ${this.fulness}`);
  }
}

module.exports = Fulness
