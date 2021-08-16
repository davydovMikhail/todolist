<template>
   <div id="main">
            
        <form class="form">
                <h1 class="form__title">Регистрация</h1>
                <div class="form__input">
                    <div class="form-group">
                    <label for="exampleInputEmail1">Имя</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите ваше имя" v-model="name">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputEmail1">Адрес электронной почты</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Введите ваш email" v-model="email">
                    </div>
                    <div class="form-group">
                    <label for="exampleInputPassword1">Пароль</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Введите пароль" v-model="password">
                    </div>
                </div>
                <button type="button" class="btn btn-primary" @click="register">Зарегистрироваться</button>
                <router-link tag="a" :to="{ name: 'authorization' }">Войти</router-link>
            </form>

    </div> 
</template>

<script>
import { mapActions } from 'vuex'


export default ({
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['REGISTRATION_REQUEST']),
        register() {
            let obj = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            if(this.name && this.email && this.password) {
                this.REGISTRATION_REQUEST(obj)
            }    
        }
    }
    
})
</script>
