<template>
  <div>
    <Breadcrumbs main="Organizaciones" title="Mis Organizaciones"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row">
        <div class="search-wrapper panel-heading col-sm-7">
            <input class="form-control " type="text" v-model="search" placeholder="Search"/>
        </div>     
        <div class="col-sm-2">
          <a href="javascript:history.go(-1)"><b-button class="btn btn-primary btn-block">Volver</b-button></a>
        </div>     
        <div class="col-sm-2">
          <b-button @click="activarOrg" id="default-sm-primary" size="sm" class="btn btn-primary btn-block">Ver Mis Organizaciones Inactivas</b-button>
        </div>              
      </div>
      <div class="col-4 col-sm-12"></div>
      <div class="user-cards">
        <div class="row justify-content-around">
          <div class="card custom-card"  v-for="org in filteredList">
            <router-link :to="{name: 'OrgProfile', params: {id: org.id}}"><div class="card-header"><img class="img-fluid rounded" v-bind:src="org.banner" alt="" style="width: 350px; height: 350px;"></div></router-link> 
            <div class="card-profile"><img class="rounded-circle" v-bind:src="org.avatar" alt="" style="width: 170px; height: 170px;"></div>
            <ul class="card-social">
                <li class="list-inline-item"><a v-bind:href="org.fb"><i class="fa fa-facebook"></i></a></li>
                <li class="list-inline-item"><a v-bind:href="org.gm"> <i class="fa fa-google-plus"></i></a></li> 
                <li class="list-inline-item"><a v-bind:href="org.tw"><i class="fa fa-twitter"></i></a></li>
                <li class="list-inline-item"><a v-bind:href="org.ig"><i class="fa fa-instagram"></i></a></li>
            </ul>
            <div class="text-center profile-details">
              <h4>{{org.nombre}}</h4>
              <h6>{{org.email}}</h6>
            </div>
            <div class="card-footer row">
              <div class="">
                <h6>TIPO</h6>
                <h3><span class="counter">{{org.tipo}}</span></h3>
              </div>
              <div class="">
                <h6>PAIS</h6>
                <h4 class="counter text-center">{{org.pais}}</h4>
              </div>
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
  components: {
  },
  props: {
  },
  data(){
    return{
      search:'',
      organizacion: [],
      perPage: 5,
      currentPage: 1,
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
    }
  },
  computed:{
    filteredList(){
      return this.organizacion.filter(org =>{
        return org.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
        org.pais.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    getOrganizaciones(){
      axios.get('http://127.0.0.1:8000/api/organizaciones/?activa=1&created_by=&nombre=&pais=&miembros=' + this.user_id)
      .then((resp) => {
        this.organizacion = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    activarOrg(){
      console.log(this.organizacion[0])
        this.$router.push('/organizaciones/activar_organizacion')
    },
  },
  created(){
    this.getOrganizaciones();
  },
}
</script>