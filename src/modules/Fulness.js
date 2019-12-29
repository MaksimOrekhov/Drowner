import { TIMER_CONFIG } from "../scenes/constants";

class Fulness {
    constructor(scene) {
        this.scene = scene;
    }

    startCalcFulness() {
        this.scene.time.addEvent({
            delay: TIMER_CONFIG.fulnessDecrease, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });
    }

    calcFulnessAfterExit() {
        // разница между временем входа и выхода из игра
        const diffTime = new Date().getTime() - localStorage.getItem('gameLeftTime');
        // делим разницу на период за который сытость должна уменьшится на один и вычитаем из текущей сытости
        console.log('Столько еды я сожрал пока ты спал:', Math.floor(diffTime / TIMER_CONFIG.fulnessDecrease));
        this.scene.fulness -= Math.floor(diffTime / TIMER_CONFIG.fulnessDecrease);
        // очищаем сторадж чтобы это говно постоянно не вызывалось (можно придумать способ получше
        // например найти место чтобы эта функция инициализировалсь только при старте игры
        localStorage.setItem('gameLeftTime', '0');
        this.updateFulnessBar(this.scene.fulness);
    }

    updateFulness() {
        this.scene.fulness -= 1;
        this.scene.setDataToStorage({ fulness: this.scene.fulness });
        this.scene.GameScene.hungryTxt = this.scene.add.text(100, 250, '');

        this.scene.GameScene.hungryTxt.setText('');

        this.updateFulnessBar(this.scene.fulness);
    }

    updateFulnessBar(fulness) {
        this.scene.GameScene.fulnessBarTxt && this.scene.GameScene.fulnessBarTxt.setText(`Сытость: ${fulness}`);
    }
}

module.exports = Fulness;
