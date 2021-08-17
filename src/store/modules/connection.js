import axios from 'axios'
import router from '@/router/index'
import { BASE_API_URL as api } from '../../api'
import Cookies from 'js-cookie'


const actions = {
    async REGISTRATION_REQUEST({ dispatch }, Obj) {
        try {
          let response = await axios.post(`${api}/user/register`, { ...Obj })
          alert(response.data.data.message)
          await dispatch('AUTHORIZATION_REQUEST', { email: Obj.email, password: Obj.password })
        } catch (e) {
          alert("что-то пошло не так")
        }
    },

    async AUTHORIZATION_REQUEST({commit}, Obj) {
      try {
        let response = await axios.post(`${api}/user/login`, { ...Obj })
        console.log(response)
        let access_token = response.data.data.access_token
        Cookies.set('access_token', access_token);
        const allUsers = await axios.get(`${api}/user/`)
        let currentUser = allUsers.data.data.items.filter(u => u.email === Obj.email)[0]
        commit('SET_CURRENT_USER', currentUser.name)
        localStorage.setItem('user', currentUser.name)
        router.push('/')
      } catch(e) {
        alert("что-то пошло не так")
      }
    },

    EXIT() {
      delete axios.defaults.headers.common['Authorization']
    }

}
const mutations = {
  SET_CURRENT_USER: (state, user) => state.currentUser = user
}
const state = {
  currentUser: localStorage.getItem('user') || null
}
const getters = {
  CURRENT_USER: state => state.currentUser
}


export default {
    state,
    getters,
    actions,
    mutations
}

//"name:Mikhail, email:davydov27977@gmail.com, password: qwertyqwerty
