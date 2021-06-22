<template>
    <div>
        <Breadcrumbs main="Organizacion" title="anuncios"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="">
                <div class="card" v-if="miembroOrganizacion">
                    <div class="card-header">
                        <h3>Nuevo Anuncio de Organización</h3>
                    </div>
                    <form class="form theme-form">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group row mb-0">
                                        <label class="col-sm-3 col-form-label"><h4>Anuncio</h4></label>
                                        <div class="col-sm-12">
                                            <b-form-textarea rows="6" type="text" name="anuncio" v-model="anuncio" placeholder="Tu Anuncio Aqui"></b-form-textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="">
                                <b-button  @click="crearAnuncio();" variant="primary" class="mr-1">Crear</b-button>
                                <b-button @click="volver();" variant="light">Cancelar</b-button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-12" v-for="a in all_anuncios">
                    <b-card header-tag="div" header-class="b-t-success">
                        <h5 slot="header">{{a.anuncio}}
                            <div class=" float-right"> 
                                <b-button v-if="a.creador == user_id" @click="eliminar(a.id);" id="default-sm-primary" variant="primary"  size="sm" >Eliminar</b-button>
                            </div>
                        </h5>
                        <b-card-text class="mb-0"><p align="right">{{a.nombre}} | fecha: {{a.created_at}} </p></b-card-text>
                    </b-card>
                </div>
            </div>
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
      orgid: '',
      organizacion: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      search: '',
      profile: [],
      members: [],
      name: null,
      anuncio: null,
      crear: true,
      all_anuncios: [],
    }
  },
  components: {
  },
  computed: {
      miembroOrganizacion(){
          return this.crear
      }
  },
  methods: {
    getMiembros(){
        axios.get('http://127.0.0.1:8000/api/organizaciones/?id=' + this.orgid[3] + '&activa=&created_by=&nombre=&pais=&miembros=' + this.user_id)
        .then((resp) => {
            this.organizacion = resp.data;
            if( this.organizacion == []){
                this.crear = false;
            }else{
                this.crear = true;
            }
        })
        .catch((error) => {
            console.log(error)
        })
    },
    eliminar(to_delete){
        axios.delete('http://127.0.0.1:8000/api/anuncios_org/' + to_delete +  '/')
        .then(resp => {
            location.reload() 
            console.log(resp)
        })
        .catch(resp => console.log(resp))
    },
    volver(){
        this.$router.push('/organizaciones/perfil/' + this.orgid[3] + '/')
    },
    crearAnuncio(){
        this.name = this.profile.usuario.first_name + ' ' + this.profile.usuario.last_name
        console.log(this.organizacion[0].nombre,this.name)
        axios.post('http://127.0.0.1:8000/api/anuncios_org/',{
            anuncio: this.anuncio,
            org: this.orgid[3],
            creador: this.user_id,
            nombre_org: this.organizacion[0].nombre,
            nombre: this.name,
            id_org: this.organizacion[0].id,
        })
        .then(res => {
            location.reload()            
            console.log(res)
        })
        .catch(res => console.log(res))
    },
    getAnuncios(){
        axios.get('http://127.0.0.1:8000/api/anuncios_org/?id=&org=' + this.orgid[3] + '&creador=')
        .then((resp) => {
            this.all_anuncios = resp.data;
            this.all_anuncios = this.all_anuncios.reverse();
        })
       .catch((error) => {
            console.log(error)
      })
    },
    getProfile(){
      axios.get('http://127.0.0.1:8000/api/profile/' + this.user_id)
      .then((resp) => {
        this.profile = resp.data;
      }) 
    },
  },
  created(){
    var currentUrl = window.location.pathname;
    this.orgid = currentUrl.split("/");
    this.getMiembros();
    this.getAnuncios();
    this.getProfile();
  },
}
</script>