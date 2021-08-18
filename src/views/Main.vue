<template>
  <div id="main">
    <div class="lists" v-if="widthCondition || CONDITION_CURRENT_ID">
      <div class="user"><h5>{{ CURRENT_USER }}</h5><button type="submit" class="btn btn-primary" @click="logout">выйти</button></div>
      <ListFilter />
      <ul class="list-group list__body">
        <List :list="list" v-for="list in FILTERED_LISTS" :key="list.id" />
      </ul>
      <Adder
        @createEl="CREATE_LIST"
        textForPlaceHolder="Введите название списка"
        textButton="Добавить список"
      />
    </div>
    <router-view :key="$route.fullPath"></router-view>
    <Modal />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import List from "../components/List";
import Adder from "../components/Adder";
import ListFilter from "../components/ListFilter";
import Modal from "../components/Modal";
import Cookies from 'js-cookie'


export default {
  name: "Main",
  components: {
    Adder,
    List,
    ListFilter,
    Modal
  },
  data() {
    return {
      widthCondition: null,
    }
  },
  async created() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  async mounted() {
      await this.GET_LISTS_FROM_BACK()
      await this.GET_DEALS_FROM_BACK()
      await this.GET_CURRENT_USER()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },  
  computed: {
    ...mapGetters(["FILTERED_LISTS", "CURRENT_USER", "CONDITION_CURRENT_ID"])
  },
  methods: {
    ...mapActions(["CREATE_LIST", "GET_LISTS_FROM_BACK", "GET_DEALS_FROM_BACK", "EXIT", "GET_CURRENT_USER"]),
    ...mapMutations(["CHANGE_THE_CURRENT_ID"]),
    logout() {
      this.EXIT
      localStorage.clear()
      Cookies.remove('access_token')
      this.$router.push('/authorization')
    },
    onResize() {
      this.widthCondition = document.documentElement.clientWidth > 890 ? true : false;
    },
  },
  watch: {
    $route() {
      this.CHANGE_THE_CURRENT_ID(this.$route.params.id);
    },
    
  },
};
</script>

<style>
.router-link-exact-active.router-link-active {
  border-left: 7px solid #4b0082;
  border-top: 2px solid #4b0082;
  border-bottom: 2px solid #4b0082;
  border-right: 2px solid #4b0082;
}
</style>
