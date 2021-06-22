<template>
    <div>
    <Breadcrumbs main="Usuario" title="Mi Perfil"/>
    <!-- Container-fluid starts-->
    <div class="container-fluid">
        <div class="user-profile">
          <div class="row">
            <!-- user profile first-style start-->
            <div class="col-sm-12">
              <div class="card hovercard text-center">
                <div class="cardheader"><img class="img-fluid rounded" alt="" v-bind:src="profile.imgprofile" style="width: 1590px; height: 470px;"></div>
                <div class="user-image">
                  <div class="avatar"><img alt="" v-bind:src="profile.avatar"></div>
                  
                </div>
                <div class="info">
                  <div class="row">
                    <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="ttl-info text-left">
                            <h5 style="text-color: black;"><i class="fa fa-envelope mr-2"></i>Email</h5><span>{{ user.email }}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="ttl-info text-left">
                            <h5 style="text-color: black;"><i class="fa fa-calendar mr-2"></i>BOD</h5><span>{{ profile.bod }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
                      <div class="user-designation">
                        <div class="title"><a target="_blank" href="">{{user.first_name}} {{user.last_name}}</a></div>
                        <div class="desc mt-2">{{profile.ocupacion}}</div>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
                      <div class="row">
                        <div class="col-md-6">
                          <div class="ttl-info text-left">
                            <h5><i class="fa fa-phone mr-2"></i>Telefono</h5><span>{{profile.telefono}}</span>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="ttl-info text-left">
                            <h5><i class="fa fa-location-arrow mr-2"></i>Dirección</h5><span>{{profile.direccion}}, {{profile.ciudad}}, {{profile.pais}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <div class="social-media">
                    <ul class="list-inline">
                    <li class="list-inline-item"><a v-bind:href="profile.fb"><i class="fa fa-facebook"></i></a></li>
                    <li class="list-inline-item"><a v-bind:href="profile.gm"> <i class="fa fa-google-plus"></i></a></li> 
                    <li class="list-inline-item"><a v-bind:href="profile.tw"><i class="fa fa-twitter"></i></a></li>
                    <li class="list-inline-item"><a v-bind:href="profile.ig"><i class="fa fa-instagram"></i></a></li>
                    </ul>
                  </div>
                  <div class="follow">
                    <div class="row">
                       <div class="col-6 text-md-right border-right">
                        <div class="follow-num counter">{{co}}</div><span>Orgs</span>
                      </div>
                      <div class="col-6 text-md-left">
                        <div class="follow-num counter">{{cg}}</div><span>Grupos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- user profile first-style end-->
          </div>
        </div>
      </div>
      <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import axios from 'axios';
export default {
  components: {
  },
  data(){
    return {
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      user: [],
      profile: [],
      orgs: [],
      groups: [],
      co: null,
      cg: null,
    }
  },
  methods:{
    getUser(){
      axios.get('http://127.0.0.1:8000/api/users/'+ this.user_id)
      .then((resp) => {
				this.user = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getProfile(){
      axios.get('http://127.0.0.1:8000/api/profile/'+ this.user_id)
        .then((resp) => {
				  this.profile = resp.data;
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getOrganizaciones(){
      console.log('0')
      axios.get('http://127.0.0.1:8000/api/organizaciones/?id=&activa=&created_by=&nombre=&pais=&miembros=' + this.user_id)
      .then((resp) => {
        this.orgs = resp.data;
        this.co = this.orgs.length
      })
      .catch(resp => console.log('mal'))
    },
    getGrupos(){
      axios.get('http://127.0.0.1:8000/api/grupos/?id=&created_by=&nombre=&miembros=' + this.user_id)
      .then((resp) => {
        this.groups = resp.data;
        this.cg = this.groups.length
      })
    },
  },
  created(){
    this.getUser();
    this.getProfile();
    this.getOrganizaciones();
    this.getGrupos();
  },
}
</script>