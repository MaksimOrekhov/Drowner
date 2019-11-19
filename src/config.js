import Phaser from 'phaser';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import StartScreen from './scenes/StartScreen';
import GettingFood from './scenes/GettingFood';
import HuntMap from './scenes/HuntMap';
import DialogWindow from './scenes/DialogWindow';

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
    scene: [StartScreen, Game, GameOver, GettingFood, HuntMap],
};

new Phaser.Game(config);
