let config = {
    type: Phaser.AUTO,
    width: 540,
    height: 540,
    autoCenter: true,
    scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config);

// Reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;