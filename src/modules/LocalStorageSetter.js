class LocalStorageSetter {
    constructor(scene) {
        this.scene = scene;
    }

    getParams() {
        return {
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
        let parameters = this.getParams();
        let newParams = { ...parameters, ...data };
        localStorage.setItem('parameters', JSON.stringify(newParams));
    }
}

module.exports = LocalStorageSetter;
