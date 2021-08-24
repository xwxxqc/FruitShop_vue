<template>
  <div>
    <el-descriptions
      class="margin-top"
      :column="3"
      size="small"
      border
      v-for="item in Manager"
      :key="item.id"
    >
      <template slot="extra">
        <el-button type="danger" size="small" @click="deleteAdmin(item.id)"
          >删除</el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ item.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ item.telephone }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          所属仓库
        </template>
        {{ item.repository }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small" class="tit">公司</el-tag>
        <el-switch v-model="item.isWork"></el-switch>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "StockManager",
  data() {
    return {
      Manager: [],
    };
  },
  created() {
    this.$http.post("/queryAllRepositoryAdmin").then((res) => {
      //   console.log(res)
      this.Manager = res.data.repositoryAdmin;
    });
  },
  methods: {
    deleteAdmin(val) {
      // console.log(val)
      this.$http.post(`/deleteRepositoryAdmin?id=${val}`).then((res) => {
        if (res.data.code == 1000) {
          this.$message.success("删除成功！");
          this.$http.post("/queryAllRepositoryAdmin").then((res) => {
            //   console.log(res)
            this.Manager = res.data.repositoryAdmin;
          });
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
  },
};
</script>

<style scoped>
.tit {
  margin: 0 20px;
}
</style>