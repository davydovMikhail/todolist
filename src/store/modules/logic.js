import axios from 'axios'
import router from '@/router/index'
import { BASE_API_URL as api } from '../../api'


const actions = {
    UPDATE_URGENCY (context, value) {
        context.commit('UPDATE_URGENCY', value)
    },
    async CREATE_LIST({ commit }, given) {
        let newListObj = {
            name: given.trim(),
            count_tasks: 0,
            is_completed: false,
            is_closed: false,
        }
        
            try {
                const response = await axios.post(`${api}/list/create`, {attributes: newListObj})
                commit('ADD_LIST', response.data.data.attributes)
                commit('ADD_LIST', newListObj) // удалить
              } catch(e) {
                  alert('что-то пошло не так')
                  console.log(e)
              }
            
        
        let modal = {
            title: 'Cписок добавлен',
            message: `Список дел '${given.trim()}' добавлен`,
            buttons: [
                {
                    name: 'OK',
                    method: () => {
                        
                        commit( 'CHANGE_MODAL_DISPLAY')
                        }
                }
            ]
        }
        commit( 'UPDATE_MODAL_CONTENT' , modal)
        commit( 'CHANGE_MODAL_DISPLAY')
    },
    async CREATE_DEAL({ commit, getters }, given) {
        let newDealObj = {
            name: given.trim(),
            list_id: router.currentRoute.params.id,
            is_completed: false,
            urgency: state.urgency? 1 : 2,
            description: 'text'
        }

        let modal = {
            title: 'Дело добавлено',
            message: `Дело '${given}' добавлено в '${ getters.ALL_LISTS.find(x => x.id == router.currentRoute.params.id).name }'`,
            buttons: [
                {
                    name: 'OK',
                    method: () => {
                        commit( 'CHANGE_MODAL_DISPLAY')
                    }
                }
            ]
        }

        try {
            const response = await axios.post(`${api}/task`, {attributes: newDealObj})
            commit('ADD_DEAL', response.data.data.attributes)
            commit('COUNT_DEAL_INCREMENT')
            commit('CHANGE_PROPERTY_DONE', {getters} )
            commit( 'UPDATE_MODAL_CONTENT' , modal)
            commit( 'CHANGE_MODAL_DISPLAY')
            commit('CHANGE_NO_TODO_LIST', { getters })
        } catch(e) {
              alert('что-то пошло не так')
              console.log(e)
        }
    },
    DELETE_LIST({ commit }, list) {
        let modal = {
            title: 'Удалить список дел',
            message: `Удалить список дел '${list.name}'?`,
            buttons: [
                {
                    name: 'OK',
                    method: async () => {
                        try {
                            await axios.delete(`${api}/list/delete/${list.id}`)
                            commit('DELETE_LIST_FROM_LISTS', list.id)
                            if (router.currentRoute.params.id == list.id) {
                                router.push('/')
                            }
                            commit('CHANGE_MODAL_DISPLAY')
                        } catch (e) {
                            console.log(e)
                            commit('DELETE_LIST_FROM_LISTS', list.id)
                            if (router.currentRoute.params.id == list.id) {
                                router.push('/')
                            }
                            commit('CHANGE_MODAL_DISPLAY')
                        } 
                    }
                },
                {
                    name: 'Отмена',
                    method: () => {
                        commit( 'CHANGE_MODAL_DISPLAY')
                        }
                }
            ]
        }
        commit( 'UPDATE_MODAL_CONTENT' , modal)
        commit( 'CHANGE_MODAL_DISPLAY')  
    },
    DELETE_DEAL({ commit, getters }, deal) {
        let modal = {
            title: 'Удалить дело',
            message: `Удалить дело '${deal.name}' из списка '${getters.ALL_LISTS.find(x => x.id == router.currentRoute.params.id).name}'?`,
            buttons: [
                {
                    name: 'OK',
                    method: async () => {

                        try {
                            let response = await axios.delete(`${api}/task/delete/${deal.id}`)
                            commit('DELETE_DEAL_FROM_DEALS', deal.id)
                            commit('COUNT_DEAL_DECREMENT')
                            commit('CHANGE_NO_TODO_LIST', { getters })
                            commit('CHANGE_PROPERTY_DONE', { getters })
                            commit( 'CHANGE_MODAL_DISPLAY')
                            if (router.currentRoute.params.id == deal.id) {
                                router.push('/')
                            }
                        } catch (e) {
                            alert('что-то пошло не так')
                            console.log(e)
                        }

                        

                    }
                },
                {
                    name: 'Отмена',
                    method: () => {
                        commit( 'CHANGE_MODAL_DISPLAY')
                        }
                }
            ]
        }
        commit( 'UPDATE_MODAL_CONTENT' , modal)
        commit( 'CHANGE_MODAL_DISPLAY')
          
    },
    async SWITCH_CHECKBOX({ commit, getters }, deal) {
        try {  
            await axios.put(`${api}/task/update/${deal.id}`, {attributes: deal})
            commit('CHANGE_COMPLETED_CHECKBOX', deal.id)
            commit('CHANGE_PROPERTY_DONE', { getters })
        } catch (e) {
            alert('что-то пошло не так')
            console.log(e)
        }
    },
    async GET_LISTS_FROM_BACK({ commit }) {

        try {
            const response = await axios.get(`${api}/list/get-items`) 
            let result = Object.keys(response.data.data.items).map((key) => response.data.data.items[key]);
            commit('SET_LISTS', result)
        } catch(e) {
            // alert('что-то пошло не так')
            console.log(e.message)
        }

    },
    
    async GET_DEALS_FROM_BACK({ commit }) {
        try {
            const response = await axios.get(`${api}/task/get-items`)
            let result = Object.keys(response.data.data.items).map((key) => response.data.data.items[key]);
            commit('SET_DEALS', result)
        } catch(e) {
            // alert('что-то пошло не так')
            console.log(e.message)
        }
    },

}

