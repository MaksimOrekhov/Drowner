import Phaser from 'phaser';
import { FOOD_TYPES } from './constants';

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
    }

    create() {
        this.GameScene = this.scene.get('Game');
        const title = this.add.text(
            this.cameras.main.centerX - 60,
            100,
            'Экран кормёжки'
        );
        const homeBtn = this.add.text(20, 20, 'Назад');
        homeBtn.setInteractive();
        homeBtn.on('pointerup', () => {
            this.scene.start('Game');
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
        this.layer.forEachTile(this.callback, this);
        console.log(this.layer);
    }

    callback(tile, i) {
        if (tile && tile.index >= 0) {
            Object.assign(tile.properties, { a: FOOD_TYPES[tile.index].name });
            console.log(i, tile, tile.pixelX, tile.pixelY);
            this.add.text(tile.x * 60, 320 + tile.y * 70, tile.properties.a);
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
    }
}
