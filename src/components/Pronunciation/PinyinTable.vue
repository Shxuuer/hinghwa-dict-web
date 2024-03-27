<template>
  <a-row justify="center" type="flex">
    <a-col :span="18">
      <a-table :columns="columns" :data-source="pinyin">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <audio :src="'https://cos.edialect.top/pinyin/example/'+(record.pinyin || record.type)+'.mp3'" controls/>
          </template>
        </template>
      </a-table>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'PinyinTable',
  props: ['columns', 'pinyin']
}
</script>

<style scoped>

</style>
