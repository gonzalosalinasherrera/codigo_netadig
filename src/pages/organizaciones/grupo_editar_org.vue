<template>
    <div>
        <Breadcrumbs main="Organizaciones" title="Editar Organizacion"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
         <div class="row">
            <div class="col-sm-12">

                <div class="card">
                    <div class="card-header">
                        <h5>Editar</h5>
                    </div>
                    <div class="card-body">
                       <b-form class="needs-validation">
                            <div class="form-row">
                                <div class="col-md-4 mb-3">
                                    <label for="c_form_first_name">Nombre del grupo</label>
                                    <b-form-input type="text" id="nombre" v-model="nombre" :state="nombre" placeholder="Nombre"></b-form-input>
                                    <b-form-valid-feedback :state="nombre">Lock Good</b-form-valid-feedback>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group mb-0">
                                        <label>Bio</label>
                                        <b-form-textarea type="text" id="bio" v-model="bio" rows="3"></b-form-textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <b-button @click="checkForm" variant="primary" class="mr-1">Editar</b-button>
                                <b-button @click="volver();" type="reset" variant="light">Cancel</b-button>
                            </div>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'OrgCreate',
    data(){
        return{
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
            nombre: null,
            bio: null,
            created_by: null,
            avatar: null,
            grupoid: null,
            grupo: [],
        }
    },
    methods:{
        cancelar(){
            this.$router.push('/organizaciones/organizaciones')
        },
        volver(){
            this.$router.push('/organizaciones/perfil_grupo/' + this.grupoid[3] + '/')
        },
        checkForm(){
            console.log(this.grupo)
            if ( this.bio == null ){
                this.bio = this.grupo.bio
            }
            if ( this.nombre == null ){
                this.nombre = this.grupo.nombre
            }
            axios.patch('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3] + '/',{
                nombre: this.nombre,
                bio: this.bio,
            })
            .then(res => {
                this.$swal({
				    title:"Se Actualizaron los Datos!",
			    })
                .then(function(){
                    location.reload()
                })
                console.log(res)
            })
            .catch(res => {
                this.$swal({
				    title:"No se pudo Actualizar los Datos",
			    })
                console.log(res)
            })
        },
        getGrupo(){
            axios.get('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3])
            .then((resp) => {
                this.grupo = resp.data;
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
    created(){
        var currentUrl = window.location.pathname;
        this.grupoid = currentUrl.split("/");
        this.getGrupo();
    },
}
</script>