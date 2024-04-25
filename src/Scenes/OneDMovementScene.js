class OneDMovementScene extends Phaser.Scene {
    constructor() {
        super('OneDMovementScene');
        this.playerSpeed = 5; // Speed of player movement
        this.playerX = 400;
        this.playerY = 600;
        this.emittedSpriteSpeed = 3; // Speed of emitted sprite movement
        this.emittedSpriteActive = false; // Flag to track if emitted sprite is active
    }

    preload() {
        this.load.image('player', 'assets/character_squarePurple.png');
        this.load.image('emittedSprite', 'assets/ui_numXlarge.png');
    }

    create() {
        this.player = this.add.sprite(this.playerX, this.playerY, 'player');
        this.player.setOrigin(0.5, 1); // Set origin to bottom center

        this.input.keyboard.on('keydown-A', () => {
            this.player.x -= this.playerSpeed;
            this.player.setFlipX(false); // Face left
            // Ensure player does not go off the left edge
            this.player.x = Phaser.Math.Clamp(this.player.x, this.player.width / 2, this.game.config.width - this.player.width / 2);
        });

        this.input.keyboard.on('keydown-D', () => {
            this.player.x += this.playerSpeed;
            this.player.setFlipX(true); // Face right
            // Ensure player does not go off the right edge
            this.player.x = Phaser.Math.Clamp(this.player.x, this.player.width / 2, this.game.config.width - this.player.width / 2);
        });

        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.emittedSpriteActive) {
                this.emittedSprite = this.add.sprite(this.player.x, this.player.y - 50, 'emittedSprite');
                this.emittedSpriteActive = true;
            }
        });
    }

    update() {
        // Move emitted sprite upwards
        if (this.emittedSpriteActive) {
            this.emittedSprite.y -= this.emittedSpriteSpeed;
            // Check if emitted sprite is out of bounds
            if (this.emittedSprite.y < -this.emittedSprite.height) {
                this.emittedSprite.destroy();
                this.emittedSpriteActive = false;
            }
        }
    
        // Emit sprite when space bar is pressed
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 500)) {
            if (!this.emittedSpriteActive) {
                this.emittedSprite = this.add.sprite(this.player.x, this.player.y - 50, 'emittedSprite');
                this.emittedSprite.setOrigin(0.5, 1); // Set origin to bottom center
                this.emittedSpriteActive = true;
            }
        }
    }    
}
