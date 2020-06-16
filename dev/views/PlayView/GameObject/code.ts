/// <reference path="../gameobject.ts"/>

class Code extends GameObject {

    protected collisionRobotCode: boolean = false

    public collected : boolean = false

    constructor(xStart: number, yStart: number, name : string) {
        super(xStart, yStart, name)
    }

    // Loop Functions
    public update() : void {
        // When Code is collected, remove the div.
        if(this.collected) {
            console.log("collected")
            this._div.remove()
            this.collected = false
        }

        super.update("code")
    }

    public getFutureRectangle(){
        return this._div.getBoundingClientRect()
    }

}