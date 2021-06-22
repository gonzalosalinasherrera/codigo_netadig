<template>
  <div>
    <Breadcrumbs main="Grupos" title="Grupos"/>
    <!-- Container-fluid starts-->
    <div class="row col-12">
        <div class="search-wrapper panel-heading col-sm-8">
          <input class="form-control" type="text" v-model="search" placeholder="Search"/>
        </div>
        <div class="col-sm-3">
          <a href="javascript:history.go(-1)"><b-button class="btn btn-primary btn-block">Volver</b-button></a>
      </div>                         
    </div>   
    <div class="row justify-content-around">
        <div class="card" v-for="gr in filteredList" style="width: 22rem;">
            <router-link :to="{name: 'GroupProfile', params: {id: gr.id}}"><img class="card-img-top" v-bind:src="gr.banner" alt="" style="width: 350px; height: 350px;"></router-link>
            <h1 class="text-center">{{gr.nombre}}</h1>
            <div align="right">
              <br>
              <li class="list-inline-item pr-3" >
                <label class="m-0"><a href="#"><i class="fa fa-envelope-o mr-2"></i></a>{{gr.fb}}, {{gr.ig}}, {{gr.tw}}</label>
              </li>
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
      grupos: [],
      perPage: 5,
			currentPage: 1,
			token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
    }
  },
  computed:{
    filteredList(){
      return this.grupos.filter(gr =>{
        return gr.nombre.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods:{
    getGrupos(){
      axios.get('http://127.0.0.1:8000/api/grupos/')
      .then((resp) => {
			this.grupos = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
		},
  },
  created(){
    this.getGrupos();
  },
}
</script>