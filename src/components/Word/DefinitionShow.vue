<template>
  <a-list
    :data-source="analysedDefinition"
    item-layout="horizontal"
    style="margin: 16px"
  >
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <div slot="title" style="font-size: 18px;color: black;padding-bottom: 8px">
          {{ item.content }}
        </div>
        <div v-for="exp in item.example" :key="exp.content" slot="description" style="padding: 5px">
          <a-tag color="rgb(64, 49, 131)"> {{ exp.type }}</a-tag>
          <span style="padding:5px">
                  <ExampleSpan :content="exp.content"/>
                  <span style="font-size:x-small"> {{ exp.explain }} </span>
                </span>
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
import ExampleSpan from './ExampleSpan'
import { splitDefinition } from './Definition'

export default {
  name: 'Definition',
  props: ['definition'],
  components: {
    ExampleSpan
  },
  data () {
    return {}
  },
  computed: {
    analysedDefinition () {
      // [{
      //   content: 'content',
      //   example: [
      //     {
      //       type: '例',
      //       content: '',
      //       explain: ''
      //     }
      //   ]
      // }
      // ]
      if (this.definition) {
        return splitDefinition(this.definition)
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
