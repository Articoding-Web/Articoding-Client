import * as Phaser from "phaser";

const TILE_SIZE = 64;
const SPRITE_KEY = '../../../public/assets/sprites/door.json';

export default class LevelEditor extends Phaser.Scene {
  tiles: Phaser.GameObjects.Rectangle[] = [];
  modal: Phaser.GameObjects.Container;

  constructor() {
    super("LevelEditor");
  }

  preload(): void {
    this.load.image("tile", "assets/tiles/tile.png");
    // Load your sprites here
  }

  create(): void {
    this.createGrid();
    this.createModal();

    this.input.on("gameobjectdown", (pointer, gameObject) => {
      this.modal.setVisible(true);
      this.modal.setPosition(gameObject.x, gameObject.y);
    });
  }

  createModal(): void {
    this.modal = this.add.container(0, 0);
    this.modal.setVisible(false);
    // Add your sprites to the modal container
  }

  createGrid(): void {
    const SCREEN_WIDTH = this.cameras.main.width;
    const SCREEN_HEIGHT = this.cameras.main.height;
    const x = (SCREEN_WIDTH - 5 * TILE_SIZE) / 2;
    const y = (SCREEN_HEIGHT - 5 * TILE_SIZE) / 2;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const tile = this.add.rectangle(
          x + i * TILE_SIZE,
          y + j * TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE,
          0x000000
        );
        tile.setInteractive();
        this.tiles.push(tile);
      }
    }

    this.input.on('pointerup', function (pointer) {
      const clickedTile = this.tiles.find(tile =>
        pointer.worldX >= tile.x &&
        pointer.worldX <= tile.x + TILE_SIZE &&
        pointer.worldY >= tile.y &&
        pointer.worldY <= tile.y + TILE_SIZE
      );

      if (clickedTile) {
        this.add.sprite(clickedTile.x, clickedTile.y, SPRITE_KEY);
      }
    }, this);
  }
}
