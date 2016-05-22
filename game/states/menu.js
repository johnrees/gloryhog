"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.preload = function () {
        this.game.load.image('titlescreen', 'assets/images/titlescreen.png');
    };
    Menu.prototype.create = function () {
        var image = this.game.add.sprite(0, 0, 'titlescreen');
        image.inputEnabled = true;
        image.events.onInputDown.addOnce(this.buttonClicked, this);
    };
    Menu.prototype.buttonClicked = function () {
        this.game.state.start('Battle');
    };
    return Menu;
}(Phaser.State));
exports.Menu = Menu;
