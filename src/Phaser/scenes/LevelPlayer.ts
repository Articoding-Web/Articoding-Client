import * as Phaser from 'phaser';
import ArticodingObject from '../Classes/ArticodingObject';
import { Direction } from '../types/Direction';
import env from '../env';

export default class LevelPlayer extends Phaser.Scene {
  froggy: ArticodingObject;
  constructor() {
    super("LevelPlayer");
  }

  /*
    TODO esta escena llama a LevelEditor y no puede ser. 
    Tiene que cargar el nivel que le pasemos por parametro para ejecutar funciones.
  */
  preload() {
    // Load froggy
    this.load.multiatlas(
      "FrogSpriteSheet",
      "assets/sprites/FrogSpriteSheet.json",
      "assets/sprites/"
    );
  }

  create() {
    this.froggy = new ArticodingObject(
      this,
      200,
      500,
      "FrogSpriteSheet",
      "down/SpriteSheet-02.png"
    );

    let runCodeBtn = <HTMLElement>document.getElementById("runCodeBtn");
    runCodeBtn.addEventListener("click", () => this.runCode());
  }

  runCode() {
    let code = globalThis.blocklyController.getCode();
    eval(code);
  }

  move(steps: number, direction: string) {
    console.log("se esta ejecutando dentro de Menu la siguiente funcion: execmove(", steps, direction, ")");

    if(steps == 0)
      return;

    let xMove = env.TILE_SIZE * (direction === Direction.Left ? -1 : (direction === Direction.Right) ? 1 : 0) + this.froggy.x;
    let yMove = env.TILE_SIZE * (direction === Direction.Up ? -1 : (direction === Direction.Down) ? 1 : 0) + this.froggy.y;

    // Move
    this.tweens.add({
      targets: this.froggy,
      x: xMove,
      y: yMove,
      duration: 1000,
      ease: "Sine.inOut",
      onComplete: this.move.bind(this, --steps, direction)
    });
  }
}
