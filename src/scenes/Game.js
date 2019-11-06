import Phaser from 'phaser';
import Fulness from '../modules/Fulness';
import Growth from '../modules/Growth';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.pet = null;
        this.background = null;
        this.petAge = 0;
        this.fulness = 100;
        this.growthStages = {
            child: 0,
            teenager: 1,
            grownUp: 3,
            death: 5,
        };
        this.globalTimeValue = 24 * 60 * 60 * 1000; // 24 часа
        this.fulnessClass = null;
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
        this.load.image('food', 'assets/images/Brownie.png');
    }

    create() {
        this.background = this.add.sprite(-800, 0, 'forest_day');
        this.background.setOrigin(0, 0);

        this.changeBackForDayOrNight();

        this.time.addEvent({
            delay: this.globalTimeValue / 2880, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });

        this.pet = this.add.sprite(200, 350, 'child');

        this.fulnessClass = new Fulness(this, this.fulness);
        new Growth(this);

        // Иконка кормежки
        this.food = this.add.image(300, 400, 'food');
        this.food.setScale(2, 2);
        this.food.setInteractive();
        this.food.on('pointerdown', () => {
            this.feedPet();
        });

        this.pet.play('child_anim');
    }

    feedPet() {
        if (this.fulness <= 90) {
            this.fulness += 10;
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
    }

    updateFulness() {
        this.fulness -= 1;
        if (this.fulness <= 50) {
            this.add.text(10, 10, 'Я голоден! Дай хавки!');
        }
        if (!this.fulness) {
            this.scene.start('GameOver');
        }
        this.fulnessClass.updateFulnessBar(this.fulness);
    }

    changeBackForDayOrNight() {
        const date = new Date();
        let time = date.getHours();

        if (time >= 18 || time <= 8) {
            this.background.setTexture('forest_night');
        } else {
            this.background.setTexture('forest_day');
        }
    }

    update() {
        // Очистка сообщения о сытости
        if (this.foodMessage) {
            this.foodMessage = undefined;
        }
    }
}
