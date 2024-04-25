// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0


"use strict";

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    scene: [OneDMovementScene], // Add the scene class name into the game config object
    fps: { forceSetTimeOut: true, target: 30 }

};

const game = new Phaser.Game(config);
