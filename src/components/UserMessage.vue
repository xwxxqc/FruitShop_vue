<template>
  <div>
    <!-- 选择器 -->
    <el-card class="box-card">
      <template>
        <el-select v-model="value" placeholder="请选择" @change="changeRole">
          <el-option
            v-for="(item, index) in users"
            :key="index"
            :label="item.roleMemo"
            :value="item.roleName"
          >
          </el-option>
        </el-select> </template
    ></el-card>

    <!-- 信息表格 -->
    <el-descriptions
      class="margin-top"
      :column="3"
      size="small"
      border
      v-for="(item, index) in userMessage"
      :key="index"
    >
      <!-- <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template> -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ item.userName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          创建时间
        </template>
        {{ item.createTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          账号类型
        </template>
        {{ item.roleName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          账号用途
        </template>
        <el-tag size="small">工作</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          上次登录时间
        </template>
        {{ item.loginTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          操作
        </template>
        <el-button type="success" @click="updateMessage(item.userName)"
          >修改</el-button
        >
        <el-button type="danger" @click="deleteMessage(item.id)"
          >删除</el-button
        >
      </el-descriptions-item>
    </el-descriptions>

    <!-- 对话框 -->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.createTime"></el-input>
        </el-form-item>
        <el-form-item label="上次登录">
          <el-input v-model="form.loginTime"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.isEnable"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate(form.id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserMessage",
  methods: {
    changeRole(val) {
      // console.log(val);
      this.$http.post(`queryUserMessageByRole?role=${val}`).then((res) => {
        this.userMessage = res.data;
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    deleteMessage(val) {
      // console.log(val)
      this.$http.post(`/deleteUserMessageById?id=${val}`).then((res) => {
        if (res.data.code == 1001) {
          this.$message.error("删除失败！");
        } else {
          this.$message.error("删除成功！");
        }
      });
    },
    updateMessage(val) {
      // console.log(val)
      this.dialogVisible=true
      this.$http.post(`queryUserByName?name=${val}`).then((res)=>{
        // console.log(res)
        this.form=res.data
      })
    },
    confirmUpdate(val){
      // console.log(val)
      this.$http.post(`/updateUserMessageById`,this.form).then((res)=>{
        if(res.data.code==1000){
          this.$message.success("删除成功！")
        }else{
          this.$message.error("删除失败！")
        }
      })
    }
  },
  data() {
    return {
      value: "",
      form: [],
      dialogVisible: false,
      users: [],
      userMessage: [],
    };
  },
  created() {
    this.$http.post("/queryAllUser").then((res) => {
      // console.log(res)
      this.users = res.data.roles;
      this.userMessage = res.data.userMessage;
    });
  },
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
.el-descriptions {
  margin-bottom: 20px;
}
</style>