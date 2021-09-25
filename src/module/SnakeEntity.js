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
        this.ctx.fillStyle = 'rgb(92, 56, 83)'
        this.ctx.arc(this.x + (this.size / 2), this.y + (this.size / 2), this.size / 2, 0, 2 * Math.PI)
        this.ctx.fill();


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

    deleteHalfChildrens = () => {
        this.childrens.splice(Math.floor(this.childrens.length / 2), this.childrens.length - 1)
        this.ctx.clearRect(0, 0, 500, 500);
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