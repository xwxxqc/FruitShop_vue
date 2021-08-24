<template>
  <div>
    <template>
      <el-table :data="tableData" height="550" border style="width: 100%">
        <el-table-column prop="saleGoods" label="商品">
        </el-table-column>
        <el-table-column prop="saleWeight" label="售卖总重量">
        </el-table-column>
        <el-table-column prop="cost" label="进价"> </el-table-column>
        <el-table-column prop="salePrice" label="售卖价格"></el-table-column>
        <el-table-column prop="repository" label="仓库"></el-table-column>
      </el-table>
    </template>
  </div>
</template>

  </div>
</template>

<script>
export default {
  name: "GoodsMessage",
  data(){
      return {
          tableData:[]
      }
  },
  created(){
      this.$http.post("/queryAllGoodMessage").then((res)=>{
          this.tableData=res.data
      })
  }
};
</script>

<style>
</style>