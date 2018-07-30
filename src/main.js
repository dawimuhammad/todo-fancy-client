import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from './store'
require('dotenv').config();
import 'font-awesome/css/font-awesome.min.css'
import firebase from 'firebase/app'

Vue.use(Vuetify, {
  iconfont: 'fa',
  icons: {
    'trash': 'fa trash-alt'
  }
})

Vue.use(firebase)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
