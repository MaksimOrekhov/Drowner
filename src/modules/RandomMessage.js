import { PET_MESSAGES } from '../scenes/constants';

class RandomMessage {
    constructor(scene) {
        this.scene = scene;
    }

    getMessage() {
        // брать из массива рандомное выражение
        return PET_MESSAGES[Math.floor(Math.random() * PET_MESSAGES.length)]
    }
}

module.exports = RandomMessage;
