class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        // Get SFX
        this.load.audio('sfx_select','./assets/blip_select12.wav');
        this.load.audio('sfx_rocket','./assets/rocket_shot.wav');
        this.load.audio('sfx_explosion_1','./assets/explosion (1).wav');
        this.load.audio('sfx_explosion_2','./assets/explosion (2).wav');
        this.load.audio('sfx_explosion_3','./assets/explosion (3).wav');
        this.load.audio('sfx_explosion_4','./assets/explosion.wav');
        this.load.image('rocket','./assets/rocket.png');
    }

    create(){
         // display score
         let menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '20px',
            color: '#D52941',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.char = this.add.image(game.config.width/2, game.config.height/2,'rocket').setScale(9);
        this.add.text(game.config.width/2, borderUISize - borderPadding, 'THE SECOND ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height - borderUISize * 2 - borderPadding, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FFFFFF';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height - borderUISize - borderPadding, 'Press ← for EH or → for COOL', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }
}