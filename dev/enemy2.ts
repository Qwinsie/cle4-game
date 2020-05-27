class Enemy2 {

    private enemy2 : HTMLElement

    public x : number
    public y : number

    private leftkey: number 
    private rightkey: number
    private space: boolean = false
    private spaceKey: number

    private leftspeed : number = 0
    private rightspeed : number = 0

    private y_velo: number = 0
    private jumping: boolean = true

    public canvas: HTMLElement

    constructor() {
        this.enemy2 = document.createElement("enemy2")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.enemy2)

        this.leftkey = 90
        this.rightkey = 67
        this.spaceKey = 88

        this.x = 1000
        this.y = 600

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.enemy2.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    protected getRectangle() {
        return this.enemy2.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 10
                break
            case this.rightkey:
                this.rightspeed = 10
                break
            case this.spaceKey:
                this.space = true
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftspeed = 0
                break
            case this.rightkey:
                this.rightspeed = 0
                break
            case this.spaceKey:
                this.space = false
                break
        }
    }

    public update() {
        if(this.space && this.jumping == false){
            this.y_velo -= 70;
            this.jumping = true;
        }

        this.y_velo += 1.7;
        this.y += this.y_velo;
        this.y_velo *= 0.9;

        if(this.y > 600){
            this.jumping = false;
            this.y = 600;
            this.y_velo = 0;
        }

        let newX = this.x - this.leftspeed + this.rightspeed
        // check of het monster binnen het beeld blijft
        if (newX > 0 && newX + 100 < (1440 - this.enemy2.clientWidth)){
         this.x = newX
        }
        this.enemy2.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}