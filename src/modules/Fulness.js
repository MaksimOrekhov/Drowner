class Fulness {
    constructor(scene) {
        this.scene = scene;
        console.log('столько еды при инициализации', this.scene.fulness);
    }

    startCalcFulness() {
        this.scene.time.addEvent({
            delay: this.scene.globalTimeValue / 250, // 30 sec
            callback: this.updateFulness,
            callbackScope: this.scene,
            loop: true,
        });
    }

    calcFulnessAfterExit() {
        if (JSON.parse(localStorage.getItem('gameLeftTime')) !== '0') {
            // разница между временем входа и выхода из игра
            const diffTime =
                new Date().getTime() - JSON.parse(localStorage.getItem('gameLeftTime'));
            // делим разницу на период за который сытость должна уменьшится на один и вычитаем из текущей сытости
            console.log(
                'Столько еды я сожрал пока ты спал:',
                Math.floor(diffTime / 345600)
            );
            this.scene.fulness -= Math.floor(diffTime / 345600);
            // очищаем сторадж чтобы это говно постоянно не вызывалось (можно придумать способ получше
            // например найти место чтобы эта функция инициализировалсь только при старте игры
            localStorage.setItem('gameLeftTime', '0');
            this.updateFulnessBar(this.scene.fulness);
        }
    }

    updateFulness() {
        this.scene.fulness -= 1;
        this.scene.setDataToStorage({ fulness: this.scene.fulness });
        this.scene.GameScene.hungryTxt = this.scene.add.text(100, 250, '');

        this.scene.GameScene.hungryTxt.setText('');
        if (!this.scene.fulness) {
            this.scene.scene.start('GameOver');
        }
        this.updateFulnessBar(this.scene.fulness);
    }

    updateFulnessBar(fulness) {
        this.scene.GameScene.fulnessBarTxt &&
            this.scene.GameScene.fulnessBarTxt.setText(`Сытость: ${fulness}`);
    }
}

module.exports = Fulness;
