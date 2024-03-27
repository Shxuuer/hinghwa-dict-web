<template>
  <a-card title="审核列表">
    <a-table
      :columns="columns"
      :data-source="list"
      :loading="{spinning: spinning, delay: 500}"
      rowKey="application"
    >
      <template v-slot:customTitle>
<span > Name</span>
</template>

      <template v-slot:word="text">
<div  >
        <router-link v-if="text.word" :to="{name:'WordDetails',params:{id:text.word}}">
          {{ text.content.word }}
        </router-link>
        <a-tooltip v-else>
          <template v-slot:title>
            这是一个申请新创建的词条
          </template>
          {{ text.content.word }}
        </a-tooltip>
      </div>
</template>

      <template v-slot:contributor="text">
<div  >
        <router-link v-if="text" :to="{name:'UserDetails',params:{id:text.contributor.id}}">
          <a-avatar :src="text.contributor.avatar"></a-avatar>
          {{ text.contributor.nickname }}
        </router-link>
      </div>
</template>

      <template v-slot:action="text">
<div  >
        <router-link :to="{name:'Application',params:{id:text.application}}">
          <a-button>进入审核</a-button>
        </router-link>
      </div>
</template>
    </a-table>
  </a-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WordConfirming',
  data () {
    return {
      spinning: false,
      list: [],
      columns: [
        {
          title: '申请人',
          key: 'contributor',
          scopedSlots: { customRender: 'contributor' },
          align: 'center',
          width: 100
        },
        {
          title: '词条',
          key: 'word_word',
          scopedSlots: { customRender: 'word' },
          align: 'center',
          width: 100
        },
        {
          title: '更改理由',
          dataIndex: 'reason',
          key: 'reason',
          align: 'center',
          width: 100
        },

        {
          title: '审核情况',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center',
          width: 75
        }
      ]
    }
  },
  async created () {
    axios.get('/words/applications').then(res => {
      this.list = res.data.applications
    })
  }
}
</script>

<style scoped>

</style>
