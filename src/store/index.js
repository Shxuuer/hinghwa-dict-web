import axios from '@/axios'
import moment from 'moment'
import { createStore } from 'vuex'
import { message } from 'ant-design-vue'

moment.locale('zh-cn')

const defaultUser = {
  id: 0,
  username: 'username',
  nickname: 'nickname',
  email: 'pxm@edialect.top',
  avatar: 'https://cos.edialect.top/website/默认头像.jpg',
  points_now: 0,
  points_sum: 0
}
export default createStore({
  state: {
    tab1: [],
    drawerVisibility: false,
    drawerLoading: false,
    user: Object.create(defaultUser),
    publish_articles: [],
    like_articles: [],
    notification: {
      statistics: {
        total: 0,
        sent: 0,
        received: 0,
        unread: 0
      },
      sent: [],
      received: []
    },
    contribution: {
      pronunciation: 0,
      pronunciation_uploaded: 0,
      word: 0,
      word_uploaded: 0,
      listened: 0
    },
    replyTo: 0,
    commentsLoading: false,
    comments: [
      {
        id: 1234,
        user: {
          id: 0,
          nickname: 'nickname',
          avatar: 'http://dummyimage.com/100x100'
        },
        content: 'content',
        time: '2000-01-01 00:00:00',
        parent: 123
      }
    ]
  },
  getters: {
    /**
     * 登录状态
     * @param state
     * @returns {boolean} 是否已经登录
     */
    loginStatus (state) {
      return state.user.id > 0
    },

    // getter区
    tab1 (state) {
      return state.tab1
    },
    drawerVisibility (state) {
      return state.drawerVisibility
    },
    drawerLoading (state) {
      return state.drawerLoading
    },
    user (state) {
      return state.user
    },
    publish_articles (state) {
      return state.publish_articles
    },
    like_articles (state) {
      return state.like_articles
    },
    replyTo (state) {
      return state.replyTo
    },
    comments (state) {
      return state.comments
    },
    commentsLoading (state) {
      return state.commentsLoading
    },
    contribution (state) {
      return state.contribution
    },
    notification (state) {
      return state.notification
    },
    pointsNow (state) {
      return state.user.points_now
    },
    pointsSum (state) {
      return state.user.points_sum
    },
    title (state) {
      return state.user.title
    }
  },
  mutations: {
    tab1 (state, value) {
      const list = ['ptxTranslation', 'xtpTranslation']
      if (list.indexOf(value[0]) >= 0) {
        state.tab1 = Object.assign([], value)
      } else {
        state.tab1 = []
      }
    },
    drawerVisibility (state, value) {
      state.drawerVisibility = value
      if (value === true) {
        this.dispatch('userUpdate')
      }
    },

    userLogout (state) {
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      state.user = {
        ...defaultUser
      }
      state.publish_articles = []
      state.like_articles = []
      state.drawerVisibility = false
    },

    changeReplyTo (state, value) {
      state.replyTo = value
    },
    updateComments (state, id) {
      state.commentsLoading = true
      return axios.get('/articles/' + id + '/comments').then(res => {
        state.comments = res.data.comments
        state.comments.forEach(item => {
          item.time = moment(item.time).fromNow()
        })
      }).finally(() => {
        state.commentsLoading = false
      })
    },
    setUnread (state, number) {
      if (number >= 0) {
        state.notification.statistics.unread = number
      }
    }
  },
  actions: {
    async loginByToken ({ state, dispatch }) {
      if (localStorage.getItem('token')) {
        await axios.put('/login', {}).then(async res => {
          localStorage.setItem('token', res.data.token)
          await dispatch('userLogin', res.data.id)
        }).catch(() => {
          message.error('登录已过期，请重新登录')
        })
      }
    },

    async userLogin ({ state, dispatch }, id) {
      if (state.user.id.toString() === id.toString()) return
      state.user.id = Number(id)
      localStorage.setItem('id', id)
      return dispatch('userUpdate')
    },

    async userUpdate ({ state }) {
      state.drawerLoading = true
      return axios.get('/users/' + state.user.id).then(async (res) => {
        if (!res.data.notification) {
          await this.commit('userLogout')
          return
        }
        state.user = res.data.user
        state.publish_articles = res.data.publish_articles
        state.like_articles = res.data.like_articles
        state.contribution = res.data.contribution
        state.notification = res.data.notification
      }).catch(async () => {
        await this.commit('userLogout')
      }).finally(() => {
        state.drawerLoading = false
      })
    }
  },
  modules: {}
})
