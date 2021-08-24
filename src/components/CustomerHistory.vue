<template>
  <div>
    <!-- 数据表格 -->
    <template>
      <el-table :data="historyData" stripe style="width: 100%">
        <el-table-column prop="createTime" label="日期"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>
        <el-table-column prop="goodsPrice" label="商品价格"></el-table-column>
        <el-table-column prop="withCustomer" label="购买人"></el-table-column>
        <el-table-column prop="isPay" label="是否付款">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isPay"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <h2>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看购买人信息"
                placement="top"
              >
                <i class="el-icon-reading" @click="readCustomer(scope.row)"></i>
              </el-tooltip>
            </h2>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 7, 10]"
        :page-size="page.onePageCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>
    <!-- 抽屉信息 -->
    <el-drawer
      title="购买人信息"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="40%"
    >
      <el-descriptions class="margin-top" title="购买人为客户" :column="3" border>
        <template slot="extra">
          <el-button type="primary" size="small">联系购买人</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ this.customerMessage.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ this.customerMessage.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            性别
          </template>
          {{ this.customerMessage.sex }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            年龄
          </template>
          {{ this.customerMessage.age }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            邮箱
          </template>
          {{ this.customerMessage.email }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "CustomerHistory",
  data() {
    return {
      historyData: [],
      totalCount: 0,
      page: {
        start: 0,
        onePageCount: 10,
      },
      drawer: false,
      direction: "btt",
      customerMessage: {
        id: "",
        name: "",
        sex: "",
        age: "",
        email: "",
        telephone: "",
      },
    };
  },
  created() {
    this.$http
      .post(
        `queryCustomerHistoryByPage?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        // console.log(res)
        this.historyData = res.data.history;
        this.totalCount = res.data.total;
      });
  },
  methods: {
    handleSizeChange(val) {
      this.page.onePageCount = val;
      this.$http
        .post(
          `queryCustomerHistoryByPage?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          // console.log(res)
          this.historyData = res.data.history;
          this.totalCount = res.data.total;
        });
    },
    handleCurrentChange(val) {
      this.page.start = (val - 1) * this.page.onePageCount;
      this.$http
        .post(
          `queryCustomerHistoryByPage?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          // console.log(res)
          this.historyData = res.data.history;
          this.totalCount = res.data.total;
        });
    },
    readCustomer(row) {
      // console.log(row)
      this.$http
        .post(`queryCustomerByName?name=${row.withCustomer}`)
        .then((res) => {
          // console.log(res);
          this.customerMessage = res.data;
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
.block {
  text-align: center;
}
.el-descriptions {
  margin: 30px;
}
</style>