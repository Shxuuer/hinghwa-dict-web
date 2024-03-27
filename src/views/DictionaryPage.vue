<template>
  <a-card style="padding: 24px;margin: 0 150px">
    <template #title>
      <h2>音序查词</h2>
      <div style="color: rgb(128,128,128)">
        <p>兴化语记作为在线工具同样提供音序查询功能。</p>
        <p style="line-height: 1px">依次点击音序，即可返回该音序下的所有词语。</p>
      </div>
    </template>

    <template #extra>
      <a-popover>
        <template #content>
          <p>第一步：点击音序选择表下的任意一个音序，在界面下方便将展示与该音序所匹配的词语。</p>
          <p>第二步：辞典会自动筛选出，在所选条件下仍能选择的音序，继续点击。</p>
          <p>第三步：点击词条卡片，进入词语详情页。</p>
        </template>
        <a-button type="dashed">
          <QuestionCircleOutlined/>
          使用帮助
        </a-button>
      </a-popover>
    </template>

    <!--选择拼音区域-->
    <a-row>
      <a-col v-for="(pinyin,index) in order" :key="index" :span="2">
        <a-tag closable @close="popPinyin(index)">
          {{ pinyin }}
        </a-tag>
      </a-col>
      <a-col key="prefix" v-if="prefix">
        <a-tag closable @close="prefix=''" color="blue">
          {{ prefix.toUpperCase() }}
        </a-tag>
      </a-col>
    </a-row>
    <a-divider v-show="order.length || prefix"/>

    <!--显示拼音区域-->
      <a-row style="display: flex;flex-direction: column;">
          <template v-for="list in nextNodeList">
            <a-card
              v-if="!prefix||list[0]===prefix"
              :key="list[0]">
              <a-row style="display: flex;flex-direction: row;">
                <a-col style="margin-bottom: 5px">
                  <a-tag color="blue" @click="prefix=list[0]" style="font-size: larger">
                    {{ String(list[0]).toUpperCase() }}
                  </a-tag>
                </a-col>
              </a-row>
              <a-row>
                <template v-for="pinyin in list[1]" :key="pinyin">
                  <a-col span="2" style="margin-bottom: 3px">
                    <a-tag
                        :key="pinyin"
                        @click="pushPinyin(pinyin)"
                    >
                      {{ pinyin }}
                    </a-tag>
                  </a-col>
                </template>
              </a-row>
            </a-card>
          </template>
      </a-row>
    <a-divider v-show="nextNodeList.length && words.length"/>

    <!--显示查询词语-->
    <WordListShowing :list-source="words" v-if="words.length"/>
  </a-card>
</template>

<script>
import WordListShowing from '@/components/Word/WordListShowing.vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import axios from '@/axios/index.js'

export default {
  name: 'DictionaryPage',
  components: { WordListShowing, QuestionCircleOutlined },
  data () {
    return {
      fullRecord: {},
      record: {},
      order: [],
      words: [],
      prefix: ''
    }
  },
  computed: {
    /**
     * a-z 顺序返回可以继续选择的拼音
     * @returns {*[string,string[]]} 首字母和拼音列表
     */
    nextNodeList () {
      const record = this.record
      const ans = {}
      for (const i in record) {
        if (i === 'word_count') continue
        if (i[0] in ans) {
          ans[i[0]] = [...ans[i[0]], i]
        } else {
          ans[i[0]] = [i]
        }
      }
      // sort ans
      for (const i in ans) {
        ans[i].sort()
      }
      // convert to array
      const ansArray = []
      for (const i in ans) {
        ansArray.push([i, ans[i]])
      }
      ansArray.sort()
      return ansArray
    }
  },
  async created () {
    this.fullRecord = await axios.get('/words/phonetic_ordering').then(res => res.data.record)
    this.record = { ...this.fullRecord }
  },
  watch: {
    order: {
      handler (newOrder) {
        if (!newOrder.length) {
          this.words = []
          return
        }
        this.searchDictionary(newOrder, '', true)
      },
      deep: true
    },
    prefix: {
      handler (newPrefix) {
        this.searchDictionary(this.order, newPrefix, true)
      },
      deep: true
    }
  },
  methods: {
    async searchDictionary (order, prefix = '', recursion = false) {
      axios.post('/words/dictionary', { order: [...order], prefix, recursion }).then(res => {
        this.words = res.data.words
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 新选中拼音
     * @param pinyin{string} 拼音
     */
    pushPinyin (pinyin) {
      this.order.push(pinyin)
      this.record = this.record[pinyin]
      this.prefix = ''
    },

    /**
     * 回退拼音列表
     * @param index{number} 回退到的位置
     */
    popPinyin (index) {
      this.order.splice(index)
      let record = this.fullRecord
      for (const i of this.order) {
        record = record[i]
      }
      this.record = record
      this.prefix = ''
    }
  }
}
</script>

<style scoped>

</style>
