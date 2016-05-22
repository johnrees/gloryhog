"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var boot_1 = require('./states/boot');
var loading_1 = require('./states/loading');
var menu_1 = require('./states/menu');
var battle_1 = require('./states/battle');
var gameover_1 = require('./states/gameover');
var MyGame = (function (_super) {
    __extends(MyGame, _super);
    function MyGame() {
        _super.call(this, 1280, 960, Phaser.CANVAS);
        this.state.add('Boot', boot_1.Boot);
        this.state.add('Loading', loading_1.Loading);
        this.state.add('Menu', menu_1.Menu);
        this.state.add('Battle', battle_1.Battle);
        this.state.add('GameOver', gameover_1.GameOver);
        this.state.start('Boot');
    }
    return MyGame;
}(Phaser.Game));
exports.MyGame = MyGame;
var game = new MyGame();
