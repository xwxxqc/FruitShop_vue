<template>
  <div>
    <!-- 时间选择器 -->
    <el-card class="box-card">
      <div class="block">
        <el-date-picker
          v-model="value2"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          @change="changeTime"
          clearable
          @clear="clearDate"
        >
        </el-date-picker>
      </div>
    </el-card>

    <!-- 表格 -->
    <template>
      <el-table :data="records" stripe style="width: 100%">
        <el-table-column prop="time" label="日期"> </el-table-column>
        <el-table-column prop="name" label="商品"> </el-table-column>
        <el-table-column prop="weight" label="重量"> </el-table-column>
        <el-table-column prop="handler" label="接收人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="danger"
            @click="handlerMessage(scope.row)"
            >接收人信息</el-button
          >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
     <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 7, 10, 15]"
        :page-size="page.onePageCount"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: "IntoRecord",
  data() {
    return {
      records: [],
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
      value2: "",
      page: {
        total: 0,
        start: 0,
        onePageCount: 7,
      },
    };
  },
  created() {
    this.$http
      .post(
        `/queryAllIntoRecordByPage?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        // console.log(res);
        this.records = res.data.intoRecords;
        this.page.total = res.data.totalCount;
      });
  },
  methods: {
    handleSizeChange(val) {
      this.page.onePageCount=val
      this.$http
      .post(
        `/queryAllIntoRecordByPage?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        // console.log(res);
        this.records = res.data.intoRecords;
        this.page.total = res.data.totalCount;
      });
    },
    handleCurrentChange(val) {
      this.page.start=(val-1)*this.page.onePageCount
      this.$http
      .post(
        `/queryAllIntoRecordByPage?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        // console.log(res);
        this.records = res.data.intoRecords;
        this.page.total = res.data.totalCount;
      });
    },
    changeTime() {
      var time=moment(this.value2).format("yyyy-MM-DD")
      this.$http.post(`queryIntoRecordByDate?time=${time}`).then((res)=>{
        // console.log(res)
        this.records=res.data.intoRecords
      })
    },
    clearDate(){
      console.log("清空")
    }
  },
};
</script>

<style scoped>
.box-card{
  margin-bottom: 20px;
}
</style>