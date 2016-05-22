"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Boot = (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        _super.apply(this, arguments);
        this.fontLoaded = false;
    }
    Boot.prototype.init = function () {
    };
    Boot.prototype.preload = function () {
        this.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');
        this.load.image('loadingBar', 'assets/images/loading-bar.png');
    };
    Boot.prototype.create = function () {
        this.game.input.maxPointers = 1;
        this.fontLoaded = true;
    };
    Boot.prototype.update = function () {
        if (this.fontLoaded) {
            this.game.state.start('Loading');
        }
    };
    return Boot;
}(Phaser.State));
exports.Boot = Boot;
