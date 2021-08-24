<template>
  <div>
    <!-- 选择器  -->
    <el-card class="box-card">
      <el-select v-model="value" placeholder="请选择" @change="slectChange">
        <el-option
          v-for="item in stocks"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </el-card>
    <!-- 表格 -->
    <template>
      <el-table :data="detailForm" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="repository" label="仓库"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="name" label="商品"> </el-table-column>
        <el-table-column prop="remaining" label="库存量"></el-table-column>
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
  </div>
</template>

<script>
export default {
  name: "Stock",
  data() {
    return {
      detailForm: [],
      totalCount: 0,
      stocks: [],
      value: "",
      page: {
        start: 0,
        onePageCount: 7,
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page.onePageCount = val;
      this.$http
        .post(
          `/queryAllGoodsDistributed?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          // console.log(res)
          this.detailForm = res.data.goodsDistributed;
          this.totalCount = res.data.total;
          this.stocks = res.data.stocks;
        });
    },
    handleCurrentChange(val) {
      this.page.start = (val - 1) * this.page.onePageCount;
      this.$http
        .post(
          `/queryAllGoodsDistributed?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          // console.log(res)
          this.detailForm = res.data.goodsDistributed;
          this.totalCount = res.data.total;
          this.stocks = res.data.stocks;
        });
    },
    slectChange(val) {
      // console.log(val)
      this.$http
        .post(
          `/queryGoodsDistributedByName?start=${this.page.start}&onePageCount=${this.page.onePageCount}&name=${val}`
        )
        .then((res) => {
          // console.log(res)
          this.detailForm = res.data.goodsDistributed;
          this.totalCount = res.data.total;
          this.stocks = res.data.stocks;
        });
    },
  },
  created() {
    this.$http
      .post(
        `/queryAllGoodsDistributed?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        // console.log(res)
        this.detailForm = res.data.goodsDistributed;
        this.totalCount = res.data.total;
        this.stocks = res.data.stocks;
      });
  },
};
</script>

<style>
</style>