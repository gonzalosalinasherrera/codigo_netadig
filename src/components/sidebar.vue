<template>
  <div>
    <div class="main-header-left d-none d-lg-block">
      <div class="logo-wrapper">
        <router-link to="/">
          <img src="../assets/images/netadig_white.png" alt />
        </router-link>
      </div>
    </div>
    <div class="sidebar custom-scrollbar">
      <div class="sidebar-user text-center">
        <div>
          <div class="avatar">
            <router-link :to="{name: 'MyProfile'}"><img class="img-100 rounded-circle mr-3"  v-bind:src="user.avatar" style="width: 100px; height: 100px;" alt=""></router-link> 
          </div>
          <div class="profile-edit">
            <router-link to="/usuarios/editar_perfil">
              <feather type="edit"></feather>
            </router-link>
          </div>
        </div>
        <h6 class="mt-3 f-14">{{user.usuario.first_name}} {{user.usuario.last_name}}</h6>
        <p>{{user.ocupacion}}</p>
      </div>
      <ul
        class="sidebar-menu"
        id="myDIV"
        :style="[layout.settings.sidebar.type == 'horizontal_sidebar' ? layout.settings.layout_type=='rtl'? {'margin-right': margin+'px'} : {'margin-left': margin+'px'} :  { margin : '0px'}]"
      >
        <li
          class="left-arrow"
          :class="{'d-none': layout.settings.layout_type=='rtl'? hideLeftArrowRTL: hideLeftArrow}"
          @click="(layout.settings.sidebar.type === 'horizontal_sidebar' && layout.settings.layout_type==='rtl') ? scrollToLeftRTL() : scrollToLeft()"
        >
          <em class="fa fa-angle-left"></em>
        </li>
        <li
          v-for="(menuItem, index) in menuItems"
          :key="index"
          :class="{'active': menuItem.active}"
        >
          <!-- Sub -->
          <a
            href="javascript:void(0)"
            class="sidebar-header"
            v-if="menuItem.type == 'sub'"
            @click="setNavActive(menuItem, index)"
          >
            <feather :type="menuItem.icon" class="top"></feather>
            <span>
              {{menuItem.title}}
              <span
                :class="'badge badge-pill badge-'+menuItem.badgeType"
                v-if="menuItem.badgeType"
              >{{menuItem.badgeValue}}</span>
            </span>
            <em class="fa fa-angle-right pull-right" v-if="menuItem.children"></em>
          </a>
          <!-- Link -->
          <router-link
            :to="menuItem.path"
            class="sidebar-header"
            v-if="menuItem.type == 'link'"
            router-link-exact-active
          >
            <feather :type="menuItem.icon" class="top"></feather>
            <span>
              {{menuItem.title}}
              <span
                :class="'badge badge-'+menuItem.badgeType+' ml-3'"
                v-if="menuItem.badgeType"
              >{{menuItem.badgeValue}}</span>
            </span>
            <em class="fa fa-angle-right pull-right" v-if="menuItem.children"></em>
          </router-link>
          <!-- External Link -->
          <a
            :href="menuItem.path"
            class="sidebar-header"
            v-if="menuItem.type == 'extLink'"
            @click="setNavActive(menuItem, index)"
          >
            <feather :type="menuItem.icon" class="top"></feather>
            <span>
              {{menuItem.title}}
              <span
                :class="'badge badge-'+menuItem.badgeType+' ml-3'"
                v-if="menuItem.badgeType"
              >{{menuItem.badgeValue}}</span>
            </span>
            <em class="fa fa-angle-right pull-right" v-if="menuItem.children"></em>
          </a>
          <!-- External Tab Link -->
          <a
            :href="menuItem.path"
            target="_blank"
            class="sidebar-header"
            v-if="menuItem.type == 'extTabLink'"
            @click="setNavActive(menuItem, index)"
          >
            <feather :type="menuItem.icon" class="top"></feather>
            <span>
              {{menuItem.title}}
              <span
                :class="'badge badge-'+menuItem.badgeType+' ml-3'"
                v-if="menuItem.badgeType"
              >{{menuItem.badgeValue}}</span>
            </span>
            <em class="fa fa-angle-right pull-right" v-if="menuItem.children"></em>
          </a>
          <!-- 2nd Level Menu -->
          <ul class="sidebar-submenu" v-if="menuItem.children">
            <li
              v-for="(childrenItem, index) in menuItem.children"
              :key="index"
              :class="{'active': childrenItem.active}"
            >
              <!-- Sub -->
              <a
                href="javascript:void(0)"
                v-if="childrenItem.type == 'sub'"
                @click="setNavActive(childrenItem, index)"
              >
                <em class="fa fa-circle"></em>
                {{childrenItem.title}}
                <span
                  :class="'badge badge-'+childrenItem.badgeType+' pull-right'"
                  v-if="childrenItem.badgeType"
                >{{childrenItem.badgeValue}}</span>
                <em class="fa fa-angle-right pull-right" v-if="childrenItem.children"></em>
              </a>
              <!-- Link -->
              <router-link
                :to="childrenItem.path"
                v-if="childrenItem.type == 'link'"
                router-link-exact-active
              >
                <em class="fa fa-circle"></em>
                {{childrenItem.title}}
                <span
                  :class="'badge badge-'+childrenItem.badgeType+' pull-right'"
                  v-if="childrenItem.badgeType"
                >{{childrenItem.badgeValue}}</span>
                <em class="fa fa-angle-right pull-right" v-if="childrenItem.children"></em>
              </router-link>
              <!-- External Link -->
              <a :href="childrenItem.path" v-if="childrenItem.type == 'extLink'">
                <em class="fa fa-circle"></em>
                {{childrenItem.title}}
                <span
                  :class="'badge badge-'+childrenItem.badgeType+' pull-right'"
                  v-if="childrenItem.badgeType"
                >{{childrenItem.badgeValue}}</span>
                <em class="fa fa-angle-right pull-right" v-if="childrenItem.children"></em>
              </a>
              <!-- External Tab Link -->
              <a :href="childrenItem.path" target="_blank" v-if="childrenItem.type == 'extTabLink'">
                <em class="fa fa-circle"></em>
                {{childrenItem.title}}
                <span
                  :class="'badge badge-'+childrenItem.badgeType+' pull-right'"
                  v-if="childrenItem.badgeType"
                >{{childrenItem.badgeValue}}</span>
                <em class="fa fa-angle-right pull-right" v-if="childrenItem.children"></em>
              </a>
              <!-- 3rd Level Menu -->
              <ul class="sidebar-submenu horizontal-child-sub" v-if="childrenItem.children">
                <li v-for="(childrenSubItem, index) in childrenItem.children" :key="index">
                  <!-- Link -->
                  <router-link
                    :to="childrenSubItem.path"
                    v-if="childrenSubItem.type == 'link'"
                    router-link-exact-active
                  >
                    <em class="fa fa-circle"></em>
                    {{childrenSubItem.title}}
                    <span
                      :class="'badge badge-'+childrenSubItem.badgeType+' pull-right'"
                      v-if="childrenSubItem.badgeType"
                    >{{childrenSubItem.badgeValue}}</span>
                    <em class="fa fa-angle-right pull-right" v-if="childrenSubItem.children"></em>
                  </router-link>
                  <!-- External Link -->
                  <a :href="childrenSubItem.path" v-if="childrenSubItem.type == 'extLink'">
                    <em class="fa fa-circle"></em>
                    {{childrenSubItem.title}}
                    <span
                      :class="'badge badge-'+childrenSubItem.badgeType+' pull-right'"
                      v-if="childrenSubItem.badgeType"
                    >{{childrenSubItem.badgeValue}}</span>
                    <em class="fa fa-angle-right pull-right" v-if="childrenSubItem.children"></em>
                  </a>
                  <!-- External Tab Link -->
                  <a
                    :href="childrenSubItem.path"
                    target="_blank"
                    v-if="childrenSubItem.type == 'extTabLink'"
                  >
                    <em class="fa fa-circle"></em>
                    {{childrenSubItem.title}}
                    <span
                      :class="'badge badge-'+childrenSubItem.badgeType+' pull-right'"
                      v-if="childrenSubItem.badgeType"
                    >{{childrenSubItem.badgeValue}}</span>
                    <em class="fa fa-angle-right pull-right" v-if="childrenSubItem.children"></em>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          class="right-arrow"
          :class="{'d-none': layout.settings.layout_type=='rtl'? hideRightArrowRTL : hideRightArrow }"
          @click="(layout.settings.sidebar.type == 'horizontal_sidebar' && layout.settings.layout_type=='rtl') ? scrollToRightRTL() : scrollToRight()"
        >
          <em class="fa fa-angle-right"></em>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from 'axios';
