import Phaser from 'phaser';
import Fulness from '../modules/Fulness';
import Growth from '../modules/Growth';
import Energy from '../modules/Energy';
import Sleep from '../modules/Sleep';
import Hunt from '../modules/Hunt';
import GameDayTime from '../modules/GameDayTime';
import DialogWindow from "./DialogWindow";

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.pet = null;
        this.background = null;
        this.petAge = 0;
        this.fulness = 100;
        this.energy = 100;
        this.strength = 1;
        this.growthStages = {
            child: 0,
            teenager: 1,
            grownUp: 3,
            death: 5,
        };
        this.globalTimeValue = 24 * 60 * 60 * 1000; // 24 часа
        this.moneyAmount = 0;
        this.energyInstance = null;
        this.sleepInstance = null;
        this.huntInstance = null;
    }

    init() {}

    preload() {
        this.load.spritesheet('forest_day', 'assets/images/ForestDay.png', {
            frameWidth: '100%',
            frameHeight: '100%',
        });
        this.load.spritesheet('forest_night', 'assets/images/ForestNight.png', {
            frameWidth: '100%',
            frameHeight: '100%',
        });
        this.load.spritesheet('child', 'assets/images/bird.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
        this.load.spritesheet('teenager', 'assets/images/bird2.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
        this.load.spritesheet('grownUp', 'assets/images/bird3.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
        this.load.image('food', 'assets/images/food/Brownie.png');
    }

    create() {
        this.background = this.add.sprite(-800, 0, 'forest_day');
        this.background.setOrigin(0, 0);

        this.moneyAmountTxt = this.add.text(
            150,
            60,
            `Деньги: ${this.moneyAmount}`
        );
        this.noMoney = this.add.text(150, 250, '');

        this.pet = this.add.sprite(200, 350, 'child');

        this.energyInstance = new Energy(this);
        this.sleepInstance = new Sleep(this);
        this.huntInstance = new Hunt(this);
        new Fulness(this, this.fulness);
        new Growth(this);
        new GameDayTime(this);

        // Иконка перехода на сцену кормёжки
        this.food = this.add.image(300, 400, 'food');
        this.food.setScale(2, 2);
        this.food.setInteractive();
        this.food.on('pointerup', () => {
            this.startGettingFood();
        });

        // Кнопка выхода на охоту
        this.goHuntButton = this.add.text(20, 520, 'Пойти на охоту');
        this.goHuntButton.setInteractive();
        this.goHuntButton.on('pointerdown', () => {
            this.energyInstance.decreaseEnergyValue();
            this.huntInstance.goHunting();
        });

        this.pet.play('child_anim');
    }

    startGettingFood() {
        this.scene.setVisible(false, 'Game');
        this.scene.launch('GettingFood');
    }

    feedPet(fulness, money) {
        // @todo refactor this shit!!!
        if (this.moneyAmount - money >= 0) {
            if (this.fulness <= 90) {
                this.fulness += fulness;
                this.foodMessage = this.add.text(
                    100,
                    100,
                    'Спасибо бро, этот бургер был не лишним!'
                );
                this.time.addEvent({
                    delay: 1000,
                    callback: this.foodMessage.destroy,
                    callbackScope: this.foodMessage,
                    loop: false,
                });
                this.moneyAmount -= money;
                this.moneyAmountTxt.setText(`Деньги: ${this.moneyAmount}`);
            } else {
                if (!this.foodMessage) {
                    this.foodMessage = this.add.text(
                        100,
                        100,
                        'Слишком много хавки! Я сыт!'
                    );
                    this.time.addEvent({
                        delay: 1000,
                        callback: this.foodMessage.destroy,
                        callbackScope: this.foodMessage,
                        loop: false,
                    });
                }
            }
        } else {
            this.noMoney.setText('Недостаточно денег');
        }
    }

    update() {
        // Очистка сообщения о сытости
        if (this.foodMessage) {
            this.foodMessage = undefined;
        }
    }
}
