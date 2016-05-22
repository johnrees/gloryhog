"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        _super.apply(this, arguments);
        this.ready = false;
    }
    Loading.prototype.create = function () {
        var fontStyle = {
            font: '18px Arial',
            fill: '#7edcfc'
        };
        var loadingBarBg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBarBg');
        loadingBarBg.tint = 0x7edcfc;
        loadingBarBg.anchor.setTo(0.5);
        var loadingBar = this.game.add.sprite(this.game.world.centerX - 175, this.game.world.centerY - 16, 'loadingBar');
        loadingBar.tint = 0xdcfc7e;
        this.load.setPreloadSprite(loadingBar);
        this.loadingText = this.add.text(this.world.centerX, this.world.centerY - 30, 'Loading...', fontStyle);
        this.loadingText.anchor.setTo(0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.image('example', 'assets/images/loading-bar.png');
        this.game.load.atlas('player', 'assets/images/player.png', 'assets/images/player.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.game.load.atlas('conductor', 'assets/images/conductor.png', 'assets/images/conductor.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
        this.game.load.tilemap('map', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tilespng', 'assets/images/tiles.png');
        this.game.load.image('tilespng2', 'assets/images/stage2.png');
        this.game.load.image('oscar', 'assets/images/microphone.png');
        this.game.load.audio('song', 'assets/audio/song.m4a');
        this.game.load.audio('speech', 'assets/audio/speech.wav');
        this.game.load.audio('stomp', 'assets/audio/stomp.wav');
        this.game.load.audio('mic', 'assets/audio/mic.wav');
        this.game.load.image('tear', 'assets/images/tear.png');
        this.game.load.image('cloud', 'assets/images/cloud.png');
        this.game.load.image('titlescreen', 'assets/images/titlescreen.png');
        this.game.load.start();
    };
    Loading.prototype.update = function () {
        if (this.ready) {
            this.game.state.start('Menu');
        }
    };
    Loading.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText('Loading... ' + progress + '%');
        if (progress === 100) {
            this.ready = true;
        }
    };
    return Loading;
}(Phaser.State));
exports.Loading = Loading;
