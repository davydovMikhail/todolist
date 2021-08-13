import Vue from 'vue'
import Vuex from 'vuex'
import logic from './modules/logic'
import connection from './modules/connection'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        logic,
        connection
    }
})