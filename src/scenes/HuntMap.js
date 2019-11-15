import Phaser from 'phaser';
import DialogWindow from './DialogWindow';

export default class HuntMap extends Phaser.Scene {
    constructor() {
        super('HuntMap');
    }

    init() {}

    preload() {
        this.load.image('huntMap', 'assets/images/hunt_map.jpg');
    }

    create() {
        this.GameScene = this.scene.get('Game');
        this.huntMap = this.add.image(0, 0, 'huntMap');
        this.huntMap.setOrigin(0, 0);
        this.huntMap.setScale(0.3, 0.4);
        this.add.text(120, 50, 'Выберите место для охоты');
        this.goBackButton = this.add.text(20, 20, 'Назад');

        this.goBackButton.setInteractive().on('pointerdown', () => {
            this.scene.stop('HuntMap');
            this.scene.setVisible(true, 'Game');
        });

        this.firstPlace = this.add.circle(22, 160, 12, 0xff0000);
        this.secondPlace = this.add.circle(220, 300, 12, 0xff0000);
        this.thirdPlace = this.add.circle(300, 480, 12, 0xff0000);
        this.fourthPlace = this.add.circle(320, 100, 12, 0xff0000);
        this.fifthPlace = this.add.circle(350, 600, 12, 0xff0000);

        this.firstPlace.setInteractive().on('pointerdown', () => {
            this.createDialogWindow({
                placeNum: 1,
                monsterStrength: 1,
                scene: this,
            });
        });
        this.secondPlace.setInteractive().on('pointerdown', () => {
            this.createDialogWindow({
                placeNum: 2,
                monsterStrength: 2,
            });
        });
        this.thirdPlace.setInteractive().on('pointerdown', () => {
            this.createDialogWindow({
                placeNum: 3,
                monsterStrength: 3,
            });
        });
        this.fourthPlace.setInteractive().on('pointerdown', () => {
            this.createDialogWindow({
                placeNum: 4,
                monsterStrength: 4,
            });
        });
        this.fifthPlace.setInteractive().on('pointerdown', () => {
            this.createDialogWindow({
                placeNum: 5,
                monsterStrength: 5,
            });
        });
    }

    update() {}

    // Добавление попапа
    createDialogWindow(params) {
        if (!this.scene.manager.keys['DialogWindow']) {
            this.dialogWindow = new DialogWindow({
                parent: this,
                width: this.cameras.main.worldView.width,
                height: this.cameras.main.worldView.height,
                bgColor: '#000',
                alpha: 0.8,
                render: this.render,
                renderParams: params,
            });
            this.scene.add('DialogWindow', this.dialogWindow, true);
        }
    }

    render(params) {
        const { placeNum, monsterStrength } = params;
        this.add.text(60, 80, `Место для охоты номер ${placeNum}`, {
            font: 'bold 20px Arial',
        });
        this.add.text(60, 120, `Сила монстра в этом месте - ${monsterStrength}`,  {
                font: 'bold 20px Arial',
            }
        );
        this.goHuntTxt = this.add.text(40, 200, 'Пойти на охоту', {
            font: 'bold 20px Arial',
        });
        this.cancelTxt = this.add.text(250, 200, 'Отменить', {
            font: 'bold 20px Arial',
        });

        this.goHuntTxt.setInteractive().on('pointerup', () => {
            this.parent.GameScene.energyInstance.decreaseEnergyValue();
            this.parent.GameScene.huntInstance.goHunting();

            this.scene.stop('HuntMap');
            this.scene.setVisible(true, 'Game');
            this.scene.remove('DialogWindow');
        });

        this.cancelTxt.setInteractive().on('pointerup', () => {
            this.scene.remove('DialogWindow');
        });
    }
}
