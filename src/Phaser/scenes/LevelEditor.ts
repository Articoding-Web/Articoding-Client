import * as Phaser from "phaser";
import config from "../config";

export default class LevelEditor extends Phaser.Scene {
  tiles: Phaser.GameObjects.Rectangle[] = [];
  private theme: String;
  private height: number;
  private width: number;
  private scaleFactor: number;

  constructor() {
    super("LevelEditor");
  }

  init(...params) {
    const levelJson = params[0];
    this.theme = levelJson.theme || "default";
    this.height = levelJson.height || config.EDITOR_DEFAULT_NUM_TILES;
    this.width = levelJson.width || config.EDITOR_DEFAULT_NUM_TILES;
    // this.backgroundLayerJson = levelJson.layers?.background;
    // this.playersLayerJson = levelJson.layers?.players;
    // this.objectsLayerJson = levelJson.layers?.objects;
  }

  preload(): void {
    // Load all assets from theme
    const themePath = `assets/sprites/${this.theme}`;

    // Load objects
    const player = this.load.image("player", `${themePath}/player.png`);
    const chest = this.load.image("chest", `${themePath}/chest.png`);
    const door = this.load.image("door", `${themePath}/door.png`);
    const wallObject = this.load.image("wallObject", `${themePath}/wall.png`);
    // const playerJSON = this.load.multiatlas(
    //   "player",
    //   `${themePath}/player.json`,
    //   themePath
    // );
    // // Load background
    const background = this.load.multiatlas(
      "background",
      `${themePath}/background.json`,
      themePath
    );

    //TODO revisar los frames, cada 16x16 deberia coger una imagen
    const images: Phaser.GameObjects.Image[] = [];
    const frames = this.textures.get("background").getFrameNames();
    for (const frame of frames) {
      const image = this.add.image(0, 0, "background", frame);
      images.push(image);
    }
  }

  create(): void {
    this.createGrid();
    // this.createModal();

    this.input.on("gameobjectdown", (pointer, gameObject) => {
      //behavior when clicking the tile (menu opens and then yo uchoose sprite)
      //this.modal.setVisible(true);
      // this.modal.setPosition(gameObject.x, gameObject.y);
    });
  }

  // createModal(): void {
  //  /(/) this.modal = this.add.container(0, 0);
  //   this.modal.setVisible(false);
  //   // Add your sprites to the modal container
  // }

  createGrid(): void {
    const SCREEN_WIDTH = this.cameras.main.width;
    const SCREEN_HEIGHT = this.cameras.main.height;

    const layerHeight = this.height * config.TILE_SIZE;
    this.scaleFactor = Math.floor(this.cameras.main.height / layerHeight / 2);

    // Get top left coords.
    const x =
      (SCREEN_WIDTH - this.scaleFactor * this.width * config.TILE_SIZE) / 2;
    const y =
      (SCREEN_HEIGHT - this.scaleFactor * this.height * config.TILE_SIZE) / 2;

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const tile = this.add.rectangle(
          x + i * config.TILE_SIZE * this.scaleFactor,
          y + j * config.TILE_SIZE * this.scaleFactor,
          config.TILE_SIZE * this.scaleFactor,
          config.TILE_SIZE * this.scaleFactor,
          0x000000
        );
        tile.setStrokeStyle(2, 0x1a65ac);
        tile.setInteractive();
        this.tiles.push(tile);
      }
    }

    this.input.on("pointerup", this.addObjMenu, this);
  }

  addObjMenu(pointer) {
    this.createMenus();
    const tempTile = this.tiles[0];
    console.log(tempTile);
    console.log(tempTile.x - tempTile.width);
    console.log(tempTile.y - tempTile.height);
    console.log(tempTile.x + config.TILE_SIZE * this.scaleFactor);
    console.log(tempTile.y + config.TILE_SIZE * this.scaleFactor);

    console.log(pointer.upX);
    console.log(pointer.upY);

    console.log(config.TILE_SIZE * this.scaleFactor);

    const closestTile = this.tiles.reduce((closestTile, tile) => {
      const distanceToTile = Phaser.Math.Distance.Between(pointer.upX, pointer.upY, tile.x, tile.y);
      const distanceToClosestTile = Phaser.Math.Distance.Between(pointer.upX, pointer.upY, closestTile.x, closestTile.y);
      return distanceToTile < distanceToClosestTile ? tile : closestTile;
    });

    const clickedTile = closestTile;
    this.add.image(clickedTile.x, clickedTile.y, "imh");

    // if (clickedTile) {
    //   //LOGICA DE SUELO (NO PUEDO PONER ARTICODINGOBJECT SI NO HAY SUELO)
    //   const assets = {
    //     //meter aqui todos los assets (sprites) para que el container los coja como children

    //   }
    //   const menu = this.add.container(clickedTile.x, clickedTile.y, assets);

    //   // Add sprites to the menu container
    //   const sprite1 = this.add.sprite(0, 0, "sprite1");
    //   const sprite2 = this.add.sprite(50, 0, "sprite2");
    //   const sprite3 = this.add.sprite(0, 50, "sprite3");

    //   // Set sprites as interactive
    //    //   sprite1.setInteractive();
    //   sprite2.setInteractive// ();
    //   sprite3.setInteractive();
    //

    //
    //   // Handle sprite clic// k // events
    //   sprite1.on("po// in// terup", () => {
    //     // Ap// ply sprite1 to the clicked tile
    //   //   clickedTile.setTexture("sprite1");
    //   //     menu.destroy(); // Remove the menu conta// iner
    //   });

    //   sprite2.on("poin// terup", () => {
    //     // Apply sprite2 to the click// ed tile
    //   //   clickedTile.setTexture("sprite2");
    //   //     menu.destroy(); // Remove the menu conta// iner
    //   });

    //   sprite3.on("poin// terup", () => {
    //     // Apply sprite3 to the click// ed tile
    //   //   clickedTile.setTexture("sprite3");
    //   //     menu.destroy(); // Remove the menu conta// iner
    //   });

    //   // Add sprites to t// he menu container
    //   menu.add([sprite1, sprite2, spri// te3]);
    // }
    //  }
  }


  createMenus(): void {
    const backgroundMenu = this.createMenu(["background"]);
    const objectMenu = this.createMenu(["player", "chest", "door"]);
    backgroundMenu.setPosition(450, 300);
    objectMenu.setPosition(650, 500);
  }

  createMenu(spriteNames: string[]): Phaser.GameObjects.Container {
    const menu = this.add.container(0, 0);

    // Create a rectangular menu background
    const menuBackground = this.add.rectangle(0, 0, 200, 150, 0x000000);
    menuBackground.setStrokeStyle(2, 0x1a65ac);
    menu.add(menuBackground);
    const spriteWidth = 50;
    const spriteHeight = 50;
    const padding = 10;
    let x = padding;
    let y = padding;

    for (const spriteName of spriteNames) {
      const sprite = this.add.sprite(x, y, spriteName);
      sprite.setInteractive();
      sprite.on("pointerup", () => {
        //TODO cambiar el sprite del tile  
        //clickedTile.setTexture(spriteName);
      });

      menu.add(sprite);
      x += spriteWidth + padding;
      if (x + spriteWidth + padding > menuBackground.width) {
        x = padding;
        y += spriteHeight + padding;
      }
    }

    return menu;
  }
}
// //
