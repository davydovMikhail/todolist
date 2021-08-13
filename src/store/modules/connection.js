import axios from 'axios'
import router from '@/router/index'
import { BASE_API_URL as api } from '../../api'


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

    async AUTHORIZATION_REQUEST( Obj) {
      try {
        let response = await axios.post(`${api}/user/login`, { ...Obj })
        console.log(response)
        let access_token = response.data.data.access_token
        localStorage.setItem('access_token', access_token)
        const allUsers = await axios.get(`${api}/user/`)
        let currentUser = allUsers.data.data.items.filter(u => u.email === Obj.email)[0]
        localStorage.setItem('user', currentUser)

        setTimeout(router.push('/'), 3000)
      } catch(e) {
        alert("что-то пошло не так")
      }
    },

    EXIT() {
      delete axios.defaults.headers.common['Authorization']
    
    }

}
const mutations = {}
const state = {}
const getters = {}


export default {
    state,
    getters,
    actions,
    mutations
}

//"name:Mikhail, email:davydov27977@gmail.com, password: qwertyqwerty
