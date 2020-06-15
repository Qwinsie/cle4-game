/// <reference path="../gameobject.ts"/>

class Code extends GameObject {

    protected collisionRobotCode: boolean = false

    public collected : boolean = false

    constructor(xStart: number, yStart: number, name : string) {
        super(xStart, yStart, name)
    }

    // Loop Functions
    public update() : void {

        if(this.collected) {
            console.log("collected")
            this._div.remove()
            this.collected = false
        }

        super.update("code")
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public getFutureRectangle(){
        return this._div.getBoundingClientRect()
    }

}