/// <reference path="GameObject/robot.ts"/>

class GameObject {

    // Fields
    protected _div: HTMLElement

    protected _x: number = 0
    protected _y: number = 0

    public xVelo: number = 0
    protected yVelo: number = 0

    protected leftKey: number = 0
    protected rightKey: number = 0

    protected left: boolean = false
    protected right: boolean = false

    protected jumping: boolean = true
    protected xscale: number = 1
    protected yscale: number = 1

    protected gameInstance: Game
    private _name: string
    private backgroundmoving: boolean = true

    // Properties
    public get div(): HTMLElement { return this._div }
    public get x(): number { return this._x }
    public get y(): number { return this._y }
    // public get name(): string { return this._name }

    // Constructor
    constructor(xStart: number, yStart: number, name: string, game: Game) {
        this.spawn(xStart, yStart, name)

        this.gameInstance = game
        this._name = name
        this.leftKey = 65
        this.rightKey = 68

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.draw()
    }

    private spawn(xStart: number, yStart: number, name: string) {

        this._div = document.createElement(name)

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._div.id = name

        this._x = xStart
        this._y = yStart

        console.log(`${name} has been created`);
    }

    protected onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftKey:
                this.left = true
                break;
            case this.rightKey:
                this.right = true
                break;
        }
    }

    protected onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftKey:
                this.left = false
                break;
            case this.rightKey:
                this.right = false
                break;
        }
    }

    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public update() {
        // dit is een demo - echter, het geeft nog teveel issues om helemaal werkend te krijgen
        let bgmoving = this.gameInstance.checkBackgroundCanmove(this.left, this.right)
        if (bgmoving) {
            // alles behalve de robot beweegt
            if (this._name !== "robot") {
                if (this.left) {
                    this.xVelo += 1;
                }
                if (this.right) {
                    this.xVelo -= 1;
                }
            }
        } else {
            // alleen de robot beweegt
            // PROBLEEEM : enemies bewegen niet meer up en down
            // dit is waarom je de enemies en de boom BINNEN de BG div wil plaatsen...
            if (this._name === "robot") {
                
                if (this.right) {
                    this.xVelo += 1
                }
                
                if (this.left) {
                    this.xVelo -= 1
                }
            }
        }

        // Standard velocity values for all gameobjects, except robot 
        this._x += this.xVelo
        this.xVelo *= 0.9
        this.draw()
    }

    
    protected draw() {
        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scale(${this.xscale}, ${this.yscale})`
    }
}