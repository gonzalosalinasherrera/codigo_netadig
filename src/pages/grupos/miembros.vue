<template>
  <div>
    <Breadcrumbs main="Grupo" title="Miembros"/>
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
          <div class="card custom-card align-content-center"  v-for="user in mostrar">
            <router-link :to="{name: 'Profile', params: {id: user.usuario.id}}"><div class="card-header"><img class="img-fluid" v-bind:src="user.imgprofile" alt="" style="width: 420px; height: 420px;"></div></router-link> 
            <div class="card-profile"><img class="rounded-circle" v-bind:src="user.avatar" alt="" style="width: 170px; height: 170px;"></div>
            <ul class="card-social">
              <li class="list-inline-item"><a v-bind:href="user.fb"><em class="fa fa-facebook"></em></a></li>
              <li class="list-inline-item"><a v-bind:href="user.gm"><em class="fa fa-google-plus"></em></a></li> 
              <li class="list-inline-item"><a v-bind:href="user.tw"><em class="fa fa-twitter"></em></a></li>
              <li class="list-inline-item"><a v-bind:href="user.ig"><em class="fa fa-instagram"></em></a></li>
            </ul>
            <div class="text-center profile-details">
              <h4>{{user.usuario.first_name}} {{user.usuario.last_name}}</h4>
              <h6>{{user.usuario.email}}</h6>
            </div>
            <div class="card-footer row">
              <div class="col-12 col-sm-12">
                <b-button v-if="Eliminar && user_id != user.usuario.id" @click="eliminarMiembro(members.indexOf(user.usuario.id))" id="default-primary" class="btn-pill" variant="primary">Eliminar</b-button>
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
      all_members: [],
      search: '',
      profile: [],
    }
  },
  components: {
  },
  computed: {
    mostrar(){
      return this.profile;
    },
    Eliminar(){
      return this.user_id == this.grupo.created_by
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    eliminarMiembro: function(to_delete){
      this.members.splice(to_delete,1)
      axios.patch('http://127.0.0.1:8000/api/grupos/' + this.grupoid[3] + '/',{
        miembros: this.members,
      })
      .then(res => {
        location.reload()
        console.log(res)
        })
      .catch(res => console.log(res))
    },
    miembros(){
      this.members.forEach(element => {
        axios.get('http://127.0.0.1:8000/api/profile/' + element + '/')
        .then((resp) => {
          this.profile.push(resp.data);
        })
        .catch((resp)=>{
          console.log(resp)
        })     
      });
    },
    getMiembros(){
      axios.get('http://127.0.0.1:8000/api/grupos/' + this.grupoid[3])
      .then((resp) => {
        this.grupo = resp.data;
        this.members = this.grupo.miembros;
        this.all_members = this.members;
        this.miembros();
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  created(){
    var currentUrl = window.location.pathname;
    this.grupoid = currentUrl.split("/");
    this.getMiembros();
  }
}
</script>