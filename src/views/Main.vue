<template>
  <div id="main">
    <div class="lists">
      <div class="user"><h6>{{user}}</h6><button type="submit" class="btn btn-primary" @click="logout">выйти</button></div>
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import List from "../components/List";
import Adder from "../components/Adder";
import ListFilter from "../components/ListFilter";
import Modal from "../components/Modal";

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
      user: localStorage.getItem("user")
    }
  },
  async created() {
    await this.GET_LISTS_FROM_BACK()
    this.GET_DEALS_FROM_BACK()


  },
  computed: {
    ...mapGetters(["FILTERED_LISTS"]),
  },
  methods: {
    ...mapActions(["CREATE_LIST", "GET_LISTS_FROM_BACK", "GET_DEALS_FROM_BACK", "EXIT"]),
    ...mapMutations(["CHANGE_THE_CURRENT_ID"]),
    logout() {
      this.EXIT
      localStorage.clear()
      this.$router.push('/authorization')
    }
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
