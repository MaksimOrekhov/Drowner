class LocalStorageSetter {
    constructor(scene) {
        this.scene = scene;
        this.parameters = {};
        this.setDataToStorage();
    }

    startCalcFulness() {
        this.scene.time.addEvent({
            delay: this.scene.globalTimeValue / 250, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });
    }

    calcFulnessAfterExit() {
        // разница между временем входа и выхода из игра
        const diffTime = new Date().getTime() - localStorage.getItem('gameLeftTime');
        // делим разницу на период за который сытость должна уменьшится на один и вычитаем из текущей сытости
        console.log('Столько еды я сожрал пока ты спал:', Math.floor(diffTime / 3456));
        this.scene.fulness -= Math.floor(diffTime / 3456);
        // очищаем сторадж чтобы это говно постоянно не вызывалось (можно придумать способ получше
        // например найти место чтобы эта функция инициализировалсь только при старте игры
        localStorage.setItem('gameLeftTime', '0');
        this.updateFulnessBar(this.scene.fulness);
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
            petsInCollection: this.scene.petsInCollection,
        };
    }

    setDataToStorage() {
        this.prepareDataForStorage();
        localStorage.setItem('parameters', JSON.stringify(this.parameters));
    }
}

module.exports = LocalStorageSetter;
