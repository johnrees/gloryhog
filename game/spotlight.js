"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Spotlight = (function (_super) {
    __extends(Spotlight, _super);
    function Spotlight(game, player) {
        _super.call(this, game, 0, 0);
        this.player = player;
        game.add.existing(this);
    }
    Spotlight.prototype.followPlayer = function (player) {
        this.player = player;
        this.visible = true;
    };
    Spotlight.prototype.update = function () {
        this.clear();
        this.beginFill(0xFFFFFF, 0.4);
        this.drawCircle(this.player.body.x + 20, this.player.body.y + 10, 160);
    };
    return Spotlight;
}(Phaser.Graphics));
exports.Spotlight = Spotlight;
