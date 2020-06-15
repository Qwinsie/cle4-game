/// <reference path="../gameobject.ts"/>

class Robot extends GameObject {
    // Fields

    private flip : number = 1

    // Inputs
    private downKey : number = 0
    private spaceKey : number = 0
    private spaceKey2 : number = 0

    private duck : boolean = false
    private space : boolean = false

    // Constructor
    constructor(xStart : number, yStart : number, name : string) {        
        super(xStart, yStart, name)

        this.downKey = 83
        this.spaceKey = 32
        this.spaceKey2 = 87


        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    // Loop Functions
    protected onKeyDown(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = true
                break;
            case this.rightKey:
                this.right = true
                break;
            case this.downKey:
                this.duck = true
                break;
            case this.spaceKey:
                this.space = true
                break;
            case this.spaceKey2:
                this.space = true
                break;
        }
    }

    protected onKeyUp(e: KeyboardEvent): void{
        switch (e.keyCode){
            case this.leftKey:
                this.left = false
                break;
            case this.rightKey:
                this.right = false
                break;
            case this.downKey:
                this.duck = false
                break;
            case this.spaceKey:
                this.space = false
                break;
            case this.spaceKey2:
                this.space = false
                break;
        }
    }

    public update(){

        if(this.space && this.jumping == false){
            this.yVelo -= 40;
            this.jumping = true;
        }

        if(this.left){
            this.flip = -1
        }

        if(this.right){
            this.flip = 1
        }

        if(this.duck){
            this._div.classList.add("robot-duck")
        } else {
            this._div.classList.remove("robot-duck")
        }

        this.yVelo += 1.7;
        this._x += this.xVelo;
        this._y += this.yVelo;
        this.xVelo *= 0.9;
        this.yVelo *= 0.9;

        if(this._y > 600 - 16 -32){
            this.jumping = false;
            this._y = 600 - 16 - 32;
            this.yVelo = 0;
        }

        if (this._x < -200){
            this._x = 1240
        } else if(this._x > 1240){
            this._x = -200
        }

        this._div.style.transform = `translate(${this._x}px, ${this._y}px) scaleX(${this.flip})`
    }

    // General Functions
    public getRectangle() {
        return this._div.getBoundingClientRect()
    }

    public getFutureRectangle(){
        let rect = this._div.getBoundingClientRect()
        rect.x += this.xVelo
        return rect
    }
}