class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images
        this.load.image('rocket','./assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');
        this.load.image('smallship','./assets/smallship.png')
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        this.starfield = this.add.tileSprite(0,0,640,480,'starfield').setOrigin(0,0);
        
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'smallship', 0, 100, 6).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 3).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 3).setOrigin(0,0);

        // Define inputs
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyRestart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

           // display score
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'center',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 150
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, p1Score, this.scoreConfig);
        
        if(currentPlayer == 0){
            this.add.text(game.config.width - (borderUISize + borderPadding * 35), borderUISize + borderPadding*2, 'Player 1', this.scoreConfig);
        }else{
            this.add.text(game.config.width - (borderUISize + borderPadding * 35), borderUISize + borderPadding*2, 'Player 2', this.scoreConfig);
        }

        this.timerText = this.add.text(game.config.width - (borderUISize + borderPadding * 20), borderUISize + borderPadding*2, game.settings.gameTimer / 1000, this.scoreConfig);

        this.gameOver = false;

        // 60-second play clock
        this.scoreConfig.fixedWidth = 0;

        this.timer = this.time.addEvent({
            delay: game.settings.gameTimer,
            callback: () => {
                this.gameEnd();
            }
        });

    }

    gameEnd(){
        if(currentPlayer == 0){
            this.add.text(game.config.width/2, game.config.height/2, 'Player 1 ended with: ' + p1Score, this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) for player two', this.scoreConfig).setOrigin(0.5);
            currentPlayer = 1;
        }else{
            this.add.text(game.config.width/2, game.config.height/2, 'Player 2 ended with: ' + p2Score, this.scoreConfig).setOrigin(0.5);

            if(p1Score > p2Score){
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Player 1 WON!!!!', this.scoreConfig).setOrigin(0.5);
            }
            if(p1Score < p2Score){
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'Player 2 WON!!!!', this.scoreConfig).setOrigin(0.5);
            }
            if(p1Score == p2Score){
                this.add.text(game.config.width/2, game.config.height/2 + 32, 'You tied!', this.scoreConfig).setOrigin(0.5);
            }

            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (M) for Menu', this.scoreConfig).setOrigin(0.5);
            currentPlayer = 0;
        }
        p1Score = 0;
        p2Score = 0;
        this.gameOver = true;
    }

    update(){

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();               // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }else{
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                this.scoreLeft.text = 0;
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

        if (this.gameOver && currentPlayer == 0 && Phaser.Input.Keyboard.JustDown(keyRestart)) {
            this.scene.start("menuScene");
        }

        this.timerText.text = ((this.timer.getRemainingSeconds() + "").substring(0,4));
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

        if(currentPlayer == 0){
            p1Score += ship.points;
            this.scoreLeft.text = p1Score;
        }else{
            p2Score += ship.points;
            this.scoreLeft.text = p2Score;
        }
       
        this.sound.play('sfx_explosion');
    }
}