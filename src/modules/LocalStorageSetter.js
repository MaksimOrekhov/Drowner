class LocalStorageSetter {
    constructor(scene) {
        this.scene = scene;
        this.parameters = {
            petAge: this.scene.petAge,
            fulness: this.scene.fulness,
            energy: this.scene.energy,
            moneyAmount: this.scene.moneyAmount,
            id: this.scene.petID,
            spriteName: this.scene.petSpriteName,
            spritePath: this.scene.petSpritePath,
            petsInCollection: this.scene.petsInCollection,
        };
    }

    setDataToStorage(data) {
        let params = { ...this.parameters, ...data };
        localStorage.setItem('parameters', JSON.stringify(params));
    }
}

module.exports = LocalStorageSetter;
