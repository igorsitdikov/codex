class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    _checkArgs(start, end) {
        if (start.x !== end.x && start.y !== end.y) {
            throw new Error("line must be either vertical or horizontal");
        }
    }

    drawLine(canvas, color) {
        this._checkArgs(this.start, this.end);
        if (this.start.x === this.end.x) {
            if (this.start.y <= this.end.y) {
                for (let y = this.start.y - 1; y < this.end.y; y++) {
                    canvas[y][this.start.x - 1] = color;
                }
            } else {
                for (let y = this.end.y - 1; y < this.start.y; y++) {
                    canvas[y][this.start.x - 1] = color;
                }
            }

        } else if (this.start.y === this.end.y) {
            if (this.start.x <= this.end.x) {
                for (let x = this.start.x - 1; x < this.end.x; x++) {
                    canvas[this.start.y - 1][x] = color;
                }
            } else {
                for (let x = this.end.x - 1; x < this.start.x; x++) {
                    canvas[this.start.y - 1][x] = color;
                }
            }
        }
    }
}

export default Line;