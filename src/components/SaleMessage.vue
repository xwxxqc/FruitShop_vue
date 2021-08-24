<template>
  <div>
    <div id="photo"></div>
  </div>
</template>

<script>
export default {
  name: "SaleMessage",
  data() {
    return {
      data:[]
    };
  },
  created() {
    this.$http.post("/queryAllTImeAndWeightByDate").then((res) => {
    //   console.log(res)
      this.data = res.data;
      var myChart = this.$echarts.init(document.getElementById("photo"));
      myChart.setOption({
        legend: {
          top: "top",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data:this.data
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
  height: 550px;
}
</style>