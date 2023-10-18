import Phaser from 'phaser';
import ArticodingObject from './ArticodingObject';

export class LaserObject extends ArticodingObject {
    orientation : string = 'RIGHT';//por defecto miramos a derecha
    //TODO samu continua esta clase
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'LaserSpriteSheet', 'laser', false, false);
        this.scene = scene;
        this.setInteractive();
        this.scene.input.setDraggable(this);
        this.on("drag", (pointer, dragX, dragY) => this.onDrag(dragX, dragY));
        this.on("dragstart", () => this.onDragStart());
        this.on("dragend", (pointer) => this.onDragEnd());
        this.on("drop", (pointer, dropZone) => this.onDrop(dropZone));
        this.scene.add.existing(this);
    }
    public fire(): void {
        
    }
    //ROTATE
    public rotate(times: number, direction: string): void {
        let directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
        let currentDirectionIndex = directions.indexOf(this.orientation);
        let newDirectionIndex = currentDirectionIndex;

        if (direction === 'LEFT') { newDirectionIndex -= times;
        } else if (direction === 'RIGHT') {
            newDirectionIndex += times;
        }
        newDirectionIndex = (newDirectionIndex + directions.length) % directions.length;
        this.orientation = directions[newDirectionIndex];
    }

    //MOVE
    public move(steps : number, direction: string){
        //get current scene 'TileObject' --> get adjacent tiles and check if empty
        //if empty, move steps amount in direction
    }



}
