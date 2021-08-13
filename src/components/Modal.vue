<template>
    <div id="modal_window" v-if="WINDOW_SWITCH">
        <div class="modal-dialog modal__body">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ MODAL_FILLER.title }}</h5>
                    <!-- <h5 class="modal-title">title</h5> -->
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">&times;</button>
                            <!-- <span aria-hidden="true">&times;</span> -->
                </div>
                <div class="modal-body">
                    <!-- <p>message</p> -->
                    <p>{{ MODAL_FILLER.message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" 
                    class="btn btn-danger"
                    v-for="button in MODAL_FILLER.buttons"
                    :key="button.title"
                    @click="button.method"
                    :class="[button.type === 'OK' ? 'btn_ok' : 'btn_action']"
                    >{{ button.name }}</button>
                    <!-- <button type="button" class="btn btn-danger">Save changes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
    name: 'modal',
    methods: {
    ...mapMutations(["CHANGE_MODAL_DISPLAY"]),
    close() {
        this.CHANGE_MODAL_DISPLAY()
    }
    },
    computed: {
        ...mapGetters(["MODAL_FILLER", "WINDOW_SWITCH"]),
        // ...mapState(["modalDisplay"])
    }
}
</script>
