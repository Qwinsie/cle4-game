/// <reference path="GameObject/robot.ts"/>

class GameObject {

    // Fields
    protected _div : HTMLElement

    protected _x : number = 0
    protected _y : number = 0

    // Properties
    public get div(): HTMLElement           { return this._div }
    public get x(): number                  { return this._x }
    public get y(): number                  { return this._y }

    // Constructor
    constructor(xStart : number, yStart : number, name : string) {
        this.spawn(xStart, yStart, name)
    }

    private spawn(xStart : number, yStart : number, name : string) {
        this._div = document.createElement(`${name}`)
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)
        this._div.id = `${name}`

        this._x = xStart
        this._y = yStart

        console.log(`${name} has been created`);
        
        if (name !== "code") {
            this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
        } else {
            this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(0.2)`
        }
    }

    protected move(name: string) {
        if (name !== "robot") {
            //Hier komt een translate voor alle objecten
            //Daarvoor hebben we hier de xVelo nodig vanuit robot.ts
        }
    }
}