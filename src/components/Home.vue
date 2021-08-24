<template>
  <div id="main">
    <el-container>
      <!-- 导航栏 -->
      <el-header>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item class="title">
            <span id="logo">
              <h2>果</h2>
            </span>
          </el-menu-item>
          <el-menu-item>
            <h3>水果销售管理系统</h3>
          </el-menu-item>
          <el-submenu index="2" class="myself">
            <template slot="title">我</template>
            <el-menu-item index="2-1">个人信息</el-menu-item>
            <el-menu-item index="2-2">消息中心</el-menu-item>
            <el-menu-item index="2-3" @click="Logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '60px' : '200px'">
          <el-col>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              mode="vertical"
              :unique-opened="isUniqueOpened"
              active-text-color="#ffd04b"
              :collapse="isCollapse"
            >
              <el-menu-item @click="changeCollapse">
                <h3 v-show="!isCollapse">|||</h3>
                <h3 v-show="isCollapse">---</h3>
              </el-menu-item>
              <el-submenu
                :index="item.path"
                v-for="item in menu"
                :key="item.path"
              >
                <template slot="title">
                  <i :class="item.photo"></i>
                  <span class="menuName">{{ item.menuName }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    :index="one.path"
                    v-for="one in item.subMenus"
                    :key="one.id"
                    @click="changePosition(one.path,one.menuName)"
                  >
                    <i :class="one.photo"></i>
                    <span class="menuName">{{ one.menuName }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <!-- 显示栏 -->
          <el-main>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) in bread" :key="index" :to="item.path">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view></router-view>
          </el-main>
          <!-- 页脚 -->
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isCollapse: true,
      isUniqueOpened: true,
      menu: [],
      bread: [
        {
          name:"首页",
          path:'/'
        }
      ],
    };
  },
  created() {
    this.$http.post("/getUserMenu").then((res) => {
      // console.log(res)
      this.menu = res.data;
    });
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    Logout() {
      this.$http.post("/logout").then((res) => {
        // console.log(res)
        if (res.data.code == 1000) {
          window.localStorage.removeItem("TOKEN");
          this.$router.push("/");
        }
      });
    },
    changePosition(path,name) {
      let one=0;
      this.bread.forEach((res)=>{
        // console.log(res.name)
        if(res.name===name){
          this.$message("当前页面已存在")
          one++
          return
        }
      })
      if(one==0){
        this.bread.push({name:name,path:path})
        this.$router.push(path);
      }
    },
  },
};
</script>

<style scoped>
#main {
  width: 100%;
  height: 100vh;
}
.el-menu {
  width: 100%;
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #545c64;
  color: #333;
  padding: 0;
}

.menuName {
  margin-left: 10px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  transition: 1s;
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

.el-container {
  width: 100%;
  height: 100%;
}
.myself {
  float: right !important;
}

#logo {
  display: block;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: chartreuse;
  color: red;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes titlechange {
  0% {
    transform: scale(0) rotate(0);
  }
  100% {
    transform: scale(2) rotate(360);
  }
}
.title:hover,
.logo:hover {
  animation: titlechange 2s linear;
}
.el-breadcrumb{
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 10px;
}
</style>