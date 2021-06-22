<template>
  <div>
    <Breadcrumbs main="Organizaciones" title="Organizaciones"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="row col-12">
        <div class="search-wrapper panel-heading col-sm-8">
          <input class="form-control" type="text" v-model="search" placeholder="Search"/>
        </div>      
        <div class="col-sm-3">
          <a href="javascript:history.go(-1)"><b-button class="btn btn-primary btn-block">Volver</b-button></a>
        </div>                  
      </div>
      <div id="my-table" class="user-cards">
        <div class="row justify-content-around">
          <div class="card custom-card"  v-for="(org,index) in filteredList" v-bind="org">
            <router-link :to="{name: 'OrgProfile', params: {id: org.id}}"><div class="card-header"><img class="img-fluid rounded" v-bind:src="org.banner" alt="" style="width: 350px; height: 350px;"></div></router-link> 
            <div class="card-profile"><img class="rounded-circle" v-bind:src="org.avatar" alt="" style="width: 170px; height: 170px;"></div>
              <ul class="card-social">
                <li class="list-inline-item"><a v-bind:href="org.fb"><i class="fa fa-facebook"></i></a></li>
                <li class="list-inline-item"><a v-bind:href="org.gm"> <i class="fa fa-google-plus"></i></a></li> 
                <li class="list-inline-item"><a v-bind:href="org.tw"><i class="fa fa-twitter"></i></a></li>
                <li class="list-inline-item"><a v-bind:href="org.ig"><i class="fa fa-instagram"></i></a></li>
              </ul>
            <div class="text-center profile-details justify-content-around">
              <h4>{{org.nombre}}</h4>
              <h6>{{org.email}}</h6>
            </div>
            <div class="card-footer row">
              <div class="">
                <h6>TIPO</h6>
                <h3 class="counter">{{org.tipo}}</h3>
              </div>
              <div class="text-center">
                <h6>Pais</h6>
                <h3 class="counter">{{org.pais}}</h3>
              </div>
            </div>
          </div>
        </div>  
      </div>
      <div class="action-row">
        <button v-if="perPage < organizacion.length" @click="previous()"><span>Anterior</span></button>
        <button v-if="perPage < organizacion.length" @click="next()"><span>Próximo</span></button>
      </div> 
    </div> 
  </div> 
</template>

<script>
import axios from 'axios';
export default{
	data(){
		return {
      search: '',
      organizacion: [],
      searchQuery: null,
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      union: null,
      perPage: 7,
      pageNumber: 0,
      orgs: [],
			}	
		},
	methods:{
		crear(){
			this.$router.push('/organizaciones/crear_organizacion')
		},
		getOrganizaciones(){
      axios.get('http://127.0.0.1:8000/api/organizaciones/?activa=1')
      .then((resp) => {
				this.organizacion = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
		},
		solicitud(){
			this.$router.push('/organizaciones/perfil/')
    },
  
    next(){
      this.pageNumber++;
    },
    previous(){
      this.pageNumber--;
    },
	},
	created(){
		this.getOrganizaciones();
  },    
  computed:{
    rows(){
      return this.organizacion.length
    },    
    currentPageItems(){
      return this.organizacion.slice(this.pageNumber*this.perPage,this.pageNumber*this.perPage+1+this.perPage)
    },   
    filteredList(){
      return this.organizacion.filter(org =>{
        return org.nombre.toLowerCase().includes(this.search.toLowerCase()) ||
        org.pais.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  }
}
</script>