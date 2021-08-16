import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router/index'
import store from './store/index'
import axios from 'axios'
import Cookies from 'js-cookie'


Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Cookies)



const access_token = Cookies.get('access_token');

if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
}

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
