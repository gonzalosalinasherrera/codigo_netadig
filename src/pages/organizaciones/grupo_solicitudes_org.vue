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
          <div class="card custom-card align-content-center"  v-for="user in filteredList">
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
             <div class="card-footer row">
              <div class="col-6 col-sm-6">
                <b-button @click="aceptSol(user.usuario.id);">Aceptar</b-button>
              </div>
              <div class="col-6 col-sm-6">
                <b-button @click="cancelSol(user.usuario.id);">Cancelar</b-button>
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
export default{
	data(){
		return {
            search:'',
	        users: [],
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
            profiles: [],
            grupoid: '',
            solicitudes: [],
            grupo: [],
            members: [],
            sol: [],
            profile: [],
			}	
		},
	methods:{
    aceptSol: function(to_delete){
      this.members.push(to_delete)
      this.llenarM(to_delete)
    },
    llenarM(to_delete){
      axios.patch('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3] + '/',{
        miembros: this.members,
      })
      .then(resp => {  
        const borrar = this.sol.indexOf(to_delete)
        this.sol.splice(borrar,1)
        axios.patch('http://127.0.0.1:8000/api/solicitud_geo/' + this.grupoid[3] + '/',{
          user_in_geo: this.sol
        })
        .then(resp => console.log(resp))
        .catch(error => console.log(error))  
      })
      .catch(error => console.log(error))
    },
    cancelSol(to_delete){
        const borrar = this.members.indexOf(to_delete)
        this.members.splice(borrar,1)
        axios.patch('http://127.0.0.1:8000/api/solicitud_geo/' + this.grupoid[3] + '/',{
          user_in_geo: this.members
        })
        .then(resp => console.log(resp))
        .catch(error => console.log(error))  
    },
    getGrupo(){
      axios.get('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3])
      .then((resp) => {
        this.grupo = resp.data;
        this.members = this.grupo.miembros
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getSolicitudes(){
      axios.get('http://127.0.0.1:8000/api/solicitud_geo/'+ this.grupoid[3] + '/')
      .then((resp) => {
        this.solicitudes = resp.data
        this.sol = this.solicitudes.user_in_geo
        this.miembros();
      })
      .catch((error) => {
        console.log(error)
      })
    },
    miembros(){
      this.sol.forEach(element => {
        axios.get('http://127.0.0.1:8000/api/profile/' + element + '/')
        .then((resp) => {
          this.profile.push(resp.data);
        })
        .catch((resp)=>{
          console.log(resp)
        })     
      });
    },
	},
	created(){
    var currentUrl = window.location.pathname;
    this.grupoid = currentUrl.split("/");
    this.getGrupo();
    this.getSolicitudes();
  },
  computed:{
    filteredList(){
      return this.profile.filter(user =>{
        return user.usuario.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.usuario.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.usuario.email.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
}
</script>