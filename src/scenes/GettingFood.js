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
        homeBtn.on('pointerup', () => {
            this.scene.setVisible(true, 'Game');
            this.scene.stop('GettingFood');
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
        console.log(this.layer);

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
    createWindow() {
        // проверка нет ли уже такого окна
        // из-за того что в апдейте он хуячит (создает) несколько сцен сразу
        if (!this.scene.manager.keys['DialogWindow']) {
            this.scene.add('DialogWindow', DialogWindow, true);
        }
    }

    update() {
        let scenePoint = this.input.activePointer.positionToCamera(
            this.cameras.main
        );
        let pointerTileX = this.map.worldToTileX(scenePoint.x);
        let pointerTileY = this.map.worldToTileY(scenePoint.y);
        let tile = this.layer.getTileAt(pointerTileX, pointerTileY);
        if (tile) {
            switch (tile.index) {
                case FOOD_TYPES[0].index: {
                    this.createWindow();
                    this.GameScene.feedPet(
                        FOOD_TYPES[0].fulness,
                        FOOD_TYPES[0].cost
                    );
                    break;
                }
                case FOOD_TYPES[1].index: {
                    this.GameScene.feedPet(
                        FOOD_TYPES[1].fulness,
                        FOOD_TYPES[1].cost
                    );
                    break;
                }
                case FOOD_TYPES[2].index: {
                    this.GameScene.feedPet(
                        FOOD_TYPES[2].fulness,
                        FOOD_TYPES[2].cost
                    );
                    break;
                }
            }
        }
        this.moneyAmountTxt.setText(`Деньги: ${this.GameScene.moneyAmount}`);
        this.fulnessBarTxt.setText(`Сытость: ${this.GameScene.fulness}`);
    }
}
