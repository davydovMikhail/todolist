<template>
              <div class="todos">
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