const mutations = {
    ADD_LIST: (state, list) => state.lists.push(list),
    ADD_DEAL: (state, deal) => state.deals.push(deal),
    DELETE_LIST_FROM_LISTS(state, ID) {
        state.lists = state.lists.filter(list => list.id !== ID)
    },
    DELETE_DEAL_FROM_DEALS: (state, ID) => state.deals = state.deals.filter(deal => deal.id !== ID),
    CHANGE_COMPLETED_CHECKBOX(state, ID) {
        !state.deals.find(x => x.id == ID).is_completed
    },
    CHANGE_THE_CURRENT_ID(state, ID) { 
        state.current_id = ID
    },
    UPDATE_URGENCY (state, value) {
        state.urgency = value
    },
    CHANGE_NO_TODO_LIST(state, { getters }) {
        if (getters.ALL_DEALS.length == 0) {
            state.lists.find(x => x.id == router.currentRoute.params.id).no_todo = true
        } else {
            state.lists.find(x => x.id == router.currentRoute.params.id).no_todo = false
        }
    },
    CHANGE_PROPERTY_DONE(state, { getters }) {
        let completeness = getters.ALL_DEALS.every(x => x.is_completed == true)
        if (getters.ALL_DEALS.length == 0) { completeness = false }
        state.lists.find(x => x.id == router.currentRoute.params.id).is_completed = completeness
    },
    CHANGE_THE_CURRENT_CATEGORY(state, current_cut) {
        state.list_category = current_cut
    },
    CHANGE_MODAL_DISPLAY(state) {
        state.modalDisplay = !state.modalDisplay
    },
    UPDATE_MODAL_CONTENT(state, content) {
        state.modalContent = content
    },
    COUNT_DEAL_INCREMENT(state) {
        state.lists.find(x => x.id == router.currentRoute.params.id).count_tasks++
    },
    COUNT_DEAL_DECREMENT(state) {
        state.lists.find(x => x.id == router.currentRoute.params.id).count_tasks--
    },
    SET_LISTS: (state, arr) => state.lists = arr,
    SET_DEALS: (state, arr) => state.deals = arr,
}

const state = () => { return {
    lists: [],
    deals: [],
    urgency: false,
    current_id: null,
    list_category: 'unfinished',
    modalContent: null,
    modalDisplay: false,
    }
}

const getters = {
    ALL_LISTS(state) {
        return state.lists
    },
    // ALL_LISTS: (state) => state.lists.sort((a, b) => {
    //     return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    // }),
    
    FILTERED_LISTS: (state, getters) => {    
        switch (state.list_category) {
          case 'all':
            return state.lists
          case 'finished':
            return state.lists.filter(e => e.is_completed)
          default:
            return state.lists.filter(e => !e.is_completed)
        }
    },

    ALL_DEALS: (state) => {
        let dd = state.deals.filter(function(number) {
            return number.list_id == state.current_id;
        });
        dd.sort((a, b) => {
            return a.id > b.id ? -1 : 1
        })
        return dd
    },
    
    MODAL_FILLER(state) {
        return state.modalContent
    },

    WINDOW_SWITCH(state) {
        return state.modalDisplay
    },
    CONDITION_CURRENT_ID(state) {
        return !state.current_id ? true : false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}