import Rectangle from "@/model/Rectangle";
import Point from "@/model/Point";

describe("Rectangle", () => {
    it('should be instanceable', () => {
        expect(new Rectangle({x: 16, y: 1}, {x: 20, y: 3})).toBeInstanceOf(Rectangle);
    });

    let canvas = new Array(4);
    for (var i = 0; i < canvas.length; i++) {
        canvas[i] = new Array(20);
    }
    describe("drawRectangle", ()=>{
        it('should draw rectangle', function () {
            const rectangle = new Rectangle({x: 16, y: 1}, {x: 20, y: 3});
            rectangle.drawRectangle(canvas, "x");
            for (let i = 15; i < 20; i++) {
                expect(canvas[0][i]).toBe("x");
            }
            for (let i = 15; i < 20; i++) {
                expect(canvas[2][i]).toBe("x");
            }
            for (let i = 0; i < 3; i++) {
                expect(canvas[i][15]).toBe("x");
            }
            for (let i = 0; i < 3; i++) {
                expect(canvas[i][19]).toBe("x");
            }
        });
    });
});