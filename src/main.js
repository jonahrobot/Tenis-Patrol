/*

Author: Jonah Ryan
Title:  Also Rocket Patrol
Time:   13 hours
Mods:   (New Enemy 15) (Two Player Mode 15) (Timer increases on hit 15)

        (Parallax Background 10) (New Title screen 10) (Texture atlas enemy animations 10)
        (time remaining displayed 10) (4 random explosion sfx 10)

        (New scrolling Tile sprite for background 5)

        (15 + 15 + 15) + (10 + 10 + 10 + 10 + 10) + (5) = 100

Sources: None other than Phaser Documentation and Lecture
*/

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