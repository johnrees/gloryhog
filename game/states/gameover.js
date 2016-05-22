"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        _super.apply(this, arguments);
    }
    GameOver.prototype.create = function () {
        var fontStyle = {
            font: '70px Gotham Black',
            fill: '#7edcfc'
        };
        this.text = this.add.text(this.world.centerX, this.world.centerY, 'PLAY AGAIN?', fontStyle);
        this.text.anchor.setTo(0.5, 0.5);
        this.text.inputEnabled = true;
        this.text.events.onInputDown.addOnce(this.buttonClicked, this);
    };
    GameOver.prototype.buttonClicked = function () {
        this.game.state.start('Battle');
    };
    return GameOver;
}(Phaser.State));
exports.GameOver = GameOver;
