<template>
  <div>
    <!-- 头部 -->
    <el-card class="box-card">
      <h3>请选择需要查询的天数：</h3>
      <el-button circle @click="queryDebt(3)">03</el-button>
      <el-button circle @click="queryDebt(7)">07</el-button>
      <el-button circle @click="queryDebt(30)">30</el-button>
    </el-card>

    <!-- 表格 -->
    <template>
      <el-table :data="debtTable" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="withCustomer" label="欠款人"> </el-table-column>
        <el-table-column prop="telephone" label="联系方式"> </el-table-column>
        <el-table-column prop="goodsName" label="商品"> </el-table-column>
        <el-table-column prop="money" label="欠款金额"> </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="5"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Debt",
  data() {
    return {
      debtTable: [],
      total: 0,
      page:{
        start:0,
      }
    };
  },
  methods: {
    queryDebt(val) {
      this.$http.post(`queryDebtByDate?range=${val}&start=${this.page.start}`).then((res) => {
        // console.log(res);
        this.debtTable = res.data.debts;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val){
      this.page.start=(val-1)*5
      this.$http.post(`queryDebtByDate?range=${val}&start=${this.page.start}`).then((res) => {
        // console.log(res);
        this.debtTable = res.data.debts;
        this.total = res.data.total;
      });
    }
  },
};
</script>

<style scoped>
h3 {
  display: inline-block;
}
.el-pagination{
  text-align: center;
  margin-top: 10px;
}
.box-card{
  margin-bottom: 20px;
}
</style>