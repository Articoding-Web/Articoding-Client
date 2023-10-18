import * as Phaser from 'phaser';

export default class LevelPlayer extends Phaser.Scene {
  constructor() {
    super("LevelPlayer");
  }
//TODO esta escena llama a LevelEditor y no puede ser. Tiene que cargar el nivel que le pasemos por parametro para
//ejecutar funciones.
  preload() {
    this.load.image("logo", "assets/sprites/logo.png");
  }

  create() {
    const logo = this.add.image(
      this.cameras.main.centerX, 
      this.cameras.main.centerY,
      "logo"
    );
    this.tweens.add({
      targets: logo,
      y: 250,
      duration: 1000,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.input.once(
      "pointerdown",
      function (event) {
        this.scene.start("LevelEditor");
      },
      this
    );

    let runCodeBtn = <HTMLElement>document.getElementById("runCodeBtn");
    runCodeBtn.addEventListener("click", () => this.runCode());
  }

  runCode(){
      let code = globalThis.blocklyController.getCode();
      eval(code);
  }
  //TODO deprecated
  move(steps : number, direction: string) {
    console.log("se esta ejecutando dentro de Menu la siguiente funcion: execmove(", steps, direction,")");
  }
}
