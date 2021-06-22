<template>
    <div>
    <Breadcrumbs main="Organizacion" title="Perfil"/>
    <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="user-profile">
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="profile-img-style">
                  <div class="row">
                    <div class="">
                      <div class="media"><img class="img-thumbnail rounded-circle mr-3" v-bind:src="organizacion.avatar" alt="Generic placeholder image" style="width: 125px; height: 125px;">
                        <div class="media-body align-self-center">
                          <h1 class="">{{organizacion.nombre}}</h1>
                        </div>
                      </div>
                        <div class="col-xl-12 col-md-6 col-sm-12">
                          <div class="col-xl-12 col-md-6 col-sm-12">
                            <div class="row">
                              <b-button-group class="btn-group-square">
                                <b-button @click="membersin" id="default-sm-primary" variant="outline-primary"  size="sm"class="btn-pill" >Miembros</b-button>
                                <b-button v-if="onOrg" @click="tojoin" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Solicitudes</b-button>
                                <b-button v-if="onOrg" @click="socios" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Socios</b-button>
                                <b-button v-if="Unirse" @click="solicitud" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Unirse</b-button> 
                                <b-button v-if="Cancel" @click="cancelar" id="default-sm-primary" variant="outline-primary"  size="sm"class="btn-pill" >Cancelar Solicitud</b-button>
                                <b-button id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Modulos</b-button>
                                <b-button @click="verGrupos" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Grupos</b-button>
                                <b-button v-if="onOrg" @click="desactivarOrg();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Desactivar</b-button>
                                <b-button v-if="onOrg" @click="editarOrg();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill" >Editar</b-button>
                                <b-button v-if="organizacion.activa === false" @click="activarOrg();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Activar</b-button>
                                <b-button v-if="onOrg" @click="eliminarOrg();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Eliminar Organizacion</b-button>
                                <b-button v-if="MiembroOrganizacion" @click="crearGrupo();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Crear Grupo</b-button>
                                <b-button v-if="MiembroOrganizacion" @click="crearAnuncio();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Anuncios</b-button>
                                <b-button v-if="MiembroOrganizacion && onOrg == false" @click="salirOrg();" id="default-sm-primary" variant="outline-primary"  size="sm" class="btn-pill">Salir</b-button>
                              </b-button-group>
                            </div>
                          </div>
                        </div>
                      
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="icol-lg-12 col-xl-4">
                      <div id="aniimated-thumbnials" itemscope="">
                        <figure><a href="#"><img class="img-fluid rounded" v-bind:src="organizacion.banner" style="width: 800px; height: 450px;"></a>
                        </figure>
                      </div>                               
                    </div>              
                    <div class="col-xl-6">
                      <p>{{organizacion.bio}}</p>
                    </div>
                  </div>                  
                  <div class="like-comment mt-4">
                    <ul class="list-inline">
                      <li class="list-inline-item border-right pr-3">
                        <label class="m-0"><a href="#"><i class="fa fa-map-marker mr-2"></i></a>{{organizacion.direccion}}, {{organizacion.ciudad}} -</label><span class="ml-2 counter">{{organizacion.pais}}</span>
                      </li>
                      <li class="list-inline-item border-right pr-3">
                        <label class="m-0"><a href="#"><i class="fa fa-envelope-o mr-2"></i></a>{{organizacion.email}}</label><span class="ml-2 counter"></span>
                      </li>
                      <li class="list-inline-item border-right pr-3">
                        <label class="m-0"><a href="#"><i class="fa fa-phone mr-2"></i></a>{{organizacion.fono}}</label><span class="ml-2 counter"></span>
                      </li>
                      <li class="list-inline-item ml-2">
                        <label class="m-0"><a href="#"><i class="fa fa-building mr-2"></i></a>{{organizacion.url}}</label><span class="ml-2 counter"></span>
                      </li>
                    </ul>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- Container-fluid Ends-->
    </div>
</template>
<script>
import axios from 'axios';

