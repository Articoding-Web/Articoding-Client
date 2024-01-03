import PhaserController from "./Phaser/PhaserController";
import BlocklyController from "./Blockly/BlocklyController";
import LevelPlayer from "./Phaser/scenes/LevelPlayer";
import LevelEditor from "./Phaser/scenes/LevelEditor";

import createModal from "./utils";
import * as bootstrap from "bootstrap";

// Temp
//import level from './baseLevel.json';

globalThis.blocklyArea = document.getElementById("blocklyArea") as HTMLElement;
globalThis.blocklyDiv = document.getElementById("blocklyDiv") as HTMLDivElement;
globalThis.phaserDiv = document.getElementById("phaserDiv") as HTMLDivElement;

let blocklyToggler = document.getElementById(
  "blocklyToggler"
) as HTMLButtonElement;

class Client {
  blocklyController: BlocklyController;
  phaserController: PhaserController;

  constructor() {
    window.addEventListener("load", (event) => {
      this.addNavbarListeners();
      blocklyToggler.addEventListener("click", (event) => this.toggleBlockly());
    });
  }

  toggleBlockly() {
    if (this.blocklyController.isVisible) {
      this.blocklyController.hideWorkspace();
      globalThis.phaserDiv.classList.add("w-100");
      globalThis.phaserDiv.classList.add("mx-auto");
      globalThis.phaserDiv.classList.remove("col-lg-8");
    } else {
      this.blocklyController.showWorkspace();
      globalThis.phaserDiv.classList.remove("w-100");
      globalThis.phaserDiv.classList.remove("mx-auto");
      globalThis.phaserDiv.classList.add("col-lg-8");
      globalThis.phaserDiv.classList.add("col-lg-8");
    }
  }

  addNavbarListeners() {
    let playBtn = document.getElementById("playBtn");
    playBtn.addEventListener("click", (event) => this.playLevel(1));
    let buildBtn = document.getElementById("buildBtn");
    buildBtn.addEventListener("click", (event) => this.editLevel());
  }

  playLevel(id: number) {
    globalThis.phaserDiv.classList.add("col-lg-8");
    globalThis.phaserDiv.classList.add("mx-auto");
    globalThis.phaserDiv.classList.remove("w-100");

    console.log("PLAYING LEVEL " + id);
    if (this.blocklyController) {
      this.blocklyController.destroy();
    }
    if (this.phaserController) {
      this.phaserController.destroy();
    }
    ////////////////////////////////////////////
    /*
      -- CAMBIO: llamamos a la bbdd (deberia esta en un DAO en el servidor, pero para nuestros propositos, estara aqui)
    */
    //estoy esteando el fetch para que no de error, NO TOCAR
    fetch(`/level/${id}`) // Modified to call /level/1
      .then((response) => response.json())
      .then((level) => {
        //  if (response.ok) {
        //return response.text();
        //implementar para que no entre en then()

        let data = JSON.parse(level.data);
        //await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second (adjust as needed)
        this.phaserController = new PhaserController(
          "LevelPlayer",
          LevelPlayer,
          data.phaser
        );
        this.blocklyController = new BlocklyController(
          data.blockly.toolbox,
          data.blockly.workspaceBlocks
        );
        console.log("SE HA CARGADO EL NIVEL CON NOMBRE: " + level.title);
        globalThis.phaserController = this.phaserController;
        globalThis.blocklyController = this.blocklyController;

        this.blocklyController.showWorkspace();
        blocklyToggler.classList.remove("d-none");
      })
      .catch((err) => {
        console.log(err);
      });

      // TODO: fix
      document.getElementById("phaserDiv").addEventListener("level_complete", e => {
        const eventData = (<any>e).detail;
        this.createMessageModal(eventData.message, eventData.stars, eventData.level_completed)
      });
  }

  editLevel() {
    globalThis.phaserDiv.classList.remove("col-lg-8");
    globalThis.phaserDiv.classList.remove("mx-auto");
    globalThis.phaserDiv.classList.add("w-100");

    if (this.blocklyController) {
      this.blocklyController.destroy();
    }
    if (this.phaserController) {
      this.phaserController.destroy();
    }

    blocklyToggler.classList.add("d-none");

    this.phaserController = new PhaserController("LevelEditor", LevelEditor);
    globalThis.phaserController = this.phaserController;
  }

  createMessageModal(msg, stars, status) {
    const modalElement = createModal(msg, stars, status);

    const playLevelFunction = this.playLevel;

    modalElement.addEventListener("hide.bs.modal", function () {
    modalElement.remove();
      playLevelFunction(2);
    });
  
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }
}

export default new Client();
