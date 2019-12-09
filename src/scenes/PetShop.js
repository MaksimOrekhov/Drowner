import Phaser from 'phaser';
import DialogWindow from './DialogWindow';
import Game from './Game';
import { PETS_PARAMETERS } from './constants';

export default class PetShop extends Phaser.Scene {
    constructor() {
        super('PetShop');
    }

    init() {
        this.getParametersFromLocalStorage();
    }

    preload() {}

    create() {
        this.GameScene = this.scene.get('Game');
        let parameters = JSON.parse(localStorage.getItem('parameters'));

        if (parameters) {
            let goBackBtn = this.add.text(200, 600, 'Назад');
            goBackBtn.setInteractive().on('pointerdown', () => {
                this.scene.switch('Game');
            });
        }
        this.add.text(100, 10, 'Выберите своего питомца');

        this.drowner = this.add.sprite(200, 100, 'drowner');
        this.ghoul = this.add.sprite(100, 270, 'ghoul');
        this.rotfiend = this.add.sprite(300, 270, 'rotfiend');
        this.waterHag = this.add.sprite(100, 440, 'drowner');
        this.fogler = this.add.sprite(300, 440, 'ghoul');

        this.setPetsInteractive();

        this.drowner.play('drowner');
        this.ghoul.play('ghoul');
        this.rotfiend.play('rotfiend');
        this.waterHag.play('drowner');
        this.fogler.play('ghoul');
    }

    update() {
        this.notEnoughMoney &&
            this.dialogWindow.add.text(60, 200, 'У вас недостаточно золота', {
                font: 'bold 20px Arial',
            });
        this.notEnoughMoney = false;
    }

    setPetsInteractive() {
        this.drowner.setInteractive().on('pointerdown', () => {
            this.openDialogWindow({
                id: PETS_PARAMETERS[0].id,
                name: PETS_PARAMETERS[0].name,
                cost: PETS_PARAMETERS[0].cost,
                spriteName: 'drowner',
                spritePath: 'assets/images/bird.png',
            });
        });
        this.ghoul.setInteractive().on('pointerdown', () => {
            this.openDialogWindow({
                id: PETS_PARAMETERS[1].id,
                name: PETS_PARAMETERS[1].name,
                cost: PETS_PARAMETERS[1].cost,
                spriteName: 'ghoul',
                spritePath: 'assets/images/bird2.png',
            });
        });
        this.rotfiend.setInteractive().on('pointerdown', () => {
            this.openDialogWindow({
                id: PETS_PARAMETERS[2].id,
                name: PETS_PARAMETERS[2].name,
                cost: PETS_PARAMETERS[2].cost,
                spriteName: 'rotfiend',
                spritePath: 'assets/images/bird3.png',
            });
        });
        this.waterHag.setInteractive().on('pointerdown', () => {
            this.openDialogWindow({
                id: PETS_PARAMETERS[3].id,
                name: PETS_PARAMETERS[3].name,
                cost: PETS_PARAMETERS[3].cost,
                spriteName: 'waterHag',
                spritePath: 'assets/images/bird.png',
            });
        });
        this.fogler.setInteractive().on('pointerdown', () => {
            this.openDialogWindow({
                id: PETS_PARAMETERS[4].id,
                name: PETS_PARAMETERS[4].name,
                cost: PETS_PARAMETERS[4].cost,
                spriteName: 'fogler',
                spritePath: 'assets/images/bird2.png',
            });
        });
    }

    openDialogWindow(params) {
        if (!this.scene.manager.keys['DialogWindow']) {
            this.dialogWindow = new DialogWindow({
                parent: this,
                width: this.cameras.main.worldView.width,
                height: this.cameras.main.worldView.height / 2,
                bgColor: '0xFF8000',
                alpha: 0.8,
                render: this.render,
                renderParams: params,
                viewportX: 0,
                viewportY: this.cameras.main.worldView.height / 6,
            });

            this.scene.add('DialogWindow', this.dialogWindow, true);
        }
    }

    render(params) {
        const { id, name, cost } = params;
        this.parent.getParametersFromLocalStorage();

        this.add.text(60, 80, `Питомец: ${name}`, {
            font: 'bold 20px Arial',
        });
        this.add.text(60, 120, `Стоимость: ${cost}`, {
            font: 'bold 20px Arial',
        });

        this.add.text(60, 160, `Ваше золото: ${this.parent.moneyAmount}`, {
            font: 'bold 20px Arial',
        });

        if (this.parent.petID !== id && !this.parent.petsInCollection) {
            this.acceptTxt = this.add.text(40, 240, 'Выбрать', {
                font: 'bold 20px Arial',
            });
        }

        this.cancelTxt = this.add.text(250, 240, 'Отмена', {
            font: 'bold 20px Arial',
        });

        let parameters = JSON.parse(localStorage.getItem('parameters'));

        this.acceptTxt &&
            this.acceptTxt.setInteractive().on('pointerup', () => {
                if (this.parent.moneyAmount >= cost) {
                    parameters && this.parent.buyNewPet(cost, id);
                    this.scene.stop('PetShop');
                    this.scene.remove('Game');
                    this.scene.add('Game', new Game(), false);
                    this.scene.start('Game', params);
                    this.scene.remove('DialogWindow');
                } else {
                    this.parent.notEnoughMoney = true;
                }
            });

        this.cancelTxt.setInteractive().on('pointerup', () => {
            this.scene.remove('DialogWindow');
        });
    }

    getParametersFromLocalStorage() {
        let parameters = JSON.parse(localStorage.getItem('parameters'));
        if (parameters) {
            this.moneyAmount = parameters.moneyAmount;
            this.petID = parameters.id;
            this.petsInCollection = parameters.petsInCollection;
        } else {
            this.moneyAmount = 0;
        }
    }

    buyNewPet(cost, id) {
        this.GameScene.moneyAmount -= cost;
        this.GameScene.petsInCollection.push(id);
        this.GameScene.localStorageSetter.setDataToStorage();
    }
}