export default{
  data(){
    return{
      orgid: '',
      organizacion: [],
      miembros: [],
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      nombre: null,
      bio: null,
      pais: null,
      region: null,
      ciudad: null,
      direccion: null,
      fb: null,
      ig: null,
      tw: null,
      gm: null,
      fono: null,
      url: null,
      created_by: null,
      activa: false,
      tipo: null,
      on: null,
      off: null,
      union: [],
      user: null,
      es_miembro: [],
      profile: null,
      soc: null,
      sol: null,
      opcion: true,
      cancel: true,
      btn: false,
      members: [],
    }
  },
  methods:{
		membersin(){
			this.$router.push('/organizaciones/miembros/' + this.orgid[3])
    },
    crearAnuncio(){
      this.$router.push('/organizaciones/anuncios/' + this.orgid[3])
    },
    tojoin(){
      this.$router.push('/organizaciones/solicitudes/' + this.orgid[3])
    },
    crearGrupo(){
      this.$router.push('/organizaciones/crear_grupo/' + this.orgid[3])
    },
    socios(){
      this.$router.push('/organizaciones/socios/' + this.orgid[3])
    },
    salirOrg(){
      this.members.splice(this.members.indexOf(this.profile.id),1)
      axios.patch('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3] + '/',{
        miembros: this.members
      })
    },
    cancelar(){
      const borrar = this.sol.indexOf(this.profile.id)
      this.sol.splice(borrar,1)
      this.btn = true
       axios.patch('http://127.0.0.1:8000/api/solicitud_organizacion/' + this.orgid[3] + '/',{
         user_to_join: this.sol
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
      .catch(resp => console.log(resp)) 
    },
    solicitud(){
      this.sol.push(this.user_id)
      this.btn = false
      axios.patch('http://127.0.0.1:8000/api/solicitud_organizacion/' + this.orgid[3] + '/',{
        user_to_join: this.sol,
      })
			this.$swal({
				title:"Solicitud Enviada!",
				type:'success'
			})
      .then(function(){
        location.reload();
      })
    },
    getOrganizacion(){
      axios.get('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3])
      .then((resp) => {
        this.organizacion = resp.data;
        this.members = this.organizacion.miembros;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    verGrupos(){
      this.$router.push('/organizaciones/grupos_organizacion/'+this.orgid[3])
    },
    desactivarOrg(){
      axios.patch('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3] + '/',{
        activa: 0,
      })
      .then(resp => {
        this.$swal({
				  title:"Organización Desactivada Correctamente!",
				  type:'success'
			  })
        .then(function(){
          location.reload();
        })
        console.log(resp)
      })
      .catch(resp => console.log(resp))
    },
    activarOrg(){
      axios.patch('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3] + '/',{
        activa: 1,
      })
      .then(resp => 
      {
        this.$swal({
				  title:"Organización Activada Correctamente!",
				  type:'success'
			  })
        .then(function(){
          location.reload();
        })
        console.log(resp)
      })
      .catch(resp => console.log(resp))
        //this.$router.push('/organizaciones/mis_organizaciones')
    },
    eliminarOrg(){
      axios.delete('http://127.0.0.1:8000/api/solicitud_organizacion/' + this.orgid[3])
      axios.delete('http://127.0.0.1:8000/api/organizaciones/' + this.orgid[3])
      .then(resp => {
        this.$swal({
				  title:"Organización Eliminada",
          type: 'error'
			  })
        console.log(resp)
        this.$router.push('/organizaciones/mis_organizaciones')
      })
      .catch(resp => console.log(resp))
    },
    editarOrg(){
      this.$router.push('/organizaciones/editar_organizacion/'+this.orgid[3])
    },
    solicitudesOrg(){
      axios.get('http://127.0.0.1:8000/api/solicitud_organizacion/' + this.orgid[3])
      .then((resp) => {
        this.union = resp.data;
        this.sol = this.union.user_to_join
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
    verificaMiembro(){
      axios.get('http://127.0.0.1:8000/api/organizaciones/?id=' + this.orgid[3] + '&activa=&created_by=&nombre=&pais=&miembros=' + this.user_id)
      .then((resp) => {
        this.es_miembro = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getProfile(){
      axios.get('http://127.0.0.1:8000/api/users/' + this.user_id)
        .then((resp) => {
          this.profile = resp.data;
          this.solicitudesOrg();
        })
        .catch((error) => {
          console.log(error)
        })
    },  
    getSocios(){
      axios.get('http://127.0.0.1:8000/api/socios_org/' + this.orgid[3])
      .then((resp) => {
        this.soc = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    onOrg(){
      return this.organizacion.created_by == this.user_id && this.organizacion.activa == true
    },
    Unirse(){
      return this.organizacion.created_by != this.user_id && this.opcion == true && this.es_miembro[0] == null
    },
    Cancel(){
      return this.cancel == true
    },
    MiembroOrganizacion(){
      return this.es_miembro[0] != null
    }
  },
  created(){
    var currentUrl = window.location.pathname;
    this.orgid = currentUrl.split("/");
    this.getOrganizacion();
    this.verificaMiembro();
    this.getProfile();
    this.getSocios();
  }
}
</script>