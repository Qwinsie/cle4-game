/// <reference path="../gameobject.ts"/>

class Background extends GameObject {

    constructor(xStart: number, yStart: number, name : string) {
        super(xStart, yStart, name)
        super.update("background")
    }
}