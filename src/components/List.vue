<template>
    <div class="list__main">
        <router-link tag="li" class="list__item" :to="{ name: 'Todos', params: { id: list.id }}">
            <div  class="list-group-item list__li"
            :class="[ list.count_tasks == 0 ? '' : list.is_completed ? 'pale_gray' : 'green']"
            >{{list.name}}</div>
        </router-link>
        <Remover @deleteEl="DELETE_LIST(list)"/>
    </div>
</template>

<script>
import Remover from '../components/Remover.vue'
import { mapActions } from 'vuex'


export default {
    name: 'list',
    components: {
        Remover
    },
    props: {
    list: Object,
    },
    methods: {
    ...mapActions([
        'DELETE_LIST'
    ]),
    }
}
</script>