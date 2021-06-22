<template>
  <div>
    <Breadcrumbs main="Organizacion" title="Socios"/>
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
          <div class="card custom-card align-content-center"  v-for="user in miembros">
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
              <div class="col-4 col-sm-4">
                <b-button v-if="user_id != user.usuario.id" @click="hacerSocio" id="default-primary" class="btn-pill" variant="primary">Socio</b-button>
              </div>
              <div class="col-4 col-sm-4">
                <b-button v-if="Eliminar && user_id != user.usuario.id" @click="eliminarMiembro" id="default-primary" class="btn-pill" variant="primary">Eliminar</b-button>
              </div>
              <div class="col-4 col-sm-4">
                <b-button v-if="Eliminar && user_id != user.usuario.id" @click="eliminarMiembro" id="default-primary" class="btn-pill" variant="primary">Privilegios</b-button>
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
      orgid: '',
      organizacion: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      socios: [],
      profile: [],
      search: '',
    }
  },
  components: {
  },
  computed: {
      miembros: function(){
        return this.profile
      }
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getMiembros(){
      axios.get('http://127.0.0.1:8000/api/socios_org/' + this.orgid[3] + '/')
        .then((resp) => {
        this.organizacion = resp.data;
        this.socios = this.organizacion.user_in_socio
        this.members();
      })
        .catch((error) => {
        console.log(error)
      })
    },
    members(){
      this.socios.forEach(element => {
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
    this.orgid = currentUrl.split("/");
    this.getMiembros();
  }
}
</script>