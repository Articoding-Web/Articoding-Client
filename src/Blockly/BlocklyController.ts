import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import blocks from "./Workspace/blocks";
import toolbox from "./Workspace/toolbox";
import * as block_code from "./Workspace/block_code";

export default class BlocklyController {
  blocklyArea = globalThis.blocklyArea;
  blocklyDiv = globalThis.blocklyDiv;
  isVisible: Boolean = false;

  constructor() {
    globalThis.workspace = Blockly.inject(this.blocklyDiv, { toolbox });
    Blockly.defineBlocksWithJsonArray(blocks);
    block_code.defineAllBlocks();
  }

  showWorkspace() {
    globalThis.blocklyArea.classList.remove("d-none");
    window.dispatchEvent(new Event("resize"));
  }

  hideWorkspace() {
    globalThis.blocklyArea.classList.add("d-none");
    this.isVisible = false;
    window.dispatchEvent(new Event("resize"));
  }

  // log() {
  //     console.log(javascriptGenerator.workspaceToCode(globalThis.workspace));
  // }

  getCode() {
    let code = javascriptGenerator.workspaceToCode(globalThis.workspace);
    console.log("code being executed from blocklyController with eval: ", code);
    return code;
  }
}
