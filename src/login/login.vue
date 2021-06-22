<template>
    <!-- page-wrapper Start-->
    <div class="page-wrapper">
        <div class="container-fluid p-0">
            <!-- login page start-->
            <div class="authentication-main">
                <div class="row">
                        <div class="auth-innerright" style="float:none;margin:auto;">
                            <div class="col-md-12"><div class="text-center"><img alt="" src="../assets/images/netadig_small.png"></div>
                            <div class="authentication-box">
                                <div class="card mt-4">
                                    <div class="card-body">
                                        <div class="text-center">
                                            <h4>LOGIN</h4>
                                            <h6>Ingrese su Username y Contraseña</h6>
                                        </div>
                                        <form class="theme-form">
                                            <div class="form-group">
                                                <label for="username" class="col-form-label pt-0">Username</label>
                                                <input v-model="username" class="form-control" required="" type="text">
                                            </div>
                                            <div class="form-group">
                                                <label for="password" class="col-form-label">Contraseña</label>
                                                <input v-model="password" autocomplete="" class="form-control" required="" type="password">
                                            </div>
                                            <div class="checkbox p-0">
                                                <input id="checkbox1" type="checkbox">
                                                <label for="checkbox1">Recordar</label>
                                            </div>
                                            <div class="form-group form-row mt-3 mb-0">
                                                <button @click="login" class="btn btn-primary btn-block" type="button">Ingresar</button>
                                            </div>
                                            <div class="form-group form-row mt-3 mb-0">
                                                <b-button @click="register" class="btn btn-secondary btn-block" type="button" variant="danger">Registrarse</b-button>
                                            </div>
                                        </form>
                                    </div>
                                </div>   
                                <p> Crea un Usuario para tí, para tu Organización</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- login page end-->
        </div>
    </div>
    <!-- latest jquery-->
</template>    

<script>
import axios from 'axios';
export default {
    components: {
    },
    data(){
        return{
            username:null,
            password: '',
            user: null,
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
        }
    },
    methods: {
        login(){
            axios.post('http://127.0.0.1:8000/api-token-auth/',{
                username: this.username,
                password: this.password,
            })
            .then(resp => {
                localStorage.setItem('user-token', resp.data.token);
                localStorage.setItem('user-id', resp.data.user_id);
                this.$router.push('/dashboard/default') 
                return resp.data;
            })
            .catch(err => {
                localStorage.removeItem('user-token')
            })
        },
        logout(){
            localStorage.removeItem('user-token');
            this.token = null;
        },
        register(){
            this.$router.push('/inicio/registro') 
        },
    },
}
</script>