<template>
  <div id="main">
      <h1 class="text-pop-up-top">欢迎进入水果销售管理系统</h1>
  </div>
</template>

<script>
export default {
  name: "Begin",
};
</script>

<style scoped>
@-webkit-keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc,
      0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc,
      0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
@keyframes text-pop-up-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: none;
  }
  100% {
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #cccccc, 0 3px 0 #cccccc,
      0 4px 0 #cccccc, 0 5px 0 #cccccc, 0 6px 0 #cccccc, 0 7px 0 #cccccc,
      0 8px 0 #cccccc, 0 9px 0 #cccccc, 0 50px 30px rgba(0, 0, 0, 0.3);
  }
}
.text-pop-up-top {
	-webkit-animation: text-pop-up-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: text-pop-up-top 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
#main{
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e9eef3;
}
h1{
    font-size: 3em;
}
</style>