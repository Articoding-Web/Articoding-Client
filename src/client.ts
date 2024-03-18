import PhaserController from "./Phaser/PhaserController";
import BlocklyController from "./Blockly/BlocklyController";
import LevelPlayer from "./Phaser/LevelPlayer/LevelPlayer";
import LevelEditor from "./Phaser/LevelEditor/LevelEditor";
// Temp
import level from './baseLevel.json';
import { block } from "blockly/core/tooltip";
const BLOCKLY_DIV_ID = "blocklyDiv";

let blocklyController: BlocklyController;
let phaserController: PhaserController;
let currentLevelJSON;

export function startLevel(level) {
  currentLevelJSON = JSON.parse(level.data);

  const toolbox = currentLevelJSON.blockly.toolbox;
  const maxInstances = currentLevelJSON.blockly.maxInstances;
  const workspaceBlocks = currentLevelJSON.blockly.workspaceBlocks;
  const phaserJSON = currentLevelJSON.phaser;

  phaserController = new PhaserController("LevelPlayer", LevelPlayer, phaserJSON);
  blocklyController = new BlocklyController(BLOCKLY_DIV_ID, toolbox, maxInstances, workspaceBlocks);
}

//esta tiene que ser asincrona para poder hacer el fetch
export async function startLevelById(levelId: number) {
  try {
    const response = await fetch(`http://localhost:3001/api/level/${levelId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const level = await response.json();
    blocklyController.destroy();
    phaserController.destroy();
    startLevel(level);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function restartCurrentLevel(blocklyController?) {
  phaserController.destroy();
  blocklyController.destroy();
  const toolbox = currentLevelJSON.blockly.toolbox;
  const maxInstances = currentLevelJSON.blockly.maxInstances;
  const workspaceBlocks = currentLevelJSON.blockly.workspaceBlocks;
  const phaserJSON = currentLevelJSON.phaser;
  phaserController = new PhaserController("LevelPlayer", LevelPlayer, phaserJSON);
  blocklyController = blocklyController || new BlocklyController(BLOCKLY_DIV_ID, toolbox, maxInstances, workspaceBlocks);
}

export function editLevel() {
  phaserController = new PhaserController("LevelEditor", LevelEditor);
}
