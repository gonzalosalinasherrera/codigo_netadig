<template>
    <div>
        <Breadcrumbs main="Grupos" title="Crear Grupo"/>
        <!-- Container-fluid starts-->
        <div class="card">
            <div class="card-header">
                <h5>Tu Nuevo Grupo</h5>
            </div>
            <form id="formgrupo" @submit.prevent="checkForm" class="form theme-form">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group row">
                            <label for="nombre" class="col-sm-3 col-form-label">Nombre del Grupo</label>
                            <div class="col-sm-9">
                                <b-form-input type="text" id="nombre" v-model="nombre" placeholder="Nombre"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <label for="bio" class="col-sm-3 col-form-label">Descripcion</label>
                            <div class="col-sm-9">
                                <b-form-textarea rows="6" type="text" id="bio" name="bio" v-model="bio" placeholder="Pequeña BIO"></b-form-textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                </div>    
            </div>             
            <div class="card-footer">
                <div class="col-sm-9 offset-sm-3">
                    <b-button type="submit" variant="primary" class="mr-1">Crear</b-button>
                    <b-button @click="cancelar" type="reset" variant="light">Cancel</b-button>
                </div>
            </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
            nombre: null,
            bio: null,
            created_by: null,
            avatar: null,
            orgid: '',
            organizacion: [],
            fb: null,
            gm: null,
            ig: null,
            tw: null,
            banner: null,
            user: [],
            member: [],
        }
    },
    methods:{
        cancelar(){
            this.$router.push('/')
        },
        onChange(event){
            this.avatar  = event.target.files[0]
        },
        onChange2(event2){
            this.banner  = event2.target.files[0]
        },
        checkForm(){
            this.member.push(this.user_id)
            axios.post('http://127.0.0.1:8000/api/grupos_organizacion/',{
                nombre: this.nombre,
                bio: this.bio,
                created_by: this.user_id,
                organizacion: this.orgid[3],
                miembros: this.member,
            })
            .then(resp=> {
                axios.post('http://127.0.0.1:8000/api/solicitud_geo/',{
                    user_in_geo: [],
                    y: 'se crearon las solicitudes',
                })
                this.$swal({
				    title:"Grupo Creado Correctamente!",
				    type:'success'
			    });
                console.log(resp)
                this.$router.push('/organizaciones/grupos_organizacion/' + this.orgid[3])
            })
            .catch(error => {
                this.$swal({
				  title:"No se pudó crear el Grupo!",
				  type:'error'
			    });
                console.log(error)
            })
        },
        getOrganizacion(){
            axios.get('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3])
            .then((resp) => {
                this.organizacion = resp.data;
            })
            .catch((error) => {
                console.log(error)
            })
        },
    getUser(){
        axios.get('http://127.0.0.1:8000/api/profile/'+ this.user_id)
        .then((resp) => {
            this.user = resp.data;
        })
        .catch((error) => {
            console.log(error)
        })
    }
    }, 
    created(){
        var currentUrl = window.location.pathname;
        this.orgid = currentUrl.split("/");
        this.getOrganizacion();
        this.getUser();
    }
}
</script>
