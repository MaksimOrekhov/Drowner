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
            id: this.scene.petID,
            spriteName: this.scene.petSpriteName,
            spritePath: this.scene.petSpritePath,
        };
    }

    setDataToStorage(data) {
        this.prepareDataForStorage(data);
        localStorage.setItem('parameters', JSON.stringify(this.parameters));
    }
}

module.exports = LocalStorageSetter;
