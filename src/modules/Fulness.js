class Fulness {
    constructor(scene) {
        this.scene = scene;
        console.log('столько еды при инициализации', this.scene.fulness);
        this.fulnessBar();
    }

    fulnessBar() {
        this.fulnessBarTxt = this.scene.add.text(
            20,
            20,
            `Сытость: ${this.scene.fulness}`
        );
    }

    startCalcFulness() {
        this.scene.time.addEvent({
            delay: this.scene.globalTimeValue / 250, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });
    }

    /**
     * Считает сколько единиц сытости нужно отнять пока игра была выключена
     */
    calcFulnessAfterExit() {
        // разница между временем входа и выхода из игра
        const diffTime = new Date().getTime() - localStorage.getItem('gameLeftTime');
        // делим разницу на период за который сытость должна уменьшится на один и вычитаем из текущей сытости
        console.log('Столько еды я сожрал пока ты спал:', Math.floor(diffTime / 345600));
        if (this.scene.fulness - Math.floor(diffTime / 345600) <= 0) {
            console.log('Ты сдох пока спал чувак! LOL KEK')
            this.scene.scene.start('GameOver');
        }
        this.scene.fulness -= Math.floor(diffTime / 345600);
        // очищаем сторадж чтобы это говно постоянно не вызывалось (можно придумать способ получше
        // например найти место чтобы эта функция инициализировалсь только при старте игры
        localStorage.setItem('gameLeftTime', '0');
        this.updateFulnessBar(this.scene.fulness);
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
