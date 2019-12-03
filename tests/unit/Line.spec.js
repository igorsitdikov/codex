import Line from "@/model/Line.js"

describe("Line", () => {
    it('should be instanceable', () => {
        expect(new Line()).toBeInstanceOf(Line);
    });

    let canvas = new Array(5);
    for (var i = 0; i < canvas.length; i++) {
        canvas[i] = new Array(7);
    }
    describe("drawLine", () => {
        it('should draw horizontal line from low to high index', () => {
            const line = new Line({x: 1, y: 2}, {x: 6, y: 2});
            line.drawLine(canvas, "x");
            for (let x = 0; x < 6; x++) {
                expect(canvas[1][x]).toBe("x");
            }

        });
        it('should draw horizontal line from high to low index', () => {
            const line = new Line({x: 6, y: 2}, {x: 1, y: 2});
            line.drawLine(canvas, "s");
            for (let x = 0; x < 6; x++) {
                expect(canvas[1][x]).toBe("s");
            }
        });
        it('should draw vertical line from low to high index', () => {
            const line = new Line({x: 6, y: 1}, {x: 6, y: 4});
            line.drawLine(canvas, "x");
            for (let y = 0; y < 4; y++) {
                expect(canvas[y][5]).toBe("x");
            }

        });
        it('should draw vertical line from high to low index', () => {
            const line = new Line({x: 6, y: 4}, {x: 6, y: 1});
            line.drawLine(canvas, "s");
            for (let y = 0; y < 4; y++) {
                expect(canvas[y][5]).toBe("s");
            }
        });
        it('should show error if line is not vertical or horizontal', () => {
            const line = new Line({x: 6, y: 4}, {x: 5, y: 1});
            expect(()=> line.drawLine(canvas, "s").toThrow(Error("line must be either vertical or horizontal")))

        });
    })
})