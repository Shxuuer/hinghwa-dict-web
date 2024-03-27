<template>
  <div>
    <a-list
      :data-source="definitions"
      item-layout="horizontal"
    >
      <template #renderItem="{item, index}">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              <a-row :gutter="4" align="middle" type="flex">
                <a-col :span="1">
                  <span>{{ OrderIndex[index] }}</span>
                </a-col>
                <a-col :span="20">
                  <a-input v-model:value="item.content" placeholder="义项内容"/>
                </a-col>
                <a-col :span="1">
                  <a-button size="small" type="primary" @click="addItem(definitions, index)">
                    <PlusOutlined/>
                  </a-button>
                </a-col>
                <a-col :span="1">
                  <a-button size="small" type="primary" @click="definitions.splice(index,1)">
                    <MinusOutlined/>
                  </a-button>
                </a-col>
              </a-row>
            </template>
            <template #description>

              <a-row
                  v-for="(exp,index) in item.example"
                  :key="index"
                  :gutter="4"
                  align="middle"
                  type="flex"
              >
                <a-col :span="3">
                  <a-select v-model:value="exp.type" style="width: 64px">
                    <a-select-option value="例">
                      例
                    </a-select-option>
                    <a-select-option value="俗">
                      俗
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="9">
                  <a-input v-model:value="exp.content" placeholder="例句（可用~来代替原词语）"/>
                </a-col>
                <a-col :span="9">
                  <a-input v-model:value="exp.explain" placeholder="对应句子的翻译"/>
                </a-col>
                <a-col :span="1">
                  <a-button size="small" type="dashed" @click="addExplain(item.example,index+1)">
                    <PlusOutlined/>
                  </a-button>
                </a-col>
                <a-col :span="1">
                  <a-button size="small" type="dashed" @click="item.example.splice(index,1)">
                    <MinusOutlined/>
                  </a-button>
                </a-col>
              </a-row>

              <div style="text-align: center;padding: 8px">
                <a-button size="small" type="dashed" @click="addExplain(item.example)">
                  <template #icon>
                    <PlusOutlined/>
                  </template>
                  增加新例句或俗语
                </a-button>
              </div>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>

      <a-list-item>
        <div style="text-align: center">
          <a-button type="primary" @click="addItem(definitions)">
            <template #icon>
              <PlusOutlined/>
            </template>
            增加新义项
          </a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { combineDefinitions, order, splitDefinition } from './Definition.js'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue'

export default {
  name: 'DefinitionEdit',
  props: { definition: String },
  components: {
    PlusOutlined,
    MinusOutlined
  },
  model: {
    prop: 'definition'
  },
  data () {
    return {
      OrderIndex: order,
      definitions: []
    }
  },
  created () {
    this.definitions = this.definition ? splitDefinition(this.definition) : []
  },
  computed: {
    text: {
      get () {
        if (this.definitions.length) {
          return combineDefinitions(this.definitions.map((item, index) => {
            const value = { ...item }
            value.content = order[index] + value.content
            return value
          }))
        } else {
          return ''
        }
      },
      set (value) {
        this.definitions = splitDefinition(value)
        this.definitions.forEach(item => {
          while (item.content && order.indexOf(item.content[0]) !== -1) {
            item.content = item.content.substring(1)
          }
        })
      }
    },
    index () {
      let i = 0
      while (i < 10) {
        if (this.definition.includes(order[i]) === true) {
          i++
        } else {
          break
        }
      }
      return i
    }
  },
  watch: {
    definition (value) {
      if (!value) {
        this.definitions = []
        return
      }
      this.text = value
    },
    text (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    addExplain (array, index = array.length) {
      array.splice(index, 0, {
        type: '例',
        content: '',
        explain: ''
      })
    },
    addItem (array, index = array.length) {
      array.splice(index, 0, {
        content: '',
        example: []
      })
    }
  }
}
</script>

<style scoped>

</style>
