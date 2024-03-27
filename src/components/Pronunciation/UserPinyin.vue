<template>
  <a-row justify="center" type="flex">
    <a-col :span="22">
      <a-table
          :columns="columns"
          :data-source="pronunciation"
          :pagination="pagination"
      >
        <template v-slot:status="text, record">
          <span>
            <a-badge v-if="!record.pronunciation.visibility" color="red" status="warning" title="暂未通过审核"/>
            <a-badge v-else status="success" title="已经通过审核"/>
            </span>
        </template>
        <template v-slot:word="text, record">
          <span>
            <router-link :to="{name:'WordDetails',params:{id:record.pronunciation.word_id.toString()}}">
              {{ record.pronunciation.word_word }}
            </router-link>
          </span>
        </template>
        <template v-slot:customTitle>
          <span> Name</span>
        </template>
        <template v-slot:action="text, record">
          <span>
            <audio
                :src="record.pronunciation.source"
                controls
                style="width: 128px"
            />
          </span>
        </template>
      </a-table>
    </a-col>
  </a-row>

</template>

<script>
import axios from '@/axios'

export default {
  name: 'UserPinyin',
  props: ['id'],
  data () {
    return {
      total: 0,
      pronunciation: [],
      columns: [
        {
          title: '状态',
          key: 'status',
          scopedSlots: { customRender: 'status' },
          align: 'center'
        },
        {
          title: '词条',
          scopedSlots: { customRender: 'word' },
          key: 'item',
          align: 'center'
        },
        {
          title: '拼音',
          dataIndex: 'pronunciation.pinyin',
          key: 'pinyin',
          align: 'center'
        },
        {
          title: '国际音标',
          dataIndex: 'pronunciation.ipa',
          key: 'ipa',
          align: 'center'
        },
        {
          title: '县区',
          dataIndex: 'pronunciation.county',
          key: 'county',
          align: 'center'
        },
        {
          title: '乡镇',
          dataIndex: 'pronunciation.town',
          key: 'town',
          align: 'center'
        },
        {
          title: '录音',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
    }
  },
  computed: {
    pagination () {
      return {
        onChange: async page => {
          await this.getCurrentPage(page)
          await axios.get('/pronunciation', {
            params: {
              pageSize: this.pagination.pageSize,
              page: page + 1,
              contributor: this.id
            },
            cache: true
          })
        },
        pageSize: 20,
        simple: true,
        total: this.total,
        defaultCurrent: this.defaultCurrent
      }
    }
  },
  async created () {
    await this.getCurrentPage(0)
    await axios.get('/record', {
      params: {
        pageSize: this.pagination.pageSize,
        page: 1
      },
      cache: true
    })
  },
  methods: {
    getCurrentPage: function (page) {
      axios.get('/pronunciation', {
        params: {
          pageSize: this.pagination.pageSize,
          page: page + 1,
          contributor: this.id
        },
        cache: true
      }).then(res => {
        this.total = res.data.total
        this.pronunciation = res.data.pronunciation
      })
    }
  }
}
</script>

<style scoped>

</style>
