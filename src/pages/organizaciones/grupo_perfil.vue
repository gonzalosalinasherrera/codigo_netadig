<template>
  <div>
  <Breadcrumbs main="Grupos Organizacion" title="Grupo Profile"/>
  <!-- Container-fluid starts-->
    <div class="container-fluid">
      <div class="user-profile">
        <div class="row">
           <div class="col-sm-12">
            <div class="card">
              <div class="profile-img-style">
                <div class="row">
                  <div class="col-sm-8">
                    <div class="media">
                      <div class="media-body align-self-center">
                        <h1>{{grupo.nombre}}</h1>
                      </div>
                    </div>
                    <div class="col-xl-12 col-md-6 col-sm-12">
                      <div class="">
                        <div class="row">
                          <b-button-group class="btn-group-square">
                            <b-button variant="outline-primary" v-if="Unirse" @click="solicitud" id="default-primary" class="btn-pill" >Unirse</b-button>
                            <b-button variant="outline-primary" v-if="enGrupo" @click="tojoin" id="default-primary" class="btn-pill" >Ver Solicitudes</b-button>
                            <b-button variant="outline-primary" v-if="Cancel" @click="cancelar" id="default-primary" class="btn-pill" >Cancelar Solicitud</b-button>
                            <b-button variant="outline-primary" @click="miembrosGrupo();" id="default-primary" class="btn-pill" >Miembros</b-button>
                            <b-button variant="outline-primary" v-if="enGrupo" @click="eliminarGrupo();" id="default-sm-primary" class="btn-pill" >Eliminar Grupo</b-button>
                            <b-button variant="outline-primary" v-if="enGrupo" @click="editarGrupo();" id="default-sm-primary" class="btn-pill" >Editar</b-button>
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
                      <figure><img class="img-fluid rounded" v-bind:src="grupo.banner" style="max-width: 640px; max-height: 360px;" alt="">
                      </figure>
                    </div>
                    <div class="like-comment mt-4 like-comment-sm-mb">
                      <ul class="list-inline">
                        <li class="list-inline-item border-right pr-3">
                          <label class="m-0"><a href="#"></a>Miembros</label><span class="ml-2 counter">{{largoMembers}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <p>{{grupo.bio}}</p>
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
      largo: [],
      sol: null,
      opcion: true,
      cancel: true,
    }
  },
  methods:{
	  miembrosGrupo(){
		  this.$router.push('/organizaciones/miembros_grupo_org/' + this.grupoid[3])
    },
    editarGrupo(){
      this.$router.push('/organizaciones/editar_grupo_org/' + this.grupoid[3])
    },
    anunciosGrupo(){
      this.$router.push('/organizaciones/anuncios_grupo_org/' + this.grupoid[3])
    },
    getGrupo(){
      axios.get('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3])
      .then((resp)=> {
        this.grupo = resp.data;
        this.largo = this.grupo.miembros;
      }) 
    },
    eliminarGrupo(){
      axios.delete('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3])
      .then(resp => {
        this.$swal({
				  title:"Grupo de la Organización Eliminado",
          type: 'error'
			  })
        console.log(resp)
        this.$router.push('/organizaciones/mis_organizaciones')
      })
      .catch(resp => console.log(resp))
      axios.delete('http://127.0.0.1:8000/solicitud_geo/' + this.grupoid[3])
      .then(resp => console.log(resp))
      .catch(resp => console.log(resp))
    },
    salirGrupo(){
      this.largo.splice(this.largo.indexOf(this.profile.id),1)
      axios.patch('http://127.0.0.1:8000/api/grupos_organizacion/' + this.grupoid[3] + '/',{
        miembros: this.largo
      })
    },
    cancelar(){
      axios.delete('http://127.0.0.1:8000/api/solicitud_geo/' + this.union[0].id)
      .then(resp => {
        this.$swal({
				  title:"Solicitud Eliminada!",
				  type:'error'
			  });        
        console.log(resp)
      })
      .catch(resp => console.log(resp))
    },
    verificaMiembro(){
      axios.get('http://127.0.0.1:8000/api/grupos_organizacion/?id=' + this.grupoid[3] + '&created_by=&nombre=&organizacion=&miembros=' + this.user_id)
      .then((resp) => {
        this.es_miembro = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    tojoin(){
      this.$router.push('/organizaciones/solicitud_grupo_org/' + this.grupoid[3])
    },
    solicitudesGrupo(){
      axios.get('http://127.0.0.1:8000/api/solicitud_geo/' + this.grupoid[3] + '/')
      .then((resp) => {
        this.union = resp.data
        this.sol = this.union.user_in_geo
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
      axios.patch('http://127.0.0.1:8000/api/solicitud_geo/' + this.grupoid[3] + '/',{
        user_in_geo: this.sol,
      })
			this.$swal({
				title:"Solicitud Enviada!",
				type:'success'
			});
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
  },
  created(){
      var currentUrl = window.location.pathname;
      this.grupoid = currentUrl.split("/");
      this.getGrupo();
      this.getProfile();
      this.verificaMiembro();
  },
  computed: {
    enGrupo(){
      return this.grupo.created_by == this.user_id
    },
    Unirse(){
      return this.grupo.created_by != this.user_id && this.opcion == true && this.es_miembro[0] == null
    },
    Cancel(){
      return this.cancelar == true
    },
    largoMembers(){
      return this.largo.length
    },
    Membership(){
      return this.es_miembro[0] != null
    },
  }
}
</script>