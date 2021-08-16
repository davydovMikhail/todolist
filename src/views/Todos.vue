<template>
              <div class="todos">
                                <button type="button" class="btn btn-primary" @click="$router.push('/')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg></button>
                <h2>{{ title }}</h2>
                <div class="todos__todos">
                    <ul class="list-group">
                      <Deal :deal="deal"
                      v-for="deal in ALL_DEALS"
                      :key="deal.id"
                      />       
                    </ul>
                </div>
                <Adder @createEl="CREATE_DEAL" textForPlaceHolder="Введите название дела" textButton="Добавить дело">
                  <div class="form-check form-switch ">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="stateOfUrgency">
                    <label class="form-check-label" for="flexSwitchCheckDefault">Срочное</label>
                  </div>
                </Adder>
            </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Deal from '../components/Deal'
import Adder from '../components/Adder'



export default {
  name: 'Todos',
  components: {
    Adder,
    Deal
  },
  computed: {
    ...mapGetters([
      'ALL_DEALS',
      'ALL_LISTS' 
    ]),
    stateOfUrgency: {
      get () {
        return this.$store.state.urgency
      },
      set (value) {
        this.UPDATE_URGENCY(value)
      }
    },
    title() {
      return this.ALL_LISTS.find(x => x.id == this.$route.params.id).name
    }
  },
  methods: {
  ...mapActions([
    'CREATE_DEAL',
    'UPDATE_URGENCY'
  ])
  },
}
</script>

<style scoped>
h2 {
  word-wrap: break-word;
}
button {
  position: absolute;
  top: 10px;
  left: 10px
}
</style>