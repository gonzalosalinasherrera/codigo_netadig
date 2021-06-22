<template>
   <!-- page-wrapper Start-->
    <div class="page-wrapper">
        <div class="container-fluid">
            <!-- sign up page start-->
            <div class="authentication-main">
                <div class="row">
                    <div class="col-sm-12 p-0">
                        <div class="auth-innerright" style="float:none;margin:auto;"> 
                            <div class="col-md-12"><div class="text-center"><img alt="" src="../assets/images/netadig_small.png"></div>
                            <div class="authentication-box">
                                <div class="card mt-4 p-4">
                                    <h4 class="text-center">Nuevo Usuario</h4>
                                    <h6 class="text-center">Ingrese sus datos para crear Usuario</h6>
                                    <form class="theme-form">
                                        <div class="form-row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="first_name" class="col-form-label">Nombre</label>
                                                    <input v-model="first_name" class="form-control" type="text" placeholder="Nombre">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="last_name" class="col-form-label">Apellido</label>
                                                    <input v-model="last_name" class="form-control" type="text" placeholder="Apellido">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="username" class="col-form-label">Usuario</label>
                                            <input v-model="username" class="form-control" type="text" placeholder="Username">
                                        </div>
                                        <div class="form-group">
                                            <label for="email" class="col-form-label">Correo</label>
                                            <input v-model="email" class="form-control" type="email" placeholder="tu-correo@correo.com">
                                        </div>
                                        <div class="form-group">
                                            <label for="password" class="col-form-label">Contraseña</label>
                                            <input v-model="password" name="password" id="password" class="form-control" type="password" placeholder="**********">
                                        </div>
    <!--                                     <div class="form-row">
                                            <form class="form theme-form datepicker-responsive">
                                                <div class="card-body">
                                                    <div class="form-group form-row">
                                                        <label for="bod" class="col-sm-3 col-form-label text-right">Fecha Nac.</label>
                                                        <div class="col-xl-6 col-sm-9">
                                                            <datepicker v-model="bod" input-class="datepicker-here form-control digits" :disabledDates="disabledDates" palceholder="DD/MM/YYYY"></datepicker>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div> -->
                                        <div class="form-row">
                                            <div class="col-sm-4">
                                                <button @click="Registrar();" class="btn btn-primary" type="button">Registrarse</button>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="text-left mt-2 m-l-20">Tienes una cuenta?  <a class="btn-link text-capitalize" href="ingreso">Ingresar</a></div>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- sign up page ends-->
            </div>
        </div>
    <!-- page-wrapper Ends-->
</template>

<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
import auth from "@/login/js/index";
export default {
    components: {
        Datepicker
    },
    data(){
        return{
            first_name:null,
            last_name:null,
            username:'',
            email:'',
            password: null,
            bod:null,
            avatar:'',
            pais:'',
            region:'',
            ciudad:'',
            direccion:'',
            telefono:'',
            imgprofile:'',
            usuario:{},
            gender: '',
            GENDERS: [
                {value: 'MASCULINO',text: 'MASCULINO'},
                {value: 'FEMENINO',text: 'FEMENINO'},
                {value: 'NO ESPECIFICAR',text: 'NO ESPECIFICAR'},
            ],   
        }
    },
    methods: {
        probar(){
            console.log(this.date)
        },
        datepickerAbierto: function() {
	        console.log('El datepicker ha sido abierto');
        },
        fechaSeleccionada: function() {
            console.log('Una fecha ha sido seleccionada');
        },
        datepickerCerrado: function() {
            console.log('El datepicker ha sido cerrado');
        },
        CreateUser() {
            axios.post('http://127.0.0.1:8000/api/users/',{
                username: this.username,
                password: this.password,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
            })
            .then(res => {
                this.$swal({
				    title:"Cuenta creada exitosamente",
				    type:'success'
			    })
                console.log(res)
                this.$router.push('/inicio/ingreso')
            })
            .catch(err => {
                this.$swal({
				    title:"La Cuenta no se ha podido crear",
				    type:'error'
			    })
                console.log(err)
            });
       },
       Registrar(){
           this.CreateUser()
       }
    }
    }
</script>