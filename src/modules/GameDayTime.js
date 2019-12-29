class GameDayTime {
    constructor(scene) {
        this.scene = scene;

        this.changeBackForDayOrNight();
    }

    changeBackForDayOrNight() {
        const date = new Date();
        let time = date.getHours();

        if (time >= 18 || time <= 8) {
            this.scene.background.setTexture('forest_night');
        } else {
            this.scene.background.setTexture('forest_day');
        }
    }
}

module.exports = GameDayTime;
