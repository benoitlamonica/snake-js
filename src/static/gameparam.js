import FruitEntity from "../module/FruitEntity"
import SpecialFruitEntity from "../module/SpecialFruitEntity"
import SnakeEntity from "../module/SnakeEntity"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const squareMesure = 20

const snake = new SnakeEntity(ctx, squareMesure)
const fruit = new FruitEntity(ctx, squareMesure)
const specialfruit = new SpecialFruitEntity(ctx, squareMesure)

export default { snake, fruit, specialfruit, canvas }