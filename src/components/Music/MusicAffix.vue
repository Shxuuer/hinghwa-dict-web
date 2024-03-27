<template>
  <div style="z-index: 1000;padding-left:30px">
    <a-affix :offset-bottom="offset" style="width: fit-content">

      <a-popover
          v-model:open="visible"
          placement="right"
          style="z-index: 1100"
          trigger="click"
      >
        <template #content>
          <a-card :bordered="false" style="width:400px;" >
            <template #title>
              <h2>莆仙曲目</h2>
            </template>
            <template #extra>
              <a-button :disabled="$route.name==='Music'" type="link" @click="$router.push({name:'Music'})" >
                进入方言曲库
              </a-button>
            </template>

            <img :src="music.cover" alt="音乐封面" style="width: 95%;"/>

            <div style="text-align: center"> {{ musicTitle }}</div>

            <audio
                ref="myAudio"
                :src="music.source"
                autoplay
                controls loop style="width: 100%;"
            />
          </a-card>
        </template>

        <a-button shape="circle" size="large" style="display: flex">
          <a-avatar size="large" style="top: -7px">
            <template #icon><CustomerServiceOutlined /></template>
          </a-avatar>
        </a-button>
      </a-popover>

    </a-affix>
  </div>
</template>

<script>
import axios from '@/axios'
import { CustomerServiceOutlined } from '@ant-design/icons-vue'

export default {
  name: 'MusicAffix',
  components: { CustomerServiceOutlined },
  data () {
    return {
      music: {
        id: 0,
        source: '',
        title: '',
        artist: '',
        cover: '',
        likes: 0
      },
      visible: false,
      musicID: 8,
      offset: 400 * document.documentElement.clientHeight / document.documentElement.clientWidth
    }
  },

  computed: {
    musicTitle () {
      return this.music.artist + ' - ' + this.music.title
    }
  },
  created () {
    axios.get('/music/' + this.musicID.toString()).then(res => {
      this.music = res.data.music
    })
  }
}
</script>

<style scoped>

</style>
