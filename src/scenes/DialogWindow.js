import Phaser from 'phaser';

export class DialogWindow extends Phaser.Scene {
    constructor(parent) {
        super('DialogWindow');
        this.parent = parent;
    }

    create() {
        this.cameras.main.setViewport(150, 150, 250, 250);
        var graphics = this.add.graphics();

        var color = 0xffff00;
        var alpha = 0.5;

        graphics.fillStyle(color, alpha);
        graphics.fillRect(32, 32, 256, 256);
    }

    update() {
    }

    refresh() {
        this.cameras.main.setPosition(this.parent.x, this.parent.y);

        this.scene.bringToTop();
    }
}

export default DialogWindow;
