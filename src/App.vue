
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <canvas-table :todo="canvas" @clicked="onClickButton"></canvas-table>

    <text-reader @load="[input = $event, readParameters()]"></text-reader>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

// import HelloWorld from './components/HelloWorld.vue'
import CanvasTable from "./components/CanvasTable.vue";
import Point from "./model/Point.js";
import Line from "./model/Line.js";
import Rectangle from "./model/Rectangle.js";
import TextReader from "./components/TextReader.vue";

export default {
  name: "app",
  data: () => ({
    canvas: [],
    input: "",
    output: ""
  }),
  components: {
    CanvasTable,
    TextReader
  },
  methods: {
    onClickButton(value) {
      let point = new Point(value[1], value[0]);

      const newRow = this.$data.canvas[value[0]].slice(0);
      console.log(newRow);
      // update the value
      newRow[value[1]] = "g";
      // update it in the grid
      this.$set(this.$data.canvas, value[0], newRow);
      // this.$data.canvas[value[1],value[0]] = 'g';
      console.log(point);
      // this.bucketFill(point, 'g')
      console.log(value);
    },
    readParameters() {
      let rs = [];
      this.$data.input.split("\n").forEach(element => {
        rs.push(element.split(" "));
      });

      rs.forEach(el => {
        switch (el[0]) {
          case "C":
            {
              this.initTable(parseInt(el[1]), parseInt(el[2]));
              this.keepImage();
            }
            break;
          case "L":
            {
              let start = new Point(parseInt(el[1]), parseInt(el[2]));
              let end = new Point(parseInt(el[3]), parseInt(el[4]));
              let line = new Line(start, end);
              this.drawLine(line);
              this.keepImage();
            }
            break;
          case "R":
            {
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
              this.drawRectangle(rectangle);
              this.keepImage();
            }
            break;
          default: {
            let point5 = new Point(parseInt(el[1]), parseInt(el[2]));
            this.bucketFill(point5, el[3]);
            this.keepImage();
          }
        }
      });
      this.txtToFile(this.$data.output, "result.txt");
    },
    initTable(w, h) {
      this.$data.canvas = new Array(h);
      for (var i = 0; i < this.$data.canvas.length; i++) {
        this.$data.canvas[i] = new Array(w);
      }
    },
    drawLine(line) {
      if (line.start.x === line.end.x) {
        for (let y = line.start.y - 1; y < line.end.y; y++) {
          this.$data.canvas[y][line.start.x - 1] = "x";
        }
      } else if (line.start.y === line.end.y) {
        for (let x = line.start.x - 1; x < line.end.x; x++) {
          this.$data.canvas[line.start.y - 1][x] = "x";
        }
      } else {
        console.log("Wrong input");
      }
    },
    drawRectangle(rectangle) {
      this.drawLine(rectangle.topLine);
      this.drawLine(rectangle.botLine);
      this.drawLine(rectangle.rightLine);
      this.drawLine(rectangle.leftLine);
    },
    keepImage() {
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
    txtToFile(txt, filename) {
      let blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        let link = document.createElement("a");
        if (link.download !== undefined) {
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
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
          this.$data.canvas[_y][_x] !== "x"
        ) {
          this.$data.canvas[_y][_x] = color;

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
