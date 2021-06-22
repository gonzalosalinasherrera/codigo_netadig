<template>
  <div>
    <Breadcrumbs main="Grupos" title="Grupos de la Organizacion"/>
    <!-- Container-fluid starts-->
    <div class="row col-12">
      <div class="search-wrapper panel-heading col-sm-6">
        <input class="form-control" type="text" v-model="search" placeholder="Search"/>
      </div>       
      <div class="col-sm-3">
          <a href="javascript:history.go(-1)"><b-button class="btn btn-primary btn-block">Volver</b-button></a>
      </div>   
      <div class="col-sm-3">
          <b-button v-if="Unirse == false" @click="crearGrupo();" id="default-sm-primary" size="sm"  class="btn btn-primary btn-block">Crear Grupo</b-button></a>
      </div>
    </div>
    <div class="row justify-content-around">
      <div class="card" v-for="gr in filteredList" style="width: 25rem;">
        <router-link :to="{name: 'GrupoProfileOrganizacion', params: {id: gr.id}}"><div class="card-header"><img class="img-fluid rounded" v-bind:src="gr.banner" alt="" style="width: 350px; height: 350px;"></div></router-link>
        <h2 class="text-center">{{gr.nombre}}</h2>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  components: {
  },
  props: {
  },
  data(){
    return{
      orgid: '',
      search: '',
      grupos: [],
      perPage: 5,
      organizacion: [],
      currentPage: 1,
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      es_miembro: [],
    }
  },
  computed:{
    filteredList(){
      return this.grupos.filter(gr =>{
        return gr.nombre.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    Unirse(){
      return this.organizacion.created_by != this.user_id && this.es_miembro[0] == null
    },
  },
  methods:{
    getGrupos(){
      axios.get('http://127.0.0.1:8000/api/grupos_organizacion/?created_by=&nombre=&organizacion=' + this.orgid[3])
      .then((resp) => {
        this.grupos = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
	  },
    verificaMiembro(){
      axios.get('http://127.0.0.1:8000/api/organizaciones/?id=' + this.orgid[3] + '&activa=&created_by=&nombre=&pais=&miembros=' + this.user_id)
      .then((resp) => {
        this.es_miembro = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    crearGrupo(){
      this.$router.push('/organizaciones/crear_grupo/' + this.orgid[3])
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
    this.getGrupos();
    this.getOrganizacion();
  },
}
</script>