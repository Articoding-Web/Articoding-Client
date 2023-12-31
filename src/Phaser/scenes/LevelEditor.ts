import * as Phaser from "phaser";

const TILE_SIZE = 100;
const MIN_NUM_TILES = 2;
const MAX_NUM_TILES = 10;
const INITIAL_TILES = 5;

export default class LevelEditor extends Phaser.Scene {
  numRowsInput: HTMLInputElement;
  numColsInput: HTMLInputElement;
  rows: number;
  columns: number;
  tiles: Phaser.GameObjects.Rectangle[] = [];
  modal: Phaser.GameObjects.Container;

  constructor() {
    super("LevelEditor");
  }

  preload(): void {
    this.rows = INITIAL_TILES;
    this.columns = INITIAL_TILES;
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

  createGrid(): void {
    const SCREEN_WIDTH = this.cameras.main.width;
    const SCREEN_HEIGHT = this.cameras.main.height;
    const x = (SCREEN_WIDTH - this.rows * TILE_SIZE) / 2;
    const y = (SCREEN_HEIGHT - this.columns * TILE_SIZE) / 2;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
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
  }

  createModal(): void {
    this.modal = this.add.container(0, 0);
    this.modal.setVisible(false);
    // Add your sprites to the modal container
  }
}
