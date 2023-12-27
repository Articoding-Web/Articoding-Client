import PhaserController from "./Phaser/PhaserController";
import BlocklyController from "./Blockly/BlocklyController";
import LevelPlayer from "./Phaser/scenes/LevelPlayer";
import LevelEditor from "./Phaser/scenes/LevelEditor";

// Temp
//import level from './baseLevel.json';

globalThis.blocklyArea = document.getElementById("blocklyArea") as HTMLElement;
globalThis.blocklyDiv = document.getElementById("blocklyDiv") as HTMLDivElement;
globalThis.phaserDiv = document.getElementById("phaserDiv") as HTMLDivElement;

let blocklyController: BlocklyController;
let phaserController: PhaserController;
let blocklyToggler = document.getElementById(
  "blocklyToggler"
) as HTMLButtonElement;

class Client {
  constructor() {
    window.addEventListener("load", (event) => {
      this.addNavbarListeners();
      blocklyToggler.addEventListener("click", (event) => this.toggleBlockly());
    });
  }

  toggleBlockly() {
    if (blocklyController.isVisible) {
      blocklyController.hideWorkspace();
      globalThis.phaserDiv.classList.add("w-100");
      globalThis.phaserDiv.classList.add("mx-auto");
      globalThis.phaserDiv.classList.remove("col-lg-8");
    } else {
      blocklyController.showWorkspace();
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
    console.log("PLAYING LEVEL " + id);
    if(blocklyController){blocklyController.destroy();}
    if(phaserController){phaserController.destroy();}
    ////////////////////////////////////////////
    /*
      -- CAMBIO: llamamos a la bbdd (deberia esta en un DAO en el servidor, pero para nuestros propositos, estara aqui)
    */
    //estoy esteando el fetch para que no de error, NO TOCAR
    fetch(`/level/${id}`) // Modified to call /level/1
      .then((response) => response.json())
      .then( (level) => {
        //  if (response.ok) {
          //return response.text(); 
          //implementar para que no entre en then()
        
        let data = JSON.parse(level.data);
        console.log("parsed json: ", data);
        //await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second (adjust as needed)
        phaserController = new PhaserController("LevelPlayer", LevelPlayer, data.phaser);
        blocklyController = new BlocklyController(data.blockly.toolbox, data.blockly.workspaceBlocks);
        console.log("SE HA CARGADO EL NIVEL CON NOMBRE: " + level.title);
        globalThis.phaserController = phaserController;
        globalThis.blocklyController = blocklyController;

        blocklyController.showWorkspace();
        blocklyToggler.classList.remove("d-none");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editLevel() {
    blocklyToggler.classList.add("d-none");

    blocklyController.destroy();
    phaserController.destroy();
    phaserController = new PhaserController("LevelEditor", LevelEditor);
    globalThis.phaserController = phaserController;
  }
}
function callPlayLevel(id: number) {
  let client = new Client();
  client.playLevel(id);
}

export { callPlayLevel };

export default new Client();
