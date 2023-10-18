import Phaser from 'phaser';

export class LaserObject extends Phaser.GameObjects.GameObject {
    orientation : string = 'RIGHT';//por defecto miramos a derecha
    speed : number = 10;
    xCoord : number = 0;
    yCoord : number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        //deberiamos pasar un tablero?
        super(scene, 'laser');
        this.xCoord = x;
        this.yCoord = y;
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
    public fireLaser(){
        //check adjacent object recursively, and shoot.
    }



}
