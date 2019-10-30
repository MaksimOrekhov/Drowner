import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
    constructor() {
        super('Game');
        this.pet = null;
        this.petAge = 0;
        this.fulness = 100;
        this.growthStages = {
            child: 0,
            teenager: 1,
            grownUp: 3,
            death: 5,
        };
    }

    init() {}

    preload() {
        this.load.spritesheet('child', 'assets/images/bird.png', {
            frameWidth: 128,
            frameHeight: 128,
        });
        // this.load.spritesheet('teenager', 'assets/images/icon-192px.png', {
        //     frameWidth: 192,
        //     frameHeight: 192,
        // });
        // this.load.spritesheet('grownUp', 'assets/images/icon-512px.png', {
        //     frameWidth: 512,
        //     frameHeight: 512,
        // });
        // this.load.image('death', 'assets/images/phaser.png');
    }

    create() {
        // this.time.addEvent({
        //     delay: 30000,
        //     callback: this.updateAge,
        //     callbackScope: this,
        //     loop: true,
        // });
        // this.time.addEvent({
        //     delay: 100,
        //     callback: this.updateFulness,
        //     callbackScope: this,
        //     loop: true,
        // });
        this.pet = this.add.sprite(200, 200, 'child');

        this.anims.create({
            key: "child_anim",
            frames: this.anims.generateFrameNumbers("child"),
            frameRate: 15,
            repeat: -1
        })
        this.pet.play("child_anim")
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
                this.time.addEvent({
                    delay: 3000,
                    callback: this.showGameOverScene,
                    callbackScope: this,
                    loop: false,
                });

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

    showGameOverScene() {
        this.scene.start('GameOver');
    }
}
