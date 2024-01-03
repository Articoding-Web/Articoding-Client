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
    this.scaleFactor = Math.floor((this.cameras.main.height) / layerHeight / 2);

    const x = (SCREEN_WIDTH - this.scaleFactor * this.width * config.TILE_SIZE) / 2;
    const y = (SCREEN_HEIGHT - this.scaleFactor * this.height * config.TILE_SIZE) / 2;

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

    this.input.on('pointerup', function (pointer) {
      const clickedTile = this.tiles.find(tile => 
        pointer.worldX >= tile.x - tile._displayOriginX &&
        pointer.worldX <= tile.x - tile._displayOriginX + config.TILE_SIZE * this.scaleFactor &&
        pointer.worldY >= tile.y - tile._displayOriginY &&
        pointer.worldY <= tile.y - tile._displayOriginY + config.TILE_SIZE * this.scaleFactor
      );

      if (clickedTile) {
        //lanzar menu:
        //////////////////////////////////////////////
        let menu = `<div class="modal" id="AssetMenu" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`;
      let modal = document.createElement("div");
      modal.innerHTML = menu;
      document.body.appendChild(modal);
      document.querySelector("#AssetMenu");
      console.log("modal loaded & launched");
      ////////////////////////////////////
        this.add.sprite(clickedTile.x, clickedTile.y, "null");
      }
    }, this);
  }
}
