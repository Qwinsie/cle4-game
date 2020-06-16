/// <reference path="../gameobject.ts"/>

class Tree extends GameObject {

    public fixed : boolean = false

    constructor(xStart: number, yStart: number, name : string) {
        super(xStart, yStart, name)
   }
    // Fixing the tree
    public update() {
        if(this.fixed) {
            this._div.classList.add("fixed")
            this.fixed = false
        }

        super.update("tree")
    }
}