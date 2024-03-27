<script>
import QRCode from 'qrcodejs2'
import moment from 'moment'
export default {
  name: 'Certificate',
  data () {
    return {
      visible: false,
      scale: 0.5,
      cert: {},
      notFound: false
    }
  },
  props: ['id'],
  methods: {
    // 创建二维码
    async createQRCode () {
      return new QRCode('QRCode', {
        text: `https://hinghwa.cn/users/certificate/${this.cert.ID}`,
        width: 230 * this.scale,
        height: 230 * this.scale,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    // 创建证书
    createCertificate () {
      function fillCenter (ctx, context, x, y, fontSize) {
        ctx.font = `${fontSize}px Arial`
        ctx.fillText(context, x - (ctx.measureText(context).width) / 2, y)
      }
      const canvas = document.getElementById('certificate')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.src = '/certificate.png'
      return new Promise((resolve, reject) => {
        img.onload = () => {
          const scale = this.scale
          canvas.width = img.width * scale
          canvas.height = img.height * scale
          // 添加图片
          ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale)
          // 二维码
          const QRCode = document.getElementById('QRCode').getElementsByTagName('img')[0]
          ctx.drawImage(QRCode, 330 * scale, 2840 * scale, 230 * scale, 230 * scale)
          // 等级
          ctx.font = `${90 * scale}px Arial`
          fillCenter(ctx, 'Level  ' + this.cert.level, ctx.canvas.width / 2, 1090 * scale, 90 * scale)
          // 分级
          const levelString = ['', '初级', '中级', '高级']
          fillCenter(ctx, levelString[this.cert.level], 540 * scale, 1894 * scale, 80 * scale)
          // 姓名
          ctx.fillStyle = '#837363'
          fillCenter(ctx, this.cert.name, ctx.canvas.width / 2, 1400 * scale, 150 * scale)
          // 地址
          ctx.fillStyle = '#000'
          fillCenter(ctx, this.cert.place, 1056 * scale, 1735 * scale, 60 * scale)
          // 第几期
          fillCenter(ctx, this.cert.sequence, 777 * scale, 1893 * scale, 70 * scale)
          // 等级
          ctx.fillText(this.cert.grade, 1450 * scale, 1890 * scale)
          // 成绩
          ctx.fillStyle = '#321'
          fillCenter(ctx, this.cert.scores[0], 925 * scale, 2240 * scale, 60 * scale)
          fillCenter(ctx, this.cert.scores[1], 1080 * scale, 2240 * scale, 60 * scale)
          fillCenter(ctx, this.cert.scores[2], 1235 * scale, 2240 * scale, 60 * scale)
          fillCenter(ctx, this.cert.scores[3], 1390 * scale, 2240 * scale, 60 * scale)
          ctx.fillStyle = 'red'
          fillCenter(ctx, this.cert.scores[4], 1545 * scale, 2240 * scale, 60 * scale)
          // 时间
          ctx.fillStyle = '#000'
          fillCenter(ctx, moment(this.cert.time).format('YYYY年MM月DD日'), 1910 * scale, 2805 * scale, 75 * scale)
          // 编号
          ctx.font = `${32 * scale}px Arial`
          ctx.fillText(`证书编号：${this.cert.ID}`, 610 * scale, 2913 * scale)
          ctx.fillText('校验地址：hingwa.cn', 610 * scale, 2970 * scale)
          resolve()
        }
      })
    },
    // 下载证书
    downloadCertificate () {
      const canvas = document.getElementById('certificate')
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'certificate.png'
      a.click()
    },
    // 打印证书
    printCertificate () {
      const printWindow = window.open('', '_blank')
      printWindow.document.open()
      printWindow.document.write(`<img style="width: 794px" src='${document.getElementById('certificate').toDataURL('image/png')}' alt=''/>`)
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 0)
    },
    // 获取证书信息
    fetchCertificate () {
      this.$axios.get(`/certs/${this.id}`).then(res => {
        this.cert = res.data.cert
        this.createQRCode().then(() => {
          this.createCertificate()
        })
      }).catch(err => {
        console.log(err)
        this.notFound = true
      })
    }
  },
  mounted () {
    this.fetchCertificate()
  }
}
</script>

<template>
  <div style="margin: auto">
    <a-row style="text-align: center; font-size: 2.5em; color: #333;margin: 20px auto 30px">证书查询结果</a-row>
    <a-row style="text-align: center" v-if="notFound">
      <a-icon type="frown" style="font-size: 5em; color: #333"/>
      <a-row style="font-size: 1.5em; color: #333;margin-top: 20px">未找到该证书</a-row>
    </a-row>
    <a-row style="text-align: center" v-if="!notFound">
      <canvas style="width: 794px;" id="certificate"/>
    </a-row>
    <a-row style="text-align: center;margin-top: 20px" v-if="!notFound">
      <a-button-group>
        <a-button @click="downloadCertificate" type="primary" size="large">下载</a-button>
        <a-button @click="printCertificate" type="primary" size="large">打印</a-button>
      </a-button-group>
    </a-row>
    <div id="QRCode" style="display: none" v-if="!notFound"/>
  </div>
</template>

<style scoped>
</style>
