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
        let access_token = response.data.data.access_token
        Cookies.set('access_token', access_token)
        commit('SET_EMAIL', Obj.email)
        localStorage.setItem('email', Obj.email)
        if (access_token) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
        }
        router.push('/')
      } catch(e) {
        alert("что-то пошло не так")
      }
    },

    async GET_CURRENT_USER({commit, getters}) {
      try {
        const allUsers = await axios.get(`${api}/user/`)
        let currentUser = allUsers.data.data.items.filter(u => u.email === state.email)[0]
        commit('SET_CURRENT_USER', currentUser.name)
        localStorage.setItem('user', currentUser.name)
      } catch(e) {
        console.log(e)
      }
    },

    EXIT() {
      delete axios.defaults.headers.common['Authorization']
    }

}
const mutations = {
  SET_CURRENT_USER: (state, user) => state.currentUser = user,
  SET_EMAIL: (state, email) => state.email = email 
}
const state = {
  currentUser: localStorage.getItem('user') || null,
  email: localStorage.getItem('email') || null
}
const getters = {
  CURRENT_USER: state => state.currentUser,
  EMAIL: state => state.email
}


export default {
    state,
    getters,
    actions,
    mutations
}

//"name:Mikhail, email:davydov27977@gmail.com, password: qwertyqwerty
