<template>
  <div>
    <el-descriptions
      class="margin-top"
      :column="3"
      size="small"
      v-for="(item, index) in userRole"
      :key="index"
      border
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          用户名
        </template>
        {{ item.userName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          权限
        </template>
        {{ item.roleMemo }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          操作
        </template>
        <el-button type="danger" @click="changeAuthority(item.userName)"
          >调整权限</el-button
        >
      </el-descriptions-item>
    </el-descriptions>

    <el-dialog
      title="请选择权限"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="(item,index) in roles"
          :key="index"
          :label="item.roleMemo"
          :value="item.roleName"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="authorityConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AuthorityManage",
  data() {
    return {
      userRole: [],
      value:'',
      userName: "",
      roles:[],
      dialogVisible: false,
    };
  },
  methods: {
    changeAuthority(val) {
      //   console.log(val)
      this.userName = val;
      this.$http.post("/queryAllRole").then((res)=>{
        //   console.log(res)
          this.roles=res.data
      })
      this.dialogVisible=true
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    authorityConfirm(){
        // console.log(this.value,this.userName)
        this.$http.post(`/updateUserRoleByName?name=${this.userName}&role=${this.value}`).then((res)=>{
            // console.log(res)
            if(res.data.code==1000){
                this.$message.success("修改权限成功！")
                this.dialogVisible=false
            }else{
                this.$message.error("权限修改失败！")
            }
        })
    }
  },
  created() {
    this.$http.post("/queryAllUserRole").then((res) => {
      //   console.log(res)
      this.userRole = res.data;
    });
  },
};
</script>

<style scoped>
.el-descriptions {
  margin-bottom: 20px;
}
</style>