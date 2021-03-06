export class Boot extends Phaser.State {
    fontLoaded: boolean = false;

    init() {
      // window['WebFontConfig'] = {
      //     active: () => this.fontLoaded = true,
      //     google: { families: ['Walter Turncoat'] }
      // };
    }

    preload() {
      // this.load.script('webfont',
      //     '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
      this.load.image('loadingBarBg', 'assets/images/loading-bar-bg.png');
      this.load.image('loadingBar', 'assets/images/loading-bar.png');
    }

    create() {
      // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
      // this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      // this.game.scale.maxWidth = 800;
      // this.game.scale.maxHeight = 600;

      this.game.input.maxPointers = 1;
      this.fontLoaded = true;

      // if (!this.game.device.desktop) {
      //   this.scale.forceOrientation(true, false); // Landscape
      //   //this.scale.forceOrientation(false, true); // Portrait
      // }
      //
      // this.scale.pageAlignHorizontally = true;
      // this.scale.pageAlignVertically = true;

      // this.game.world.setBounds(0, 0, 1280, 900);

      //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Use max screen space
    }

    update() {
      if (this.fontLoaded) {
        this.game.state.start('Loading');
      }
    }
}