export default {
  name: "Sidebar",
  data() {
    return {
      width: 0,
      height: 0,
      margin: 0,
      hideRightArrowRTL: true,
      hideLeftArrowRTL: true,
      hideRightArrow: true,
      hideLeftArrow: true,
      menuWidth: 0,
      user_id: localStorage.getItem('user-id') || null,
      token: localStorage.getItem('user-token') || null,
      user: [],
    };
  },
  computed: {
    ...mapState({
      menuItems: state => state.menu.data,
      layout: state => state.layout.layout,
      sidebar: state => state.layout.sidebarType
    })
  },
  created() {
    this.getUser();
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    if (this.width < 991) {
      this.layout.settings.sidebar.type = "default";
    }
    const val  = this.sidebar
      if (val == 'default') {			
				this.layout.settings.sidebar.type = 'default';
				this.layout.settings.sidebar.body_type = 'default';
			} else if (val == 'compact') {
				this.layout.settings.sidebar.type = 'compact-wrapper';
				this.layout.settings.sidebar.body_type = 'sidebar-icon';
			} else if (val == 'compact-icon') {
				this.layout.settings.sidebar.type = 'compact-page';
				this.layout.settings.sidebar.body_type = 'sidebar-hover';
			} else if (val == 'horizontal')  {
				this.layout.settings.sidebar.type = 'horizontal_sidebar';
        this.layout.settings.sidebar.body_type = '';
      }  
      setTimeout(()=> {
        const elmnt = document.getElementById("myDIV");
        this.menuWidth = elmnt.offsetWidth;   
        this.menuWidth > window.innerWidth  ? (this.hideRightArrow = false,this.hideLeftArrowRTL = false) : (this.hideRightArrow = true,this.hideLeftArrowRTL = true)
      }, 500)
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {   
    this.menuItems.filter(items => {
      if (items.path === this.$route.path)
        this.$store.dispatch("menu/setActiveRoute", items);
      if (!items.children) return false;
      items.children.filter(subItems => {
        if (subItems.path === this.$route.path)
          this.$store.dispatch("menu/setActiveRoute", subItems);
        if (!subItems.children) return false;
        subItems.children.filter(subSubItems => {
          if (subSubItems.path === this.$route.path)
            this.$store.dispatch("menu/setActiveRoute", subSubItems);
        });
      });
    });
  },
  methods: {
    getUser(){
      axios.get('http://127.0.0.1:8000/api/profile/'+ this.user_id)
      .then((resp) => {
				this.user = resp.data;
      })
      .catch((error) => {
        console.log(error)
      })
    },
    setNavActive(item) {
      this.$store.dispatch("menu/setNavActive", item);
    },
    handleResize() {
      this.width = window.innerWidth - 310;
    },
    scrollToRightRTL() {
      this.temp = this.width + this.margin;
      // Checking condition for remaing margin
      if (this.temp === 0) {
        this.margin = this.temp;
        this.hideRightArrowRTL = true;
      }
      // else
      else {
        this.margin += this.width;
        this.hideRightArrowRTL = false;
        this.hideLeftArrowRTL = false;
      }
    },
    scrollToLeftRTL() {
      // If Margin is reach between screen resolution
      console.log("this.margin", this.margin);
      if (this.margin <= -this.width) {
        this.margin += -this.width;
        this.hideLeftArrowRTL = true;
      }
      //Else
      else {
        this.margin += -this.width;
        this.hideRightArrowRTL = false;
      }
    },
    scrollToLeft() {
      console.log('left');
      
      // If Margin is reach between screen resolution
      if (this.margin >= -this.width) {
        this.margin = 0;
        this.hideLeftArrow = true;
      }
      //Else
      else {
        this.margin += this.width;
        this.hideRightArrow = false;
      }
    },
    scrollToRight() {
      this.temp = this.menuWidth + this.margin;
      // Checking condition for remaing margin
      if (this.temp < this.menuWidth) {
        this.margin = -this.temp;
        this.hideRightArrow = true;
      }
      // else
      else {
        this.margin += -this.width;
        this.hideLeftArrow = false;
      }
    }
  }
};
</script>
