<template>
    <div>
        <Breadcrumbs main="Grupo" title="Anuncios"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="">
                <div class="card" v-if="miembroOrganizacion">
                    <div class="card-header">
                        <h5>Nuevo Anuncio del Grupo</h5>
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
                                <b-button @click="volver();" type="reset" variant="light">Cancelar</b-button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-12" v-for="a in all_anuncios">
                    <b-card header-tag="div" header-class="b-t-info">
                        <h5 slot="header">{{a.anuncio}}
                            <div class=" float-right"> 
                                <b-button v-if="a.creador == user_id" @click="eliminar(a.id);" id="default-sm-primary" variant="primary"  size="sm" >Eliminar</b-button>
                            </div>
                        </h5>
                        <b-card-text class="mb-0"><p align="right">{{a.nombre}} | fecha: {{a.created_at}}</p></b-card-text> 
                        </style>
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
      grupoid: '',
      grupo: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      search: '',
      profile: [],
      members: [],
      anuncio: null,
      crear: true,
      name: null,
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
        axios.get('http://127.0.0.1:8000/api/grupos/?id=' + this.grupoid[3] + '&created_by=&nombre=&miembros=' + this.user_id)
        .then((resp) => {
            this.grupo = resp.data;
            if( this.grupo == []){
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
        axios.delete('http://127.0.0.1:8000/api/anuncios_grupo/' + to_delete +  '/')
        .then(resp => {
            this.$swal({
			  title:"Anuncio eliminado con Exito",
			  type:'success'
		    })
        .then(function(){
            location.reload()
        })
        console.log(resp)
        })
        .catch(resp => console.log(resp))
    },
    volver(){
        this.$router.push('/grupos/perfil/' + this.grupoid[3] + '/')
    },
    crearAnuncio(){
        this.name = this.profile.usuario.first_name + ' ' + this.profile.usuario.last_name
        axios.post('http://127.0.0.1:8000/api/anuncios_grupo/',{
            anuncio: this.anuncio,
            grupo: this.grupoid[3],
            creador: this.user_id,
            nombre: this.name,
            nombre_grupo: this.grupo.nombre,
            id_grupo: this.grupo.id,
        })
        .then(res => {
            console.log(res)
            location.reload()
        })
        .catch(res => console.log(res))
    },
    getAnuncios(){
        axios.get('http://127.0.0.1:8000/api/anuncios_grupo/?id=&grupo=' + this.grupoid[3] + '&creador=')
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
    this.grupoid = currentUrl.split("/");
    this.getMiembros();
    this.getAnuncios();
    this.getProfile();
  },
}
</script>