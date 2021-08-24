<template>
  <div class="main">
    <el-card class="box-card">
      <el-dropdown @command="handleCommand">
        <el-button type="primary">
          选择图表类型<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="goodsInventory"
            >商品余量分析</el-dropdown-item
          >
          <el-dropdown-item command="saleWeightPercentage"
            >销售数量占比</el-dropdown-item
          >
          <el-dropdown-item command="monthSaleMoney"
            >本月商品销售额</el-dropdown-item
          >
          <el-dropdown-item command="monthProfit"
            >三十天内利润</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-card>
    <div id="cost"></div>
  </div>
</template>

<script>
export default {
  name: "CostData",
  data() {
    return {
      font: [],
      data: [],
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "goodsInventory") {
        this.$http.post("/queryGoodsInventoryForEcharts").then((res) => {
          this.font = [];
          this.data = [];
          for (var i = 0; i < res.data.goodsInventories.length; i++) {
            this.font.push(res.data.goodsInventories[i].name);
            this.data.push(res.data.goodsInventories[i].remaining);
          }
          //   console.log(this.font, this.data);
          var myChart = this.$echarts.init(document.getElementById("cost"));
          myChart.setOption({
            title: {
              text: "商品余量分析",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc",
              },
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
              },
            ],
          });
        });
      }
      if (command == "saleWeightPercentage") {
        this.$http.post("/querySaleWeightPercentage").then((res) => {
          // console.log(res)
          const result = res.data.percentage;
          var myChart = this.$echarts.init(document.getElementById("cost"));
          myChart.setOption({
            backgroundColor: "#2c343c",

            title: {
              text: "商品销售占比图",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc",
              },
            },

            tooltip: {
              trigger: "item",
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1],
              },
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: "55%",
                center: ["50%", "50%"],
                data: result.sort(function (a, b) {
                  return a.value - b.value;
                }),
                roseType: "radius",
                label: {
                  color: "rgba(255, 255, 255, 0.3)",
                },
                labelLine: {
                  lineStyle: {
                    color: "rgba(255, 255, 255, 0.3)",
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20,
                },
                itemStyle: {
                  color: "#c23531",
                  shadowBlur: 200,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },

                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: function (idx) {
                  return Math.random() * 200;
                },
              },
            ],
          });
        });
      }
      if (command == "monthSaleMoney") {
        this.$http.post("/queryMonthGoodsSaleMoney").then((res) => {
          // console.log(res);
          this.font = [];
          this.data = [];
          for (var i = 0; i < res.data.goodsSaleMoney.length; i++) {
            this.font.push(res.data.goodsSaleMoney[i].saleGoods);
            this.data.push(res.data.goodsSaleMoney[i].money);
          }
          var myChart = this.$echarts.init(document.getElementById("cost"));
          myChart.setOption({
            title: {
              text: "本月商品销售额",
              left: "center",
              top: 20,
              textStyle: {
                color: "#ccc",
              },
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
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(180, 180, 180, 0.2)",
                },
              },
            ],
          });
        });
      }
      if (command == "monthProfit") {
        this.$http.post("/querySaleProfitByDate").then((res) => {
          // console.log(res)
          const profits = res.data.saleProfits;
          var myChart = this.$echarts.init(document.getElementById("cost"));
          myChart.setOption({
            tooltip: {
              trigger: "item",
            },
            legend: {
              top: "5%",
              left: "center",
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "40",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: profits,
              },
            ],
          });
        });
      }
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
#cost {
  margin-top: 20px;
  width: 100%;
  height: 400px;
}
</style>