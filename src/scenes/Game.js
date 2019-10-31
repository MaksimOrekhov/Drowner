import Phaser from 'phaser';

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
        this.globalTimeValue = 24 * 60 * 60 * 1000 // 24 часа
    }

    init() {}

    preload() {
        this.load.spritesheet('forest_day', 'assets/images/ForestDay.png', {
            frameWidth: '100%',
            frameHeight: '100%',
        })
        this.load.spritesheet('forest_night', 'assets/images/ForestNight.png', {
            frameWidth: '100%',
            frameHeight: '100%',
        })
        this.load.spritesheet('child', 'assets/images/bird.png', {
            frameWidth: 183,
            frameHeight: 175,
        });
    }

    create() {
        this.background = this.add.sprite(-800, 0, 'forest_day')
        this.background.setOrigin(0, 0)
        this.changeBackForDayOrNight()

        this.time.addEvent({
            delay: this.globalTimeValue,
            callback: this.updateAge,
            callbackScope: this,
            loop: true,
        });
        this.time.addEvent({
            delay: this.globalTimeValue / 2880, // 30 sec
            callback: this.updateFulness,
            callbackScope: this,
            loop: true,
        });

        this.pet = this.add.sprite(200, 350, 'child');

        this.anims.create({
            key: 'child_anim',
            frames: this.anims.generateFrameNumbers('child', {
                frames: [0, 1, 2, 1],
            }),
            frameRate: 5,
            repeat: -1,
        });
        this.pet.play('child_anim');
    }

    update() {}

    updateAge() {
        this.petAge += 1;

        switch (this.petAge) {
            case this.growthStages.teenager:
                this.pet.setTexture('teenager'); // меняем текстуру спрайта
                break;
            case this.growthStages.grownUp:
                this.pet.setTexture('grownUp');
                break;
            case this.growthStages.death:
                this.pet.setTexture(); // вставляем пустую текстуру
                this.add.image(400, 400, 'death');

                this.petAge = 0;
                break;
        }
    }

    updateFulness() {
        this.fulness -= 1;
        console.log(this.fulness);
        if (this.fulness <= 50) {
            this.add.text(100, 100, 'Ваш питомец на половину голоден!', {
                font: '40px Bangers',
                fill: '#7744ff',
            });
        }
        if (!this.fulness) {
            this.scene.start('GameOver');
        }
    }

    changeBackForDayOrNight() {
        const date = new Date()
        let time = date.getHours()

        if(time >= 18 || time <= 8) {
            this.background.setTexture('forest_night')
        } else {
            this.background.setTexture('forest_day')
        }
    }
}
