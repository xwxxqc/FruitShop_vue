<template>
  <div>
    <div id="photo"></div>
  </div>
</template>

<script>
export default {
  name: "GoodsData",
  data() {
    return {
      font: [],
      data: [],
    };
  },
  created() {
    this.$http.post("/queryAllGoodsAndProfit").then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        this.font.push(res.data[i].name);
        this.data.push(res.data[i].value);
      }
      // console.log(this.font,this.data)
      var myChart = this.$echarts.init(document.getElementById("photo"));
      myChart.setOption({
        title: {
          text: "商品利润",
        },
        xAxis: {
          type: "category",
          data: this.font,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.data,
            type: "line",
            smooth: true,
          },
        ],
      });
    });
  },
};
</script>

<style scoped>
#photo {
  width: 100%;
  height: 500px;
}
</style>