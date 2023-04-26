class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images
        this.load.image('court','./assets/Background/court.png')
        this.load.image('player_main','./assets/Character/player_main.png');
        this.load.image('player_arm','./assets/Character/player_arm.png');
    }

    create(){
        this.p1Score = 0;

        this.court = this.add.image(0,0,'court').setOrigin(0,0);
    
        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'player_arm').setOrigin(0.5,0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'player_main', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'player_main', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'player_main', 0, 10).setOrigin(0,0);

        // Define inputs
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

           // display score
           let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){

        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }else{
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart();
            }
        }
        // Check Collisions
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);   
        }
        if(this.checkCollision(this.p1Rocket,this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);   
        }
        if(this.checkCollision(this.p1Rocket,this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
    }

    checkCollision(rocket, ship){
        // AABB checking
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true;
            }else{
                return false;
            }
    }

    shipExplode(ship){
        ship.alpha = 0;
        
        let boom = this.add.sprite(ship.x,ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}