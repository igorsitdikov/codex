<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png"/>
        <canvas-table :canvas="canvas" @clicked="onClickDraw"></canvas-table>
        <text-reader @load="[input = $event, readParameters()]"></text-reader>
        <text-writer v-if="created" :url="url" :download="filename"></text-writer>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars */
    import CanvasTable from "./components/CanvasTable.vue";
    import Point from "./model/Point.js";
    import Line from "./model/Line.js";
    import Rectangle from "./model/Rectangle.js";
    import TextReader from "./components/TextReader.vue";
    import TextWriter from "./components/TextWriter";

    export default {
        name: "app",
        data: () => ({
            canvas: [],
            input: "",
            output: "",
            borderColor: "x",
            color: "s",
            url: "",
            filename: "output.txt",
            created: false
        }),
        components: {
            CanvasTable,
            TextReader,
            TextWriter
        },
        methods: {
            onClickDraw(value) {
                let point5 = new Point(parseInt(value[1]), parseInt(value[0]));
                this.bucketFill(point5, this.color);
            },
            readParameters() {
                this.created = false;
                let rs = [];
                this.$data.input.split("\n").forEach(element => {
                    rs.push(element.split(" "));
                });

                rs.forEach(el => {
                    switch (el[0]) {
                        case "C": {
                            this.initTable(parseInt(el[1]), parseInt(el[2]));
                            this.createImage();
                        }
                            break;
                        case "L": {
                            let start = new Point(parseInt(el[1]), parseInt(el[2]));
                            let end = new Point(parseInt(el[3]), parseInt(el[4]));
                            let line = new Line(start, end);
                            line.drawLine(this.$data.canvas, this.borderColor);
                            this.createImage();
                        }
                            break;
                        case "R": {
                            let rectangleTopLeft = new Point(
                                parseInt(el[1]),
                                parseInt(el[2])
                            );
                            let rectangleBotRight = new Point(
                                parseInt(el[3]),
                                parseInt(el[4])
                            );
                            let rectangle = new Rectangle(
                                rectangleTopLeft,
                                rectangleBotRight
                            );
                            rectangle.drawRectangle(this.$data.canvas, this.borderColor);
                            this.createImage();
                        }
                            break;
                        default: {
                            let point5 = new Point(parseInt(el[1]), parseInt(el[2]));
                            this.bucketFill(point5, el[3]);
                            this.createImage();
                        }
                    }
                });
                this.txtToFile(this.$data.output);
                this.created = true;
            },
            initTable(w, h) {
                this.$data.canvas = new Array(h);
                for (var i = 0; i < this.$data.canvas.length; i++) {
                    this.$data.canvas[i] = new Array(w);
                }
            },
            createImage() {
                let output = "";
                for (let i = 0; i < this.$data.canvas.length + 2; i++) {
                    for (let j = 0; j < this.$data.canvas[0].length + 2; j++) {
                        if (
                            i >= 1 &&
                            j >= 1 &&
                            i <= this.$data.canvas.length &&
                            j <= this.$data.canvas[0].length
                        ) {
                            output +=
                                this.$data.canvas[i - 1][j - 1] === undefined
                                    ? " "
                                    : this.$data.canvas[i - 1][j - 1];
                        }
                        if (j === 0) {
                            output += "\n";
                        }
                        if (
                            (j === 0 || j === this.$data.canvas[0].length + 1) &&
                            i >= 1 &&
                            i <= this.$data.canvas.length
                        )
                            output += "|";
                        if (i === 0) output += "-";

                        if (i === this.$data.canvas.length + 1) output += "-";
                    }
                }
                this.$data.output += output;
            },
            txtToFile(txt) {
                let blob = new Blob([txt], {type: "text/plain;charset=utf-8;"});
                this.url = URL.createObjectURL(blob);
            },
            bucketFill(point, color) {
                let x = point.x;
                let y = point.y;
                let stack = [];
                stack.push([x, y]);

                while (stack.length > 0) {
                    let pixel = stack.pop();

                    let _x = pixel[0];
                    let _y = pixel[1];

                    if (
                        _x < 0 ||
                        _x >= this.$data.canvas[0].length ||
                        _y < 0 ||
                        _y >= this.$data.canvas.length
                    ) {
                        continue;
                    }

                    if (
                        this.$data.canvas[_y][_x] !== color &&
                        this.$data.canvas[_y][_x] !== this.borderColor
                    ) {
                        const newRow = this.$data.canvas[_y].slice(0);
                        newRow[_x] = color;
                        this.$set(this.$data.canvas, _y, newRow);

                        stack.push([_x - 1, _y]);
                        stack.push([_x, _y - 1]);
                        stack.push([_x, _y + 1]);
                        stack.push([_x + 1, _y]);
                    }
                }
            }
        }
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
