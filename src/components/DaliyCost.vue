<template>
  <div>
    <!-- 时间选择器 -->
    <el-card class="box-card">
      <div class="block">
        <span class="demonstration">请选择统计时间：</span>
        <el-date-picker
          v-model="day"
          align="center"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          @change="changeDate"
        >
        </el-date-picker>
      </div>
    </el-card>
    <!-- 主体部分 -->
    <div class="sum">
      <div class="sumcard">
        <div class="picture"></div>
        <div class="content">
          <h3>今天的总销售额：{{ this.sumMoney }}元</h3>
        </div>
        <div class="controll">
          <el-tooltip
            class="item"
            effect="dark"
            content="点击查看销售详情"
            placement="bottom"
          >
            <el-button
              icon="el-icon-aim"
              circle
              type="primary"
              @click="readDetails"
            ></el-button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 详情信息 -->
    <el-drawer
      title="销售额组成"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="80%"
    >
      <template>
        <el-table :data="details" style="width: 100%">
          <el-table-column prop="saleGoods" label="商品"> </el-table-column>
          <el-table-column prop="saleWeight" label="重量"> </el-table-column>
          <el-table-column prop="salePrice" label="单价"> </el-table-column>
          <el-table-column prop="money" label="总价"> </el-table-column>
        </el-table>
      </template>
    </el-drawer>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "DailyCost",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      day: "",
      sumMoney: 0,
      drawer: false,
      direction: "ltr",
      details: [],
    };
  },
  methods: {
    changeDate() {
      const time = moment(this.day).format("yyyy-MM-DD");
      this.$http.post(`querySumByDate?oneDay=${time}`).then((res) => {
        // console.log(res);
        this.sumMoney = res.data.sumMoney;
      });
    },
    readDetails() {
      const time = moment(this.day).format("yyyy-MM-DD");
      this.$http
        .post(`queryHistoryDetailsByDate?oneDay=${time}`)
        .then((res) => {
          // console.log(res);
          this.details = res.data.details;
          this.drawer = true;
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>
.demonstration {
  margin-right: 20px;
}
.box-card {
  margin-bottom: 20px;
}
.sum {
  /* border: 1px solid black; */
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.sumcard {
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 25px;
  box-shadow: 0 0 20px;
}
.picture {
  width: 100%;
  height: 50%;
  /* border: 1px solid black; */
  border-radius: 25px 25px 0 0;
  background: url(../assets/1.jpg) center center;
  background-size: cover;
}
.content {
  border: 1px solid black;
  /* height: 50%; */
  border-radius: 0 0 25px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 5px red;
  padding: 8px 0;
}
.controll {
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>