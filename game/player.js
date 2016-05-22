"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(game, x, y, leftButton, rightButton, local, jumpButton) {
        if (local === void 0) { local = false; }
        if (jumpButton === void 0) { jumpButton = null; }
        _super.call(this, game, x, y, 'player', 0);
        this.jumpCount = 0;
        this.leftDownAt = 0;
        this.rightDownAt = 0;
        this.jumpHeight = 400;
        this.ms = 0;
        this.rightButton = rightButton;
        this.leftButton = leftButton;
        game.physics.arcade.enableBody(this);
        game.add.existing(this);
        this.body.setSize(30, 60, 16, 28);
        this.jumpButton = jumpButton;
        this.jumpButton.onDown.add(this.jumpCheck, this);
    }
    Player.prototype.jumpCheck = function () {
        if (this.jumpCount < 2) {
            this.jumpCount++;
            this.body.velocity.y = (this.jumpCount == 2) ? -650 : -550;
        }
    };
    Player.prototype.checkOverlap = function (spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    };
    Player.prototype.respawn = function (x) {
        if (x === void 0) { x = this.game.rnd.integerInRange(90, 1150); }
        this.state = "SEEKING";
        this.body.y = 200;
        this.body.x = x;
    };
    Player.prototype.create = function () {
        this.canJump = true;
        this.body.fixedRotation = true;
        this.body.collideWorldBounds = true;
        this.body.maxVelocity.y = 800;
        this.anchor.set(0.5);
    };
    Player.prototype.update = function () {
        this.ms = new Date().getTime();
        if (this.state == "HOLDING") {
            this.frame = 2;
        }
        else {
            this.frame = 1;
        }
        if (this.leftButton.isDown) {
            this.direction = "L";
        }
        else if (this.rightButton.isDown) {
            this.direction = "R";
        }
        else {
            this.direction = "";
        }
        if (this.direction === "R") {
            this.body.velocity.x = 500;
        }
        else if (this.direction === "L") {
            this.body.velocity.x = -500;
        }
        else if (this.direction === "") {
            this.body.velocity.x = 0;
        }
        if (this.body.blocked.down || this.body.touching.down) {
            this.jumpCount = 0;
        }
    };
    Object.defineProperty(Player.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (val) {
            this._state = val;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}(Phaser.Sprite));
exports.Player = Player;
