export default class FruitEntity {

    constructor(ctx, size) {
        this.ctx = ctx
        this.size = size
        this.x = 1
        this.y = 1
    }

    create = () => {
        this.randomizePosition()

        this.ctx.beginPath()
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
        this.ctx.stroke();
    }

    randomizePosition = () => {
        const gridSize = 500 / this.size
        let x = Math.floor(Math.random() * gridSize) * this.size
        let y = Math.floor(Math.random() * gridSize) * this.size
        this.x = x
        this.y = y
    }
}