<template>
  <div>
    <!-- page-wrapper Start-->
    <div class="page-wrapper" id="canvas-bookmark">
      <!-- Page Header Start-->
      <div class="page-main-header" :class="{ open:toggle_sidebar_var }">
        <div class="main-header-right row">
          <div class="main-header-left d-lg-none">
            <div class="logo-wrapper"><router-link :to="{ name: 'default'}" ><img src="../assets/images/netadig_white.png" style="width: 300px; height: 65px;" alt=""></router-link></div>
          </div>
          <div class="mobile-sidebar">
            <div class="media-body text-right switch-sm">
              <label class="switch" v-on:click="toggle_sidebar"><feather type="align-left"></feather></label>
            </div>
          </div>
          <div class="nav-right col">
            <ul class="nav-menus" :class="{ open: mobile_toggle }">
          <li><a href="javascript:void(0)" class="text-dark" v-on:click="toggle_fullscreen()"><feather type="maximize"></feather></a></li>
          <h6><strong> {{profile.usuario.first_name}}</strong></h6>
          <li class="onhover-dropdown">
            <div class="media align-items-center"><img class="align-self-center pull-right rounded-circle" v-bind:src="profile.avatar" style="width: 65px; height: 65px;" alt="">
              <div class="dotted-animation"><span class="animate-circle"></span><span class="main-circle"></span></div>
            </div>
            <ul class="profile-dropdown onhover-show-div p-20">
              <li><a href="/usuarios/editar_perfil"><feather type="user"></feather> Editar Perfil</a></li>
              <li @click="logout" ><feather type="log-out"></feather>Cerrar Sesión</li>
            </ul>
          </li>
        </ul>
        <div class="d-lg-none mobile-toggle pull-right" v-on:click="mobile_toggle = !mobile_toggle"><feather type="more-horizontal"></feather></div>
      </div>
    </div>
  </div>
  <!-- Page Header Ends -->
</div>
</div>
</template>
<script>
var body = document.getElementsByTagName("body")[0];
import { mapState } from "vuex";
import axios from 'axios';
export default {
  name: 'Search',
  data() {
    return {
      terms: '',
      searchResult: false,
      searchResultEmpty: false,
      toggle_sidebar_var:false,
      clicked:false,
      toggle_rightsidebar_var:false,
      rightclicked:false,
      mobile_toggle:false,
      mobile_search: false,
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      profile: [],
    }
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.searchData
    })
  },
  methods: {
    getProfile(){
      axios.get('http://127.0.0.1:8000/api/profile/'+ this.user_id)
        .then((resp) => {
          this.profile = resp.data;
          console.log(this.profile)
      })
        .catch((error) => {
          console.log(error)
       })
    },    
    logout(){
      localStorage.removeItem('user-token');
      localStorage.removeItem('user-id');
      this.user_id = null;
      this.token = null;
      this.$router.push('/inicio/ingreso')
    },
    getImgUrl() {
    // console.log("localStorage.getItem('Userinfo').photoURL", localStorage.getItem('Userinfo'));
    
    return (localStorage.getItem('Userinfo')?localStorage.getItem('Userinfo').photoURL:require("../assets/images/dashboard/user.png"))
    },
    searchTerm: function() {
      this.$store.dispatch('menu/searchTerm', this.terms)
    },
    addFix() {
      body.classList.add("offcanvas")
      this.searchResult = true;
    },
    removeFix() {
      body.classList.remove("offcanvas")
      this.searchResult = false;
      this.terms = ''
    },
    toggle_sidebar(){
      this.toggle_sidebar_var = !this.toggle_sidebar_var,
      this.clicked = !this.toggle_sidebar_var,
      this.$emit('clicked',this.clicked)
    },
    toggle_rightsidebar(){
      this.toggle_rightsidebar_var = !this.toggle_rightsidebar_var,
      this.rightclicked = !this.toggle_rightsidebar_var,
      this.$emit('rightclicked',this.rightclicked)
    },
    toggle_fullscreen() {
      if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    }
  },
  watch: {
    menuItems: function () {    
      this.terms ? this.addFix() : this.removeFix();
      if(!this.menuItems.length)
        this.searchResultEmpty = true;
      else
        this.searchResultEmpty = false;
    }
  },
  created(){
    this.getProfile();
  }
}
</script>
