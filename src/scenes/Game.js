import Phaser from 'phaser';
import Fulness from '../modules/Fulness';


import Sleep from '../modules/Sleep';
import Hunt from '../modules/Hunt';
import GameDayTime from '../modules/GameDayTime';
import RandomMessage from '../modules/RandomMessage';
import { TIMER_CONFIG } from './constants';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.parameters = {};
        this.pet = null;
        this.background = null;
        this.fulness = 100;
        this.strength = 1;

        this.globalTimeValue = 24 * 60 * 60 * 1000; // 24 часа
        this.moneyAmount = 0;
        this.energyInstance = null;
        this.sleepInstance = null;
        this.huntInstance = null;
        this.goHuntButton = null;
        this.goSleepButton = null;
    }

    init(data) {
        this.BgLogicScene = this.scene.get('BackgroundLogicScene');
        Object.keys(data).length !== 0 && this.BgLogicScene.setDataToStorage(data);
        this.parameters = JSON.parse(localStorage.getItem('parameters'));
    }

    preload() {
        this.load.spritesheet('forest_day', 'assets/images/ForestDay.png', {
            frameWidth: '100%',
            frameHeight: '100%',
        });
        this.load.spritesheet('forest_night', 'assets/images/ForestNight.png', {
            frameWidth: '100%',
            frameHeight: '100%',
        });
        this.load.spritesheet(
            this.parameters.spriteName,
            this.parameters.spritePath,
            {
                frameWidth: 183,
                frameHeight: 175,
            }
        );
        this.load.image('food', 'assets/images/food/Brownie.png');
        this.load.image('message', 'assets/images/cloud_message.png');
    }

    create() {
        this.background = this.add.sprite(-800, 0, 'forest_day');
        this.background.setOrigin(0, 0);

        this.moneyAmountTxt = this.add.text(
            150,
            60,
            `Золото: ${this.moneyAmount}`
        );
        this.noMoney = this.add.text(150, 250, '');

        this.pet = this.add.sprite(200, 350, this.parameters.spriteName);

        this.sleepInstance = new Sleep(this);
        this.huntInstance = new Hunt(this);
        this.randomMessageInstance = new RandomMessage(this);
        this.fulnessInstance = new Fulness(this);

        new GameDayTime(this);
        this.fulnessInstance.startCalcFulness();
        if (localStorage.getItem('gameLeftTime') !== '0') {
            this.fulnessInstance.calcFulnessAfterExit();
        }

        this.time.addEvent({
            delay: TIMER_CONFIG.randomMessage,
            callback: this.showRandomMessage,
            callbackScope: this,
            loop: true,
        });

        // Иконка перехода на сцену кормёжки
        this.food = this.add.image(300, 400, 'food');
        this.food.setScale(2, 2);
        this.food.setInteractive();
        this.food.on('pointerup', () => {
            this.startGettingFood();
        });

        this.huntFailedText = this.add.text(120, 420, '', {
            wordWrap: { width: 250, useAdvancedWrap: true },
        });
        this.growthTxt = this.add.text(
            150,
            20,
            `Возраст(дней): ${this.parameters.petAge}`
        );
        this.energyBarTxt = this.add.text(20, 60, `Энергия: ${this.parameters.energy}`);
        this.goHuntButton = this.add.text(20, this.cameras.main.height - 35, '');
        this.goSleepButton = this.add.text(20, this.cameras.main.height - 35, '');
        this.petShopButton = this.add.text(260, this.cameras.main.height - 35, 'Магазин питомцев');

        this.goHuntButton.setInteractive();
        this.goSleepButton.setInteractive();
        this.petShopButton.setInteractive();

        this.goSleepButton.on('pointerdown', () => {
            this.sleepInstance.increaseEnergyValue();
        });

        this.goHuntButton.on('pointerdown', () => {
            this.scene.setVisible(false, 'Game');
            this.scene.launch('HuntMap');
        });

        if (this.energy === 0) {
            this.goSleepButton.setText('Пойти спать');
        } else {
            this.goHuntButton.setText('Пойти на охоту');
        }

        this.petShopButton.on('pointerdown', () => {
            this.scene.switch('PetShop');
        });

        this.pet.play(this.parameters.spriteName);
    }

    showRandomMessage() {
        this.messageImg = this.add.image(245, 277, 'message');
        this.messageImg.setScale(0.3, 0.35);
        this.messageText = this.add.text(
            150,
            225,
            this.randomMessageInstance.getMessage(),
            { color: '#000', wordWrap: { width: this.messageImg.width * 0.22, useAdvancedWrap: true } }
        );

        // если сообщение в три строки увеличиваем подложку и сдвигаем её
        if (this.messageText.height > 45) {
            this.messageImg.setPosition(245, 300);
            this.messageImg.setScale(0.3, 0.5);
        }

        this.destroyMessage(TIMER_CONFIG.randomMessage * 0.5, this.messageText);
        this.destroyMessage(TIMER_CONFIG.randomMessage * 0.5, this.messageImg);
    }

    destroyMessage(delay, obj) {
        this.time.addEvent({
            delay: delay,
            callback: obj.destroy,
            callbackScope: obj,
            loop: false,
        });
    }

    startGettingFood() {
        this.scene.switch('GettingFood');
        this.scene.resume('Game');
    }

    feedPet(fulness, money) {
        // @todo refactor this shit!!!
        if (this.moneyAmount - money >= 0) {
            if (this.fulness <= 90) {
                this.fulness += fulness;
                this.localStorageSetter.setDataToStorage();
                this.foodMessage = this.add.text(
                    100,
                    100,
                    'Спасибо бро, этот бургер был не лишним!'
                );
                this.destroyMessage(2000, this.foodMessage);
                this.moneyAmount -= money;
                this.moneyAmountTxt.setText(`Золото: ${this.moneyAmount}`);
            } else {
                if (!this.foodMessage) {
                    this.foodMessage = this.add.text(
                        100,
                        100,
                        'Слишком много хавки! Я сыт!'
                    );
                    this.destroyMessage(2000, this.foodMessage);
                }
            }
        } else {
            this.noMoney.setText('Недостаточно золота');
        }
    }

    update() {
        // Очистка сообщения о сытости
        if (this.foodMessage) {
            this.foodMessage = undefined;
        }

        window.addEventListener('beforeunload', () => {
            localStorage.setItem('gameLeftTime', new Date().getTime());
        });
    }
}

// ==> выход
// запоминаем время выхода в локалсторадж
// ==> возвращение
// берем разницу между временем выхода и входа и делим на количество отрезков по 30 секунд
// success: получаем количество сытости которые нужно отнять
