/**
 * JS File Compiled in Dist
 * Webpack module activated - Benoit Lamonica
 */

import SnakeGame from "./module/SnakeGame";
import param from "./static/gameparam"

console.log('====================================');
console.log('Snake By Benoit Lamonica - 2021');
console.log('====================================');

const snakeGame = new SnakeGame(param)

snakeGame.run()


