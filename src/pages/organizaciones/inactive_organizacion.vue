<template>
  <div>
    <Breadcrumbs main="Organizaciones" title="Mis Organizaciones Inactivas"/>
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
          <div class="card custom-card"  v-for="org in organizacion">
            <router-link :to="{name: 'OrgProfile', params: {id: org.id}}"><div class="card-header"><img class="img-fluid rounded" v-bind:src="org.banner" alt="" style="width: 350px; height: 350px;"></div></router-link> 
            <div class="card-profile"><img class="rounded-circle" v-bind:src="org.avatar" alt="" style="width:40%"></div>
            <ul class="card-social">
              <li class="list-inline-item"><a v-bind:href="org.fb"><em class="fa fa-facebook"></em></a></li>
              <li class="list-inline-item"><a v-bind:href="org.gm"><em class="fa fa-google-plus"></em></a></li> 
              <li class="list-inline-item"><a v-bind:href="org.tw"><em class="fa fa-twitter"></em></a></li>
              <li class="list-inline-item"><a v-bind:href="org.ig"><em class="fa fa-instagram"></em></a></li>
            </ul>
            <div class="text-center profile-details">
              <h4>{{org.nombre}}</h4>
              <h6>{{org.email}}</h6>
            </div>
            <div class="card-footer row">
              <div class="col-4 col-sm-4">
                <h6>Follower</h6>
                <h3 class="counter">9564</h3>
              </div>
              <div class="col-4 col-sm-4">
                <h6>Following</h6>
                <h3><span class="counter">49</span>K</h3>
              </div>
              <div class="col-4 col-sm-4">
                <h6>Total Post</h6>
                <h3><span class="counter">96</span>M</h3>
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
      organizacion: [],
      perPage: 5,
      currentPage: 1,
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
    }
  },
  computed:{
    rows(){
      return this.fields.length
    }
  },
  methods: {
    getOrganizaciones(){
      axios.get('http://127.0.0.1:8000/api/organizaciones/?activa=0&created_by=' + this.user_id + '&nombre=&pais=&miembros=' + this.user_id)
        .then((resp) => {
          this.organizacion = resp.data;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    activarOrg(){
      this.$router.push()
    },
  },
  created(){
    this.getOrganizaciones();
  },
}
</script>