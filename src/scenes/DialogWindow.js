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
     * @param {number} viewportX - отступ окна по оси X
     * @param {number} viewportY - отступ окна по оси Y
     */
    constructor({
        parent,
        width,
        height,
        bgColor,
        alpha,
        render,
        renderParams,
        viewportX = 0,
        viewportY = 0,
    }) {
        super('DialogWindow');
        this.parent = parent;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.alpha = alpha;
        this.render = render;
        this.renderParams = renderParams;
        this.viewportX = viewportX;
        this.viewportY = viewportY;
    }

    create() {
        this.cameras.main.setViewport(
            this.viewportX,
            this.viewportY,
            this.width,
            this.height
        );
        let graphics = this.add.graphics();

        let color = this.bgColor;
        let alpha = this.alpha;

        graphics.fillStyle(color, alpha);
        graphics.fillRect(0, 0, this.width, this.height);

        this.render(this.renderParams);
    }

    update() {}
}

export default DialogWindow;
