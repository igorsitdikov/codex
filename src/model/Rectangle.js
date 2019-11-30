import Point from './Point.js'
import Line from './Line.js'

class Rectangle {
    constructor(topLeft, botRight) {
        this.topLeft = topLeft;
        this.botRight = botRight;
        this.topRight = new Point(this.botRight.x, this.topLeft.y);
        this.botLeft = new Point(this.topLeft.x, this.botRight.y);

        this.topLine = new Line(this.topLeft, this.topRight);
        this.botLine = new Line(this.botLeft, this.botRight);
        this.rightLine = new Line(this.topLeft, this.botLeft);
        this.leftLine = new Line(this.topRight, this.botRight);
    }

    drawRectangle(canvas, color) {
        this.topLine.drawLine(canvas, color);
        this.botLine.drawLine(canvas, color);
        this.rightLine.drawLine(canvas, color);
        this.leftLine.drawLine(canvas, color);
    }

    toString() {
        console.log(`${this.topLeft.toString()}; ${this.topRight.toString()}; ${this.botLeft.toString()}; ${this.botRight.toString()}`)
    }
}

export default Rectangle;