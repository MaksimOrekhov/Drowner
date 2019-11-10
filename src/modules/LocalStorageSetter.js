class LocalStorageSetter {
    constructor(scene) {
        this.scene = scene;
        this.parameters = {};
        this.setDataToStorage();
    }

    prepareDataForStorage() {
        this.parameters = {
            petAge: this.scene.petAge,
            fulness: this.scene.fulness,
            energy: this.scene.energy,
            moneyAmount: this.scene.moneyAmount,
        };
    }

    setDataToStorage() {
        this.prepareDataForStorage();
        localStorage.setItem('parameters', JSON.stringify(this.parameters));
    }
}

module.exports = LocalStorageSetter;
