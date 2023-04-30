'use strict';

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    autoCenter: true,
    pixelArt: true,
    backgroundColor: '#FCD581',
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// Reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyRestart;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

this.currentPlayer = 0;
this.p1Score = 0;
this.p2Score = 0;