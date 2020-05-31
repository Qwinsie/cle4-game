class Enemy2 {

    private enemy2 : HTMLElement

    public _x : number = 0
    public _y : number = 0

    private space : boolean = false
    private spaceKey : number = 0

    private leftspeed : number = 0
    private rightspeed : number = 0

    private y_velo : number = 0
    private jumping : boolean = true

    public canvas : HTMLElement

    constructor(x:number,y:number) {
        this.spaceKey = 88

        this.createEnemy2(x,y)

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
}

    private createEnemy2(x:number,y:number) {
        this.enemy2 = document.createElement("enemy2")
        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.enemy2)

        this._x = x
        this._y = y

        this.enemy2.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public getRectangle() {
        return this.enemy2.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spaceKey:
                this.space = true
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.spaceKey:
                this.space = false
                break
        }
    }

    public update() {
        if(this.jumping == false){
            this.y_velo -= 40;
            this.jumping = true;
        }

        this.y_velo += 1;
        this._y += this.y_velo;
        this.y_velo *= 0.98;

        // Land on the ground
        if(this._y > 600){
            this.jumping = false;
            this._y = 600;
            this.y_velo = 0;
        }

        // Moving Enemy left OR right
        let newX = this._x - this.leftspeed + this.rightspeed

        if (newX < this._x || newX > this._x || this._y <= 600){
            if (newX > 0 && newX < (1440 - this.enemy2.clientWidth)) {
                this._x = newX
            }
            this.enemy2.style.transform = `translate(${this._x}px, ${this._y}px)`
        }
    }
}