<template>
    
    <div class="lists__add">
        <form>
            <div class="mb-3">
                <input type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        :placeholder="textForPlaceHolder"
                        v-model="given">
            </div>
            <div class="form__button"> 
                <button type="submit" class="btn btn-primary" @click.prevent="send">{{ textButton }}</button>
                <slot></slot>
            </div>
        </form>
    </div>

</template>

<script>
export default {
    name: 'adder',
    props: {
      textForPlaceHolder: String,
      textButton: String  
    },
    data() {
        return {
            given: ''
        }
    },
    methods: {
        send() {
            this.given ? 
                this.$emit('createEl', this.given) : 
                alert("Поле пустое")
            this.given = ''
        }
  }
}
</script>