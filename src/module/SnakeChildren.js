export default class SnakeChildren {

    constructor(parent) {
        this.parent = parent
        this.x = parent.lastX
        this.y = parent.lastY
        this.ctx = parent.ctx
        this.size = parent.size
        this.lastX = 0
        this.lastY = 0
    }

    updatePosition = () => {
        this.lastX = this.x
        this.lastY = this.y
        this.x = this.parent.lastX
        this.y = this.parent.lastY
        this.updateCanvas()
    }

    updateCanvas = () => {
        this.ctx.clearRect(this.lastX, this.lastY, this.size, this.size);

        this.ctx.beginPath()
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, this.y, this.size, this.size);
        this.ctx.stroke();
    }

}