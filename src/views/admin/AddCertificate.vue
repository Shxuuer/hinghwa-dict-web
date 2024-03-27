<script>
export default {
  name: 'AddCertificate',
  created () {
    this.refreshCertInfo()
  },
  methods: {
    async addCerts () {
      this.certInfo.cert.scores[4] = this.certInfo.cert.scores[0] + this.certInfo.cert.scores[1] + this.certInfo.cert.scores[2] + this.certInfo.cert.scores[3]
      this.$axios.post('/certs', this.certInfo).then(res => {
        this.$message.success('添加成功！')
        this.refreshCertInfo()
      }).catch(() => {
        this.$message.error('添加失败！')
      })
    },
    refreshCertInfo () {
      const date = new Date()
      this.certInfo = {
        cert: {
          level: 0,
          name: '',
          place: '',
          sequence: '',
          scores: [0, 0, 0, 0, 0],
          time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
          ID: ''
        },
        user: ''
      }
    }
  },
  data () {
    return {
      certInfo: {}
    }
  },
  computed: {
    date: {
      get () {
        const date = new Date(this.certInfo.cert.time)
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      },
      set (value) {
        this.certInfo.cert.time = new Date(value[0], value[1] - 1, value[2])
      }
    }
  }
}
</script>

<template>
  <div class="body">
    <a-row>
      <a-col :span="12">
        <a-form :model="certInfo.cert" label-col="{ span: 6 }" wrapper-col="{ span: 18 }">
          <a-form-item label="姓名">
            <a-input v-model="certInfo.cert.name" />
          </a-form-item>
          <a-form-item label="地点">
            <a-input v-model="certInfo.cert.place" />
          </a-form-item>
          <a-form-item label="第几期">
            <a-input v-model="certInfo.cert.sequence" />
          </a-form-item>
          <a-form-item label="时间">
            <a-input v-model="certInfo.cert.time" />
            <a-input v-model="certInfo.cert.grade" />
            <a-input v-model="certInfo.cert.scores[4]" />
          </a-form-item>
          <a-form-item label="等级">
            <a-select v-model="certInfo.cert.level">
              <a-select-option value="1">初级</a-select-option>
              <a-select-option value="2">中级</a-select-option>
              <a-select-option value="3">高级</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="成绩">
            <a-input-number v-model="certInfo.cert.scores[0]" />
            <a-input-number v-model="certInfo.cert.scores[1]" />
            <a-input-number v-model="certInfo.cert.scores[2]" />
            <a-input-number v-model="certInfo.cert.scores[3]" />
          </a-form-item>
          <a-form-item label="编号">
            <a-input v-model="certInfo.cert.ID" />
          </a-form-item>
          <a-form-item label="用户ID">
            <a-input v-model="certInfo.user" />
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-button type="primary" @click="addCerts">添加</a-button>
      </a-col>
    </a-row>

  </div>
</template>

<style scoped>
.body{
  width: 80%;
  background-color: white;
}
</style>
