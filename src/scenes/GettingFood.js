import Phaser from 'phaser';
import { FOOD_TYPES } from './constants';
import DialogWindow from './DialogWindow';

export default class GettingFood extends Phaser.Scene {
    constructor() {
        super('GettingFood');
    }

    init() {}

    preload() {
        const food = this.load.image(
            'food-tiles',
            'assets/images/food/Food.png'
        );
        const background = this.load.spritesheet(
            'gettingFood_bg',
            'assets/images/food/Background.png',
            {
                frameWidth: '100%',
                frameHeight: '100%',
            }
        );
    }

    create() {
        this.background = this.add.sprite(0, 500, 'gettingFood_bg');
        this.GameScene = this.scene.get('Game');
        const homeBtn = this.add.text(20, 20, 'Назад');
        homeBtn.setInteractive();
        homeBtn.on('pointerdown', () => {
            this.scene.switch('Game');
        });

        /**
         * создание карты изображений, от 0 до кол-ва картинок -1 пустое поле
         */
        const foodMap = [
            [0, -1, 1, -1, 2],
            [-1, -1, -1, -1],
            [3, -1, 4, -1, 5],
        ];
        this.map = this.make.tilemap({
            key: 'food',
            data: foodMap,
            tileWidth: 16,
            tileHeight: 16,
        });
        const tileset = this.map.addTilesetImage('food-tiles');
        this.layer = this.map
            .createStaticLayer(
                0,
                tileset,
                this.cameras.main.centerX - 160,
                this.cameras.main.centerY - 25
            )
            .setScale(4, 4);
        this.layer.forEachTile(this.addTitle, this);

        this.moneyAmountTxt = this.add.text(
            120,
            20,
            `Деньги: ${this.GameScene.moneyAmount}`
        );
        this.fulnessBarTxt = this.add.text(
            120,
            60,
            `Сытость: ${this.GameScene.fulness}`
        );
        this.count = 0;
    }

    addTitle(tile) {
        if (tile && tile.index >= 0) {
            Object.assign(tile.properties, { a: FOOD_TYPES[tile.index].name });
            this.add.text(
                this.cameras.main.centerX - 160 + tile.x * 60,
                this.cameras.main.centerY + 50 + tile.y * 70,
                tile.properties.a
            );
        }
    }

    // Добавление попапа
    createDialogWindow(params) {
        if (!this.scene.manager.keys['DialogWindow']) {
            this.dialogWindow = new DialogWindow({
                parent: this,
                width: this.cameras.main.worldView.width,
                height: this.cameras.main.worldView.height / 2,
                bgColor: '#000',
                alpha: 0.8,
                render: this.render,
                renderParams: params,
                viewportX: 0,
                viewportY: this.cameras.main.worldView.height / 6,
            });

            this.scene.add('DialogWindow', this.dialogWindow, true);
        }
    }

    update() {
        if (this.input.activePointer.event.type !== 'touchend') {
            let scenePoint = this.input.activePointer.positionToCamera(
                this.cameras.main
            );
            let pointerTileX = this.map.worldToTileX(scenePoint.x);
            let pointerTileY = this.map.worldToTileY(scenePoint.y);
            let tile = this.layer.getTileAt(pointerTileX, pointerTileY);
            if (tile) {
                this.createDialogWindow({ tile });
            }
        }
        this.moneyAmountTxt.setText(`Деньги: ${this.GameScene.moneyAmount}`);
        this.fulnessBarTxt.setText(`Сытость: ${this.GameScene.fulness}`);
    }

    render(params) {
        const { tile } = params;
        this.add.text(60, 80, `Стоимость еды: ${FOOD_TYPES[tile.index].cost}`, {
            font: 'bold 20px Arial',
        });
        this.add.text(60, 120, `Восстановление сытости: ${FOOD_TYPES[tile.index].fulness}`,  {
                font: 'bold 20px Arial',
            }
        );
        this.feedPetTxt = this.add.text(40, 200, 'Применить', {
            font: 'bold 20px Arial',
        });
        this.cancelTxt = this.add.text(250, 200, 'Отмена', {
            font: 'bold 20px Arial',
        });

        this.feedPetTxt.setInteractive().on('pointerdown', () => {
            this.scene.remove('DialogWindow');

            this.parent.GameScene.feedPet(
                FOOD_TYPES[tile.index].fulness,
                FOOD_TYPES[tile.index].cost
            );
        });

        this.cancelTxt.setInteractive().on('pointerdown', () => {
            this.scene.remove('DialogWindow');
        });
    }
}
