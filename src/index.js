/**
 * JS File Compiled in Dist
 * Webpack module activated - Benoit Lamonica
 */

import FruitEntity from "./module/FruitEntity";
import SnakeGame from "./module/SnakeGame";
import SnakeEntity from "./module/SnakeEntity";

console.log('====================================');
console.log('Snake By Benoit Lamonica - 2021');
console.log('====================================');

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const squareMesure = 20

const snake = new SnakeEntity(ctx, squareMesure)
const fruit = new FruitEntity(ctx, squareMesure)

const snakeGame = new SnakeGame(snake, fruit, canvas)

snakeGame.start()


