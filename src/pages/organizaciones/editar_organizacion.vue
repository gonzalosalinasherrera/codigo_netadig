<template>
    <div>
        <Breadcrumbs main="Organizaciones" title="Editar Organizacion"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Editar {{organizacion.nombre}}</h5>
                        </div>
                        <div class="card-body">
                            <b-form class="needs-validation">
                                <div class="form-row">
                                    <div class="col-md-4 mb-3">
                                        <label for="c_form_first_name">Nombre de la Organizacion</label>
                                        <b-form-input type="text" id="nombre" v-model="nombre" :state="nombre" placeholder="Nombre"></b-form-input>
                                        <b-form-valid-feedback :state="nombre">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="c_form_last_name">Pais</label>
                                        <b-form-input type="text" id="pais" v-model="pais" :state="pais" placeholder="Pais"></b-form-input>
                                        <b-form-valid-feedback :state="pais">Lock Good</b-form-valid-feedback>
                                    </div>
                                    <div class="col-md-4 mb-3">
                                        <label for="c_form_username">Region</label>
                                        <b-form-input type="text" id="region" v-model="region" :state="region" placeholder="Region"></b-form-input>
                                        <b-form-invalid-feedback :state="region">Lock Good</b-form-invalid-feedback>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="c_form_city">Ciudad</label>
                                        <b-form-input type="text" id="ciudad" v-model="ciudad" :state="ciudad" placeholder="Ciudad"></b-form-input>
                                        <b-form-invalid-feedback :state="ciudad">Please provide a valid city.</b-form-invalid-feedback>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="c_form_state">Dirección</label>
                                        <b-form-input type="text" id="direccion" v-model="direccion" :state="direccion" placeholder="Direccion"></b-form-input>
                                        <b-form-invalid-feedback :state="direccion">Please provide a valid address.</b-form-invalid-feedback>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="c_form_zipcode">Telefono</label>
                                        <b-form-input type="text" id="fono" v-model="fono" :state="fono" placeholder="+56912345678"></b-form-input>
                                        <b-form-invalid-feedback :state="fono">Please provide a valid Phone.</b-form-invalid-feedback>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-3 mb-3">
                                        <label for="c_form_zipcode">Instagram</label>
                                        <b-form-input type="url" id="ig" v-model="ig" :state="ig" placeholder="Instagram.com/asd"></b-form-input>
                                        <b-form-invalid-feedback :state="ig">Please provide a valid URL.</b-form-invalid-feedback>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="c_form_zipcode">Facebook</label>
                                        <b-form-input type="url" id="fb" v-model="fb" :state="fb" placeholder="Facebook.com/asd"></b-form-input>
                                        <b-form-invalid-feedback :state="fb">Please provide a valid URL.</b-form-invalid-feedback>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="c_form_zipcode">Twitter</label>
                                        <b-form-input type="url" id="tw" v-model="tw" :state="tw" placeholder="twitter.com/asd"></b-form-input>
                                        <b-form-invalid-feedback :state="tw">Please provide a valid URL.</b-form-invalid-feedback>
                                    </div>
                                    <div class="col-md-3 mb-3">
                                        <label for="c_form_zipcode">Gmail</label>
                                        <b-form-input type="url" id="gm" v-model="gm" :state="gm" placeholder="gmail.com/asd"></b-form-input>
                                        <b-form-invalid-feedback :state="gm">Please provide a valid URL.</b-form-invalid-feedback>
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
    /* import Datepicker from 'vuejs-datepicker'; */
export default {
    name: 'OrgCreate',
    data(){
        return{
            orgid: '',
            organizacion: [],
            miembros: [],
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
            nombre: null,
            bio: null,
            pais: null,
            region: null,
            ciudad: null,
            direccion: null,
            fb: null,
            ig: null,
            tw: null,
            gm: null,
            fono: null,
            url: null,
            created_by: null,
            activa: true,
            tipo: null,
        }
    },
    methods:{
        cancelar(){
            this.$router.push('/organizaciones/organizaciones')
        },
        volver(){
            this.$router.push('/organizaciones/perfil/' + this.orgid[3])
        },
        checkForm(){
            if( this.nombre == null ){
                this.nombre = this.organizacion.nombre;
            }
            if( this.bio == null ){
                this.bio = this.organizacion.bio;
            }
            if( this.pais == null ){
                this.pais = this.organizacion.pais;
            }
            if( this.region == null ){
                this.region = this.organizacion.region;
            }
            if( this.ciudad == null ){
                this.ciudad = this.organizacion.ciudad;
            }
            if( this.direccion == null ){
                this.direccion = this.organizacion.direccion;
            }
            if( this.fb == null ){
                this.fb = this.organizacion.fb;
            }
            if( this.ig == null ){
                this.ig = this.organizacion.ig;
            }
            if( this.tw == null ){
                this.tw = this.organizacion.tw;
            }
            if( this.gm == null ){
                this.gm = this.organizacion.gm;
            }
            if( this.fono == null ){
                this.fono = this.organizacion.fono;
            }
            if( this.url == null ){
                this.url = this.organizacion.url;
            }
            axios.patch('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3] + '/',{
                nombre: this.nombre,
                bio: this.bio,
                pais: this.pais,
                region: this.region,
                ciudad: this.ciudad,
                direccion: this.direccion,
                fb: this.fb,
                ig: this.ig,
                tw: this.tw,
                gm: this.gm,
                fono: this.fono,
                url: this.url,
            })
            .then(resp => {
                this.$swal({
				  title:"Se Actualizaron los Datos!",
			    })
                console.log(resp)
            })
            .catch(error => console.log(error))
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
    },
    created(){
        var currentUrl = window.location.pathname;
        this.orgid = currentUrl.split("/");
        this.getOrganizacion();
        this.obtainData();
  }
}
</script>