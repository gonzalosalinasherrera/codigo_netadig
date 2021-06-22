<template>
  <div>
  <Breadcrumbs main="Grupos" title="Grupo Profile"/>
  <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="user-profile">
        <div class="row">
           <div class="col-sm-12">
            <div class="card">
              <div class="profile-img-style">
                <div class="row">
                  <div class="">
                    <div class="media">
                      <div class="media-body align-self-center">
                        <h1 class="">{{grupo.nombre}}</h1>
                      </div>
                    </div>
                      <div class="col-xl-12 col-md-6 col-sm-12">
                        <div class="">
                          <div class="row">
                            <b-button-group class="btn-group-square">
                              <b-button variant="outline-primary" v-if="enGrupo" @click="tojoin" id="default-primary" class="btn-pill" >Ver Solicitudes</b-button>
                              <b-button variant="outline-primary" v-if="enGrupo" @click="eliminarGrupo();" id="default-sm-primary" class="btn-pill" >Eliminar Grupo</b-button>
                              <b-button variant="outline-primary" v-if="enGrupo" @click="editarGrupo();" id="default-sm-primary" class="btn-pill" >Editar</b-button>
                              <b-button variant="outline-primary" v-if="Unirse" @click="solicitud" id="default-primary" class="btn-pill" >Unirse</b-button>
                              <b-button variant="outline-primary" v-if="Cancel" @click="cancelar" id="default-primary" class="btn-pill" >Cancelar Solicitud</b-button>
                              <b-button variant="outline-primary" @click="miembrosGrupo();" id="default-primary" class="btn-pill" >Miembros</b-button>
                              <b-button variant="outline-primary" v-if="Membership" @click="anunciosGrupo();" id="default-sm-primary" class="btn-pill" >Anuncios</b-button>
                              <b-button variant="outline-primary" v-if="Membership && enGrupo == false" @click="salirGrupo();" id="default-sm-primary" class="btn-pill">Salir</b-button>
                            </b-button-group>
                          </div>
                        </div>
                      </div>
                    
                  </div>
                </div>
                <hr>
                <div class="row">
                  <div class="col-lg-12 col-xl-4">
                    <div id="aniimated-thumbnials-3" itemscope="">
                      <figure><img class="img-fluid rounded" v-bind:src="grupo.banner" style="max-width: 640px; max-height: 300px;">
                      </figure>
                    </div>
                    <div class="like-comment mt-4 like-comment-sm-mb">
                      <ul class="list-inline">
                        <li class="list-inline-item border-right pr-3">
                          <label class="m-0"><a href="#"></a>Miembros</label><span class="ml-2 counter">{{cuantosmiembros()}}</span>
                        </li>
                        <li class="list-inline-item border-right pr-3">
                          <label class="m-0"><a href="#"><i class="fa fa-envelope-o mr-2"></i></a>{{grupo.fb}}, {{grupo.ig}}, {{grupo.tw}}</label><span class="ml-2 counter"></span>
                        </li>
