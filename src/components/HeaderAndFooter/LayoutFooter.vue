<template>
  <div class="footer">
    <a-row align="middle" justify="space-around" type="flex">
      <a-col span="12">

        <h4 style="color: white"> 相关网站：
          <a href="https://www.ydict.net/" style="color: white" target="_blank">榕典</a> &#8194;|
          <a href="https://www.moedict.tw/" style="color: white" target="_blank">萌典</a>&#8194;|
          <a href="https://zhongguoyuyan.cn/" style="color: white" target="_blank">中国语言保护工程采录展示平台</a>
        </h4>

        <div>
          关于我们：
          <a href="http://dict.hinghwa.cn/" style="color: #C7C7C7" target="_blank">旧版</a>&#8194;|
          <a href="http://m.hinghwa.cn/" style="color: #C7C7C7" target="_blank">移动版</a>&#8194;|
          <a href="https://support.qq.com/product/420021" style="color: #C7C7C7" target="_blank">反馈社区</a>&#8194;|
          <a href="http://hinghwa.cn/articles/175" style="color: #C7C7C7" target="_blank">联系我们</a>&#8194;|
          <a href="https://github.com/e-dialect" style="color: #C7C7C7" target="_blank">GitHub</a>
        </div>

        <div>
          版权所有 © {{ new Date().getFullYear() }}
          <a href="https://edialect.top" target="_blank">E方言</a>
          <a href="http://beian.miit.gov.cn" style="color:#C7C7C7" target="_blank">
            闽ICP备2021006892号
          </a>
        </div>

      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'LayoutFooter'
}
</script>

<style scoped>
.footer {
  background: rgb(46, 46, 46);
  width: 100%;
  color: white;
}

h4 {
  color: rgb(199, 199, 199);
}

p {
  font-size: 0.1rem;
  margin: auto;
  color: #8b8b8b;
}
</style>
