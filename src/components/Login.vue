<template>
  <div id="main">
        <div  class="Loginform">
          <el-form class="title">
            <h2>Login</h2>
          </el-form>
            <el-form ref="form" :model="Loginform" :rules="rules">
            <el-form-item label="userName" prop="username">
                <el-input v-model="Loginform.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <el-form-item label="passWord" prop="password">
                <el-input v-model="Loginform.password" prefix-icon="el-icon-unlock" type="password"></el-input>
            </el-form-item>
            <el-form-item class="controller">
                <el-button type="info" round @click="submitForm">提交</el-button>
                <el-button type="warning" round @click="restForm">重置</el-button>
            </el-form-item>
        </el-form>
        </div>
  </div>
</template>

<script>
export default {
  name:'Login',
  data(){
        return {
            Loginform:{
                username:'Rose',
                password:'123456'
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                ]
            }
        }
  },
  methods:{
    submitForm(){
      this.$refs.form.validate(res=>{
        if(!res) return
        this.$http.post(`/login?username=${this.Loginform.username}&password=${this.Loginform.password}`,).then((res)=>{
          // console.log(res)
          if(res.data.code==1000){
            const jwt=res.headers['token']
            window.localStorage.setItem("TOKEN",jwt)
            // console.log(jwt)
            this.$message.success("登录成功！")
            this.$router.push("/home")
          }
        })
      })
    },
    restForm(){
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style>
  #main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: skyblue;
  }
  .Loginform{
    width: 400px;
    height: 300px;
    border-radius: 15px;
    box-shadow: 0 0 30px;
    padding: 15px 20px;
    background: #fff;
  }
  .title{
    text-align: center;
    margin-bottom: 10px;
  }
  .controller{
    float: right;
  }
</style>