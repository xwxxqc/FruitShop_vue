<template>
  <div>
    <!-- 日期选择器 -->
    <el-card class="box-card">
      <div class="block">
        <span class="demonstration">请选择想要查看记录的时间范围:</span>
        <el-date-picker
          v-model="selectDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          @change="changeDate"
        >
        </el-date-picker>
      </div>
    </el-card>

    <!-- 结果列表 -->
    <template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="saleTime" label="日期"></el-table-column>
        <el-table-column prop="saleGoods" label="商品名称"></el-table-column>
        <el-table-column prop="salePrice" label="商品单价(斤/元)">
        </el-table-column>
        <el-table-column
          prop="saleWeight"
          label="商品重量(/斤)"
        ></el-table-column>
        <el-table-column prop="money" label="商品总价(/元)"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="read(scope.row)"
              icon="el-icon-mouse"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 7, 10, 20]"
        :page-size="page.onePageCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <!-- 对话框 -->
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="tedailMessage" label-width="80px" disabled>
      <el-form-item label="记录id">
        <el-input v-model="tedailMessage.id"></el-input>
      </el-form-item>
      <el-form-item label="出售价格">
        <el-input v-model="tedailMessage.goodsPrice"></el-input>
      </el-form-item>
      <el-form-item label="买家">
        <el-input v-model="tedailMessage.withCustomer"></el-input>
      </el-form-item>
      <el-form-item label="是否支付">
        <el-switch v-model="tedailMessage.isPay"></el-switch>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "SaleRecord",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      selectDate: "",
      dialogVisible: false,
      tableData: [],
      totalCount: 0,
      page: {
        start: 0,
        onePageCount: 7,
      },
      tedailMessage: {},
    };
  },
  methods: {
    changeDate() {
      //   console.log(this.selectDate[0])
      //   console.log(this.selectDate[1])
      this.$http
        .post(
          `/querySaleRecordBetweenDate?begin=${this.selectDate[0]}&end=${this.selectDate[1]}&start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          //   console.log(res);
          this.tableData = res.data.saleRecords;
          this.totalCount = res.data.total;
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSizeChange(val) {
      this.page.onePageCount = val;
      this.$http
        .post(
          `/querySaleRecordBetweenDate?begin=${this.selectDate[0]}&end=${this.selectDate[1]}&start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          //   console.log(res);
          this.tableData = res.data.saleRecords;
          this.totalCount = res.data.total;
        });
    },
    handleCurrentChange(val) {
      this.page.start = (val - 1) * this.page.onePageCount;
      this.$http
        .post(
          `/querySaleRecordBetweenDate?begin=${this.selectDate[0]}&end=${this.selectDate[1]}&start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          //   console.log(res);
          this.tableData = res.data.saleRecords;
          this.totalCount = res.data.total;
        });
    },
    read(row) {
      const formdate = moment(row.saleTime).format("yyyy-MM-DD HH:mm:ss");
      // console.log(formdate)
      this.$http
        .post(
          `/queryCustomerHistoryByTimeAndGoods?time=${formdate}&goods=${row.saleGoods}`
        )
        .then((res) => {
          console.log(res);
          this.tedailMessage = res.data.customerHistory;
        });
      this.dialogVisible = true;
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
.block {
  text-align: center;
}
</style>