<template>
  <a-list
      :data-source="analysedDefinition"
      item-layout="horizontal"
      style="margin: 16px"
  >
    <template #renderItem="{item}">
      <a-list-item>
        <a-list-item-meta>
          <template #title>
            <div style="font-size: 18px;color: black;padding-bottom: 8px">
              {{ item.content }}
            </div>
          </template>
          <template #description>
            <div v-for="exp in item.example" :key="exp.content" style="padding: 5px">
              <a-tag color="rgb(64, 49, 131)"> {{ exp.type }}</a-tag>
              <span style="padding:5px">
              <ExampleSpan :content="exp.content"/>
              <span style="font-size:x-small"> {{ exp.explain }} </span>
            </span>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
import ExampleSpan from './ExampleSpan.vue'
import { splitDefinition } from './Definition'

export default {
  name: 'DefinitionShow',
  props: ['definition'],
  components: {
    ExampleSpan
  },
  data () {
    return {}
  },
  computed: {
    analysedDefinition () {
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