<!--                         <li class="list-inline-item ml-2">
                          <label class="m-0"><a href="#"></a>Visitas</label><span class="ml-2 counter">569</span>
                        </li> -->
                      </ul>
                    </div>
                  </div>
                  <div class="col-xl-8">
                    <p> &emsp;&emsp; {{grupo.bio}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- user profile fifth-style end-->
        </div>
      </div>
    </div>
    <!-- Container-fluid Ends-->
  </div>
</template>
<script>
import axios from 'axios';
export default
{
  data(){
    return {
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      grupo: [],
      grupoid: '',
      union: [],
      es_miembro: [],
      sol: null,
      opcion: true,
      cancel: true,
      cantidad: null,
    }
  },
  methods:{
		miembrosGrupo(){
			this.$router.push('/grupos/miembros/' + this.grupoid[3])
    },
    anunciosGrupo(){
      this.$router.push('/grupos/anuncios_grupo/' + this.grupoid[3])
    },
    editarGrupo(){
      this.$router.push('/grupos/editar_grupo/' + this.grupoid[3])
    },
    getGrupo(){
      axios.get('http://127.0.0.1:8000/api/grupos/' + this.grupoid[3])
      .then((resp)=> {
        this.grupo = resp.data;
        this.cantidad = this.grupo.miembros
      }) 
    },
    eliminarGrupo(){
      axios.delete('http://127.0.0.1:8000/api/solicitud_grupo/' + this.grupoid[3])
      .then((resp) => {
        console.log(error)
      })
      .catch((error) => {
        console.log(error)
      })
      axios.delete('http://127.0.0.1:8000/api/grupos/' + this.grupoid[3])
      .then(resp => {
        this.$swal({
				  title:"Grupo eliminado con Exito",
				  type:'success'
			  }) 
        console.log(resp)
        this.$router.push('/grupos/grupos')
        })
      .catch(resp => console.log(resp))
      this.$router.push('/dashboard/default/')
    },
    cancelar(){
      const borrar = this.sol.indexOf(this.profile.id)
      this.sol.splice(borrar,1)
       axios.patch('http://127.0.0.1:8000/api/solicitud_grupo/' + this.grupoid[3] + '/',{
         user_in_grupo: this.sol
      })
      .then(resp => {
        this.$swal({
				  title:"Solicitud Eliminada!",
				  type:'error'
			  })
        .then(function(){
          location.reload();
        })
      })
    },
    verificaMiembro(){
      axios.get('http://127.0.0.1:8000/api/grupos/?id=' + this.grupoid[3] + '&created_by=&nombre=&miembros=' + this.user_id)
      .then((resp) => {
        this.es_miembro = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    tojoin(){
      this.$router.push('/grupos/solicitudes/' + this.grupoid[3])
    },
    solicitudesGrupo(){
      axios.get('http://127.0.0.1:8000/api/solicitud_grupo/' + this.grupoid[3] + '/')
      .then((resp) => {
        this.union = resp.data;
        console.log(this.union,'adasdsa')
        this.sol = this.union.user_in_grupo
        const esta = this.sol.indexOf(this.profile.id)
        if ( this.sol.length == 0 ){
          this.opcion = true
          this.cancel = false
        }else{
          if ( esta != -1 ){
            this.opcion = false
            this.cancel = true
          }else{
            this.opcion = true
            this.cancel = false
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    solicitud(){
      this.sol.push(this.user_id)
      console.log(this.user_id,this.sol)
      axios.patch('http://127.0.0.1:8000/api/solicitud_grupo/' + this.grupoid[3] + '/',{
        user_in_grupo: this.sol,
      })
      .then((resp)=> {			
        this.$swal({
				  title:"Solicitud Enviada!",
				  type:'success'
			  })
        .then(function(){
          location.reload();
        })
      })
    },
    getProfile(){
      axios.get('http://127.0.0.1:8000/api/users/' + this.user_id)
        .then((resp) => {
          this.profile = resp.data;
          this.solicitudesGrupo();
        })
        .catch((error) => {
          console.log(error)
        })
    },
    cuantosmiembros(){
      return this.cantidad.length
    },
    salirGrupo(){
      this.cantidad.splice(this.cantidad.indexOf(this.profile.id),1)
      axios.patch('http://127.0.0.1:8000/api/grupos/' + this.grupoid[3] + '/',{
        miembros: this.cantidad
      })
        .then((resp) =>{
          this.$swal({
				    title:"Has Salido del Grupo!",
				    type:'success'
			    })
          this.$router.push('/grupos/grupos')
        })
    },
  },
  created(){
      var currentUrl = window.location.pathname;
      this.grupoid = currentUrl.split("/");
      this.getGrupo();
      this.verificaMiembro();
      this.getProfile();
  },
  computed: {
    enGrupo(){
      return this.grupo.created_by == this.user_id
    },
    Unirse(){
      return this.grupo.created_by != this.user_id && this.opcion == true && this.es_miembro[0] == null
    },
    Cancel(){
      return this.cancel == true
    },
    Membership(){
      return this.es_miembro[0] != null
    },
  }
}
</script>