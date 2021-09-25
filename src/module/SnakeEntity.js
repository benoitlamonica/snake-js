import SnakeChildren from "./SnakeChildren"

export default class SnakeEntity {

    constructor(ctx, snakeSize) {
        this.ctx = ctx
        this.size = snakeSize
        this.x = 260
        this.y = 260
        this.lastX = this.x
        this.lastY = this.y
        this.childrens = []
    }

    updateCanvas = () => {
        this.ctx.clearRect(this.lastX, this.lastY, this.size, this.size);
        this.childrens.forEach(children => children.updatePosition())

        //Creating new square
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.ctx.stroke();


        this.lastX = this.x
        this.lastY = this.y

        console.table({
            X: this.x,
            Y: this.y
        })
    }

    addChildren = () => {
        if (this.childrens.length === 0) {
            this.childrens.push(new SnakeChildren(this))
        } else {
            this.childrens.push(new SnakeChildren(this.childrens[this.childrens.length - 1]))
        }
    }

    goDown = () => {
        this.y += this.size
    }

    goUp = () => {
        this.y -= this.size
    }

    goLeft = () => {
        this.x -= this.size
    }

    goRight = () => {
        this.x += this.size
    }
}