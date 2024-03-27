import store from '../store'
import { createRouter, createWebHashHistory } from 'vue-router'
import { message } from 'ant-design-vue'

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../views/Music/MusicList.vue')
  },
  {
    path: '/search',
    name: 'Search',
    props: route => ({ keyWords: route.query.key }),
    component: () => import('../views/SearchResult.vue')
  },
  // Login区
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Login/Register.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/Login/Forget.vue')
  },
  // Articles区
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('../views/Articles/ArticlesPage.vue')
  },
  {
    path: '/articles/create',
    name: 'ArticleCreate',
    props: true,
    component: () => import('../views/Articles/ArticleEdit.vue')
  },
  {
    path: '/articles/:id',
    name: 'ArticleDetails',
    props: true,
    component: () => import('../views/Articles/ArticleDetails.vue')
  },
  {
    path: '/articles/edit/:id',
    name: 'ArticleEdit',
    props: true,
    component: () => import('../views/Articles/ArticleEdit.vue')
  },
  // Users区
  {
    path: '/users/certificate/:id',
    name: 'Certificate',
    props: true,
    component: () => import('../views/Users/Certificate.vue')
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    props: true,
    component: () => import('../views/Users/UserDetails.vue')
  },
  {
    path: '/settings',
    name: 'UserSettings',
    component: () => import('../views/Users/UserSettings.vue')
  },
  {
    path: '/notification',
    name: 'Notification',
    component: () => import('../views/Users/Notification.vue')
  },
  {
    path: '/admin/certificate',
    name: 'AddCertificate',
    component: () => import('../views/admin/AddCertificate.vue'),
    meta: {
      requiresAuth: true
    }
  },
  // 积分
  {
    path: '/rewards',
    name: 'Rewards',
    component: () => import('../views/Rewards/Rewards.vue')
  },
  {
    path: '/rewards/detail/:id',
    name: 'RewardsDetails',
    component: () => import('../views/Rewards/Detail.vue'),
    props: true
  },
  {
    path: '/admin/rewards',
    name: 'AdminRewards',
    component: () => import('../views/admin/Rewards/Index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rewards/transactions',
    name: 'RewardsTransactions',
    component: () => import('../views/Rewards/Transactions.vue')
  },
  // 词单
  {
    path: '/wordlist',
    name: 'WordList',
    component: () => import('../views/Words/WordList/WordList.vue')
  },
  {
    path: '/wordlist/editor',
    name: 'WordListEditor',
    component: () => import('../views/Words/WordList/WordListEditor.vue'),
    props: true
  },
  {
    path: '/wordlist/:id',
    name: 'WordListDetails',
    props: true,
    component: () => import('../views/Words/WordList/WordListDetail.vue')
  },
  // Tools区
  {
    path: '/pinyin',
    name: 'Pinyin',
    component: () => import('../views/PinYin.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('../views/Tools/ToolsPage.vue')
  },
  {
    path: '/tools/conditions',
    name: 'Conditions',
    component: () => import('../views/Tools/Conditions.vue')
  },
  {
    path: '/tools/QuickRecording',
    name: 'QuickRecording',
    component: () => import('../views/Tools/QuickRecording.vue')
  },
  {
    path: '/tools/QuickRecording/RecordRank',
    name: 'RankList',
    component: () => import('../components/Pronunciation/RankList.vue')
  },
  {
    path: '/tools/characters',
    name: 'Characters',
    component: () => import('../views/Tools/Characters.vue')
  },
  {
    path: '/tools/DailyExpressions',
    name: 'DailyExpressions',
    component: () => import('../views/Tools/DailyExpressions.vue')
  },
  {
    path: '/tools/RecordConfirming',
    name: 'RecordConfirming',
    component: () => import('../views/Tools/RecordConfirming.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tools/WordConfirming',
    name: 'WordConfirming',
    component: () => import('../views/Tools/WordConfirming.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tools/Relative',
    name: 'Relative',
    component: () => import('../views/Tools/Relative.vue')
  },
  {
    path: '/words/Create',
    name: 'WordCreate',
    props: true,
    component: () => import('../views/Words/WordEdit.vue')
  },
  {
    path: '/words/:id',
    name: 'WordDetails',
    props: true,
    component: () => import('../views/Words/WordDetails.vue')
  },
  {
    path: '/words/:id/edit',
    name: 'WordEdit',
    props: true,
    component: () => import('../views/Words/WordEdit.vue')
  },
  {
    path: '/application/:id',
    name: 'Application',
    props: true,
    component: () => import('../views/Words/Application.vue')
  },
  // 答题区
  {
    path: '/PuxianExam',
    name: 'PuxianExam',
    props: true,
    component: () => import('../views/Quiz/Quiz.vue')
  },
  {
    path: '/PuxianExam/Create',
    name: 'QuizCreate',
    props: true,
    component: () => import('../views/Quiz/QuizEdit.vue')
  },
  {
    path: '/PuxianExam/:id',
    name: 'QuizDetails',
    props: true,
    component: () => import('../views/Quiz/QuizDetails.vue')
  },
  {
    path: '/PuxianExam/Research',
    name: 'QuizResearch',
    props: true,
    component: () => import('../views/Quiz/QuizResearch.vue')
  },
  // 词典区
  {
    path: '/Dictionary',
    name: 'Dictionary',
    props: true,
    component: () => import('../views/DictionaryPage.vue')
  },
  // 翻译区
  {
    path: '/Translation',
    name: 'Translation',
    props: true,
    component: () => import('../views/Translation/translation.vue'),
    children: [
      {
        path: '/ptxTranslation',
        name: 'ptxTranslation',
        props: true,
        component: () => import('../views/Translation/ptxTranslation.vue')
      },
      {
        path: '/xtpTranslation',
        name: 'xtpTranslation',
        props: true,
        component: () => import('../views/Translation/xtpTranslation.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)', // 不识别的path自动匹配404
    redirect: '/NotFound'
  },
  {
    path: '/NotFound',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/Forbidden',
    name: 'Forbidden',
    component: () => import('../views/ForbiddenPage.vue')
  }
]

const router = createRouter({
  base: '/',
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth && !this.$store.getters?.user?.is_admin) {
    message.error('您没有权限访问此页面')
    return {
      path: '/Forbidden'
    }
  }
  store.commit('tab1', [to.name])
  store.commit('drawerVisibility', false)
})

export default router
