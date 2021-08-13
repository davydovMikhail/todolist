<template>
    <div class="dropdown dropdown__body">
        <select class="btn btn-secondary dropdown-toggle dropdown__button" v-model="current_category">
            <option v-bind:value="categories.unfinished">Неисполненные</option>
            <option v-bind:value="categories.finished">Исполненные</option>
            <option v-bind:value="categories.all">Все</option>
        </select>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'listfilter',
    data() {
        return {
            categories: {
                unfinished: 'unfinished',
                finished: 'finished',
                all: 'all'
            },
            current_category: 'unfinished'

        }
    },
    methods: {
        ...mapMutations([
        'CHANGE_THE_CURRENT_CATEGORY'
        ])
    },
    watch: {
        current_category() {
            this.CHANGE_THE_CURRENT_CATEGORY(this.current_category)
        }
    }
}
</script>
