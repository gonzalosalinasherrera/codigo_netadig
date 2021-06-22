<template>
  <div>
    <Breadcrumbs main="Usuarios" title="Lista de Usuarios"/>
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
      <div class="user-cards">
        <div class="row justify-content-around">
          <div class="card custom-card align-content-center"  v-for="user in filteredList" :key="user" :value="user">
            <router-link :to="{name: 'Profile', params: {id: user.usuario.id}}"><div class="card-header"><img class="img-fluid" v-bind:src="user.imgprofile" alt="" style="width: 420px; height: 420px;"></div></router-link> 
            <div class="card-profile"><img class="rounded-circle" v-bind:src="user.avatar" alt="" style="width: 170px; height: 170px;"></div>
            <ul class="card-social">
              <li class="list-inline-item"><a v-bind:href="user.fb"><i class="fa fa-facebook"></i></a></li>
              <li class="list-inline-item"><a v-bind:href="user.gm"> <i class="fa fa-google-plus"></i></a></li> 
              <li class="list-inline-item"><a v-bind:href="user.tw"><i class="fa fa-twitter"></i></a></li>
              <li class="list-inline-item"><a v-bind:href="user.ig"><i class="fa fa-instagram"></i></a></li>
            </ul>
            <div class="text-center profile-details">
              <h4>{{user.usuario.first_name}} {{user.usuario.last_name}}</h4>
              <h6>{{user.usuario.email}}</h6>
            </div>

          </div>
        </div>  
      </div> 
    </div>  
  </div> 
</template>
<script>
import axios from 'axios';
export default{
	data(){
		return {
      search:'',
			users: [],
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      profiles: [],
      totalPages: Number,
      perPage: 1,
      currentPage: 1,
		}	
	},
	methods:{
		getUsers(){
      axios.get('http://127.0.0.1:8000/api/users/')
      .then((resp) => {
				this.users = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
		},
    getProfiles(){
      axios.get('http://127.0.0.1:8000/api/profile/')
      .then((resp) => {
				this.profiles = resp.data;
        this.totalPaginas();
      })
      .catch((error) => {
        console.log(error)
      })
		},
    totalPaginas(){
      this.totalPages = parseInt((this.profiles.length / this.perPage)+1);
      console.log(this.totalPages)
    }
	},
	created(){
		this.getUsers();
    this.getProfiles();
  },
  computed:{
    filteredList(){
      return this.profiles.filter(user =>{
        return user.usuario.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.usuario.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.usuario.email.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  }
}
</script>