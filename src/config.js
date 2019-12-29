import Phaser from 'phaser';
import BackgroundLogicScene from './scenes/BackgroundLogicScene';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import StartScreen from './scenes/StartScreen';
import GettingFood from './scenes/GettingFood';
import HuntMap from './scenes/HuntMap';
import PetShop from './scenes/PetShop';

const config = {
    width: '100%',
    height: '100%',
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: '100%',
        height: '100%',
    },
    localStorageName: 'phaseres6webpack',
    webfonts: ['Bangers'],
    scene: [
        BackgroundLogicScene,
        StartScreen,
        Game,
        GameOver,
        GettingFood,
        HuntMap,
        PetShop,
    ],
};

new Phaser.Game(config);
