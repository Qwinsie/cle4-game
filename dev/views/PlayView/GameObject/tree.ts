/// <reference path="../gameobject.ts"/>

class Tree extends GameObject {
    // Fields

    public fixed : boolean = false

    // Constructor
    constructor(xStart: number, yStart: number, name : string) {
        super(xStart, yStart, name)
   }

    // Loop Functions
    public update() {
        if(this.fixed) {
            this._div.classList.add("fixed")
            this.fixed = false
        }

        this.move("tree")
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }
}