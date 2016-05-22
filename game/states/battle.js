"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var player_1 = require('../player');
var spotlight_1 = require('../spotlight');
var oscar_1 = require('../oscar');
var Battle = (function (_super) {
    __extends(Battle, _super);
    function Battle() {
        _super.apply(this, arguments);
        this.secondsRemaining = 15;
    }
    Battle.prototype.pairwise = function (list) {
        if (list.length < 2) {
            return [];
        }
        var first = list[0], rest = list.slice(1), pairs = rest.map(function (x) { return [first, x]; });
        return pairs.concat(this.pairwise(rest));
    };
    Battle.prototype.preload = function () {
        this.game.stage.backgroundColor = '#7D4545';
    };
    Battle.prototype.create = function () {
        this.stomp = this.game.add.audio('stomp');
        this.speech = this.game.add.audio('speech');
        this.music = this.game.add.audio('song');
        this.mic = this.game.add.audio('mic');
        this.music.loop = true;
        this.musicVolume = 0.3;
        this.game.time.advancedTiming = true;
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'tilespng');
        this.map.addTilesetImage('foreground', 'tilespng2');
        this.layer2 = this.map.createLayer('Tile Layer 2');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer3 = this.map.createLayer('platforms');
        this.layer.visible = false;
        this.map.setCollision(1, true, this.layer3);
        this.map.setCollision(2, true, this.layer);
        this.layer3.resizeWorld();
        var cursors = this.game.input.keyboard.createCursorKeys();
        this.players = [
            new player_1.Player(this.game, 150, 200, this.game.input.keyboard.addKey(Phaser.Keyboard.J), this.game.input.keyboard.addKey(Phaser.Keyboard.L), true, this.game.input.keyboard.addKey(Phaser.Keyboard.I)),
            new player_1.Player(this.game, 550, 200, this.game.input.keyboard.addKey(Phaser.Keyboard.A), this.game.input.keyboard.addKey(Phaser.Keyboard.D), false, this.game.input.keyboard.addKey(Phaser.Keyboard.W)),
            new player_1.Player(this.game, 750, 200, this.game.input.keyboard.addKey(Phaser.Keyboard.F), this.game.input.keyboard.addKey(Phaser.Keyboard.H), false, this.game.input.keyboard.addKey(Phaser.Keyboard.T))
        ];
        var x = 0;
        while (x === 0) {
            x = this.game.rnd.integerInRange(100, 1100);
            for (var i = 0; i < this.players.length; i++) {
                if (Math.abs(this.players[i].body.x - x) < 150) {
                    x = 0;
                }
            }
        }
        var y = 0;
        while (y === 0) {
            y = this.game.rnd.integerInRange(100, 600);
            for (var i = 0; i < this.players.length; i++) {
                if (Math.abs(this.players[i].body.y - y) < 20) {
                    y = 0;
                }
            }
        }
        this.oscar = new oscar_1.Oscar(this.game, x, y);
        var topLayer = this.map.createLayer('Tile Layer 4');
        topLayer.alpha = 0.8;
        this.spotlight = new spotlight_1.Spotlight(this.game, this.oscar);
        this.playerPairs = this.pairwise(this.players);
        this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        this.game.physics.arcade.gravity.y = 1700;
        this.game.physics.arcade.checkCollision.down = false;
        this.conductor = this.game.add.sprite(600, 830, 'conductor');
        this.conductor.animations.add('conducting', [0, 1, 2, 3, 4, 5, 6, 7], 1, true);
        var fontStyle = {
            font: '80px Gotham Black',
            fill: 'white'
        };
        this.countdownText = this.game.add.text(643, 40, "", fontStyle);
        this.countdownText.anchor.setTo(0.5, 0);
        this.timer = this.game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.secondsRemaining, this.endTimer, this);
        this.emitter = this.game.add.emitter(0, 0, 30);
        this.emitter.makeParticles('tear');
        this.emitter.gravity = 10;
    };
    Battle.prototype.endTimer = function () {
        this.music.stop();
        this.game.state.start('GameOver');
    };
    Battle.prototype.collectOscar = function (player, oscar) {
        this.conductor.animations.play('conducting');
        oscar.destroy();
        this.holdingPlayer = player;
        this.emitter.x = this.holdingPlayer.body.x + 5;
        this.emitter.y = this.holdingPlayer.body.y + 15;
        this.emitter.minParticleSpeed.setTo(-350);
        this.emitter.maxParticleSpeed.setTo(100);
        this.emitter.flow(1000, 100, 2, -1);
        player.body.y -= 30;
    };
    Battle.prototype.hitPlayer = function (player1, player2, recursive) {
        if (recursive === void 0) { recursive = true; }
        if (player1.body.y > player2.body.y + 55) {
            this.stomp.play();
            player2.body.velocity.y = -600;
            if (player1.state === "HOLDING") {
                this.holdingPlayer = player2;
            }
            var x = 0;
            while (x === 0) {
                x = this.game.rnd.integerInRange(100, 1100);
                for (var i = 0; i < this.players.length; i++) {
                    if (Math.abs(this.players[i].body.x - x) < 150) {
                        x = 0;
                    }
                }
                player1.respawn(x);
            }
        }
        else if (recursive) {
            this.hitPlayer(player2, player1, false);
        }
    };
    ;
    Battle.prototype.update = function () {
        if (this.holdingPlayer && this.holdingPlayer.body) {
            this.emitter.x = this.holdingPlayer.body.x + 15;
            this.emitter.y = this.holdingPlayer.body.y + 10;
        }
        this.musicVolume += 0.01;
        this.speech.volume = Math.min(this.speech.volume + 0.01, 0.6);
        this.game.physics.arcade.collide(this.oscar, this.layer);
        this.game.physics.arcade.collide(this.oscar, this.layer3);
        if (this.timer.running) {
            this.countdownText.text = Math.round((this.timerEvent.delay - this.timer.ms) / 1000).toString();
        }
        for (var i = 0; i < this.players.length; i++) {
            this.game.physics.arcade.collide(this.players[i], this.layer);
            this.game.physics.arcade.collide(this.players[i], this.layer3);
            this.game.physics.arcade.overlap(this.players[i], this.oscar, this.collectOscar, null, this);
        }
        for (var i = 0; i < this.playerPairs.length; i++) {
            this.game.physics.arcade.collide(this.playerPairs[i][0], this.playerPairs[i][1], this.hitPlayer, null, this);
        }
    };
    Battle.prototype.render = function () {
        this.game.debug.text(this.game.time.fps.toString(), 200, 20, "#ff0000");
    };
    Object.defineProperty(Battle.prototype, "musicVolume", {
        get: function () {
            return this.music.volume;
        },
        set: function (val) {
            this.music.volume = Math.max(val, 0.5);
            var conductorSpeed = Math.max(val * 30, 0);
            if (conductorSpeed == 0) {
            }
            else {
                if (this.conductor && this.conductor.animations.currentAnim) {
                    this.conductor.animations.paused = false;
                    this.conductor.animations.currentAnim.speed = conductorSpeed;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Battle.prototype, "holdingPlayer", {
        get: function () {
            return this._holdingPlayer;
        },
        set: function (val) {
            this._holdingPlayer = val;
            val.state = "HOLDING";
            this.spotlight.followPlayer(val);
            this.musicVolume = 0.7;
            this.music.play();
            this.speech.volume = 0.1;
            this.speech.play();
            this.mic.play();
            if (this.timer.running) {
                this.timer.stop(false);
            }
            this.timer.start();
            this.countdownText.text = Math.round((this.timerEvent.delay - this.timer.ms) / 1000).toString();
        },
        enumerable: true,
        configurable: true
    });
    return Battle;
}(Phaser.State));
exports.Battle = Battle;
