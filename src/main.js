import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import axios from 'axios'


Vue.config.productionTip = false


const access_token = localStorage.getItem('access_token')

if (access_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
}

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
