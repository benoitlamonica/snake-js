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
        this.direction = null
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
    }

    addChildren = () => {
        if (this.childrens.length === 0) {
            this.childrens.push(new SnakeChildren(this))
        } else {
            this.childrens.push(new SnakeChildren(this.childrens[this.childrens.length - 1]))
        }
    }

    reset = () => {
        this.x = 260
        this.y = 260
        this.lastX = this.x
        this.lastY = this.y
        this.childrens = []
        this.direction = null
        return this
    }

    goDown = () => {
        if (this.direction !== 'up') {
            this.y += this.size
            this.direction = 'down'
        } else {
            this.goUp()
        }
    }

    goUp = () => {
        if (this.direction !== 'down') {
            this.y -= this.size
            this.direction = 'up'
        } else {
            this.goDown()
        }
    }

    goLeft = () => {
        if (this.direction !== 'right') {
            this.x -= this.size
            this.direction = 'left'
        } else {
            this.goRight()
        }
    }

    goRight = () => {
        if (this.direction !== 'left') {
            this.x += this.size
            this.direction = 'right'
        } else {
            this.goLeft()
        }
    }
}