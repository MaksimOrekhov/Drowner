import Phaser from 'phaser';

export class DialogWindow extends Phaser.Scene {
    /**
     * @param {object} parent - контекст this
     * @param {number} width - ширина модального окна
     * @param {number} height - высота модального окна
     * @param {string} bgColor - цвет фона окна
     * @param {number} alpha - прозрачность фона
     * @param {function} render - функция для рендера данных в модальном окне
     * @param {object} renderParams - параметры функции для рендера данных в модальном окне
     */
    constructor({ parent, width, height, bgColor, alpha, render, renderParams }) {
        super('DialogWindow');
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.alpha = alpha;
        this.render = render;
        this.renderParams = renderParams;
    }

    create() {
        this.cameras.main.setViewport(0, 0, this.width, this.height);
        var graphics = this.add.graphics();

        var color = this.bgColor;
        var alpha = this.alpha;

        graphics.fillStyle(color, alpha);
        graphics.fillRect(0, 0, this.width, this.height);

        this.render(this.renderParams);
    }

    update() {}

    refresh() {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);

        this.scene.bringToTop();
    }
}

export default DialogWindow;
