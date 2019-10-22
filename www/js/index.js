import Phaser from 'phaser';

let playerState = {
    hungry: 100
};
let playerView;
let hungryView = '';

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

function preload () {
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
}

function create () {
    playerView = this.add.sprite(100, 450, 'dude');
    hungryView = this.add.text(16, 16, `Score: ${playerState.hungry}`, { fontSize: '32px', fill: 'green' });
}

function update () {

}

