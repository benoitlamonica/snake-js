import FruitEntity from "./FruitEntity";

export default class SpecialFruitEntity extends FruitEntity {

    constructor(ctx, size) {
        super(ctx, size)
        this.color = 'rgb(255, 217, 0)'
        this.exist = false
    }

    create = () => {
        if (this.shouldExist()) {
            this.randomizePosition()
            this.draw()
            this.exist = true
        }
    }

    shouldExist = () => {
        let number = Math.floor(Math.random() * 2);
        return number === 1
    }
}