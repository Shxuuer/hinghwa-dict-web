import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

await store.dispatch('loginByToken')

const app = createApp(App)

app.use(Antd).use(store).use(router)
app.mount('#app')
