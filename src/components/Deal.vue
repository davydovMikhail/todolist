<template>
    <li class="list-group-item" :class="{'list-group-item-danger': deal.urgency == 1? true : false}">
        <div class="todos__item">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="deal.is_completed" @change="checkbox">
            <div class="todos__item_text">{{deal.name}}</div>
            <div class="todos__item_date"><div class="date">{{ getDateFromId }}</div><div class="date">{{ getTimeFromId }}</div></div>
            <Remover @deleteEl="DELETE_DEAL(deal)"/>
        </div>    
    </li>
</template>

<script>
import Remover from './Remover.vue'
import { mapActions } from 'vuex'


export default {
    name: 'deal',
    components: {
        Remover
    },
    props: {
        deal: Object,
    },
    methods: {
    ...mapActions([
        'DELETE_DEAL',
        'SWITCH_CHECKBOX'
    ]),
    checkbox() {
        this.SWITCH_CHECKBOX(this.deal)
    }
    },
     computed: {
        getDateFromId() {
            let date = new Date(this.deal.created_at)
            return date.toLocaleDateString('ru-RU')
        },
        getTimeFromId() {
            let time = new Date(this.deal.created_at)
            return time.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            })
        }
     },
}
</script>