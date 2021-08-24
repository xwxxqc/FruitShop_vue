<template>
  <div>
    <el-col class="search">
      <!-- 搜索栏 -->
      <el-card shadow="hover">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          clearable
          class="searchinput"
          @clear="clearinput()"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchmessage()">搜索</el-button>
      </el-card>
      <!-- 信息表格 -->
      <template>
        <el-table :data="customer" style="width: 100%">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="telephone" label="联系电话"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="editCustomer(scope.row)"
                >编辑</el-button
              >

              <el-popconfirm
                confirm-button-text="确定"
                @confirm="handleDelete(scope.row)"
                cancel-button-text="取消"
                @cancel="cancelDelete()"
                icon="el-icon-info"
                icon-color="red"
                title="确定要删除该客户吗？"
              >
                <el-button size="mini" type="danger" slot="reference"
                  >删除</el-button
                >
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="page.onePageCount"
          layout="total, sizes, prev, pager, next, jumper"
          :total="customerCount"
        >
        </el-pagination>
      </div>
    </el-col>

      <!-- 修改客户信息模态框 -->
    <el-dialog title="修改客户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="客户Id">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客户性别">
          <el-select v-model="form.sex" placeholder="请选择客户性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="客户邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="客户电话">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelupdate()">取 消</el-button>
        <el-button type="primary" @click="handleEdit()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "CustomMessage",
  created() {
    this.$http
      .post(
        `/queryAllCustomer?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        console.log(res);
        this.customer = res.data.customer;
        this.customerCount = res.data.totalCount;
      });
  },
  data() {
    return {
      input: "",
      customer: [],
      customerCount: 0,
      page: {
        start: 0,
        onePageCount: 5,
      },
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        sex: "",
        age: "",
        email: "",
        telephone: "",
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.page.onePageCount = val;
      this.$http
        .post(
          `/queryAllCustomer?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          // console.log(res);
          this.customer = res.data.customer;
          this.customerCount = res.data.totalCount;
        });
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page.start = (val - 1) * this.page.onePageCount;
      this.$http
        .post(
          `/queryAllCustomer?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
        )
        .then((res) => {
          // console.log(res);
          this.customer = res.data.customer;
          this.customerCount = res.data.totalCount;
        });
    },
    handleEdit() {
      // console.log(index);
      this.$http.post("updateCustomer",this.form).then((res)=>{
        // console.log(res)
        if(res.data.code==1000){
          this.$message.success("客户信息修改成功！")
          this.dialogFormVisible=false;
           this.$http
            .post(
              `/queryAllCustomer?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
            )
            .then((res) => {
              console.log(res);
              this.customer = res.data.customer;
              this.customerCount = res.data.totalCount;
            });
        }
      })
    },
    cancelupdate(){
      this.dialogFormVisible = false
      this.$message("取消修改客户信息")
    },
    handleDelete(row) {
      // console.log(row);
      this.$http.post(`/deleteCustomer?id=${row.id}`).then((res) => {
        if (res.data.code == 1000) {
          this.$message.success("删除成功！");
          this.$http
            .post(
              `/queryAllCustomer?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
            )
            .then((res) => {
              console.log(res);
              this.customer = res.data.customer;
              this.customerCount = res.data.totalCount;
            });
        }
      });
    },
    cancelDelete() {
      this.$message("取消删除该客户！");
    },
    editCustomer(row){
      this.$http.post(`/queryCustomerById?id=${row.id}`).then((res)=>{
        // console.log(res)
        this.form=res.data
      })
      this.dialogFormVisible = true
    },
    searchmessage(){
      this.$http.post(`queryLikeCustomer?key=${this.input}`).then((res)=>{
        // console.log(res)
        if(res.data.code==1001){
          this.$message.error("查询客户失败！")
        }
        this.customer=res.data.customers
      })
    },
    clearinput(){
      // console.log("清空")
      this.$http
      .post(
        `/queryAllCustomer?start=${this.page.start}&onePageCount=${this.page.onePageCount}`
      )
      .then((res) => {
        console.log(res);
        this.customer = res.data.customer;
        this.customerCount = res.data.totalCount;
      });
    }
  },
};
</script>

<style scoped>
.search {
  margin-top: 10px;
}
.searchinput {
  width: 600px;
  margin-right: 20px;
}
.el-card {
  margin-bottom: 20px;
}
.block {
  margin-top: 20px;
  text-align: center;
}
</style>