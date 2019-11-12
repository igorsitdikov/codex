<template>
  <table>
    <tr v-for="(row,r_index) in todo" :key="r_index">
      <td v-for="(cell,c_index) in row" :key="c_index" @click="getCell(r_index,c_index)">{{cell}}</td>
    </tr>
  </table>
</template>


<script>
export default {
  name: "CanvasTable",
  props: {
    todo: {
      type: Array,
      required: true
    }
  },
//   data: function(){
//       return {cell : this.point}
//   },
  methods: {
    getCell(x,y) {
        this.$emit('clicked', [x,y]);
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  width: 100px;
  height: 108px;
  padding: 0;
  border: 1px solid black;
  text-align: center;
  font-size: 100px;
}

table {
  border-collapse: collapse;
  border: 1px solid black;
}
</style>