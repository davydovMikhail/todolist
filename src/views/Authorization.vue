<template>
    <div id="main">
            
            <form class="form">
                <h1 class="form__title">Авторизация</h1>
                <div class="form__input">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Адрес электронной почты</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите ваш email" v-model="email">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">Пароль</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль" v-model="password">
                    </div>
                </div>
                <button type="button" class="btn btn-primary" @click="User">Войти</button>
                <router-link tag="a" :to="{ name: 'registration' }">Зарегистрироваться</router-link>
            </form>

    </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
import { mapActions } from 'vuex'


export default ({
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['AUTHORIZATION_REQUEST']),
        User() {
            let obj = {
                email: this.email,
                password: this.password
            }
            if(this.email && this.password) {
                this.AUTHORIZATION_REQUEST(obj)
            }    
        }
    }
    
})
</script>