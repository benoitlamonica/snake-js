export default class FruitEntity {

    constructor(ctx, size) {
        this.ctx = ctx
        this.size = size
        this.color = 'rgb(255, 192, 203)'
        this.x = 1
        this.y = 1
    }

    create = () => {
        this.randomizePosition()
        this.draw()
    }

    draw = () => {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x + (this.size / 2), this.y + (this.size / 2), this.size / 2, 0, 2 * Math.PI)
        this.ctx.fill()
    }

    randomizePosition = () => {
        const gridSize = 500 / this.size
        const x = Math.floor(Math.random() * gridSize) * this.size
        const y = Math.floor(Math.random() * gridSize) * this.size
        this.x = x
        this.y = y
    }
}