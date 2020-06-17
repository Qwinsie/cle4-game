/// <reference path="../gameobject.ts"/>

class Tree extends GameObject {

    public fixed : boolean = false

    constructor(xStart: number, yStart: number, name: string, game: Game) {
        super(xStart, yStart, name, game)
        super.draw()
   }
    // Fixing the tree
    public update() {
        if(this.fixed) {
            this._div.classList.add("fixed")
            this.fixed = false
        }

        super.update()
    }
}