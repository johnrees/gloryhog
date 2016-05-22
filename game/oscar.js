"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Oscar = (function (_super) {
    __extends(Oscar, _super);
    function Oscar(game, x, y) {
        _super.call(this, game, x, y, 'oscar', 0);
        game.add.existing(this);
        game.physics.arcade.enableBody(this);
    }
    Oscar.prototype.create = function () {
    };
    return Oscar;
}(Phaser.Sprite));
exports.Oscar = Oscar;
