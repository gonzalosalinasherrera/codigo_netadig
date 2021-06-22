import Vue from 'vue'
import Router from "vue-router";
import firebase, { auth } from 'firebase';
import Userauth from '../auth/js/index'

import Body from '../components/body'
import Auth from '../auth/auth'

/* Auth */
import login from '../auth/login'
import callback from '../pages/callback'
import Register from '../auth/register'

/* FAQ */
import Faq from '../pages/faq'

/* Support Ticket */
import Support from '../pages/support'

/* maintenance */
import Maintenance from '../pages/maintenance'

/* Error Pages */
import Error400 from '../errors/error_400'
import Error401 from '../errors/error_401'
import Error403 from '../errors/error_403'
import Error404 from '../errors/error_404'
import Error500 from '../errors/error_500'
import Error503 from '../errors/error_503'
/* Dashboards */
import Default from '../pages/dashboard/default'
import Ecommerce from '../pages/dashboard/ecommerce'
import University from '../pages/dashboard/university'
import Bitcoin from '../pages/dashboard/bitcoin'
import Project from '../pages/dashboard/project'
import Server from '../pages/dashboard/server'

/* Widgets */
import GeneralWidgets from '../pages/widgets/general_widgets'
import ChartWidgets from '../pages/widgets/chart_widgets'
/* charts */
import GoogleChart from '../pages/charts/google_chart'
import Chartjs from '../pages/charts/chartjs'
import Chartist from '../pages/charts/chartist'
/* Form Widgets */
import FormDatepicker from '../pages/form_widgets/datepicker'
import FormSelect2 from '../pages/form_widgets/select2'
import FormSwitch from '../pages/form_widgets/switch'
import FormTypeahead from '../pages/form_widgets/typeahead'
import FormClipboard from '../pages/form_widgets/clipboard'
import FormTouchspin from '../pages/form_widgets/touchspin'
/* Chat */
import Chat from '../pages/chat/chat'
/* Email  */
import Email from '../pages/email/app'
/* pricing */
import Pricing from '../pages/pricing/pricing'
/* sample page */
import SamplePage from '../pages/sample_page'
import Todo from '../pages/todo/todo'
import FirebaseTodo from '../pages/todo/firebase_todo'
/* bootstrap tables */
import BootstrapBasic from '../pages/tables/bootstrap/basic'
import BootstrapSizing from '../pages/tables/bootstrap/sizing'
import BootstrapBorder from '../pages/tables/bootstrap/border'
import BootstrapStyling from '../pages/tables/bootstrap/styling'
/* datatable tables */
import DatatableBasic from '../pages/tables/datatable/basic_init'
import DatatableSelectDelete from '../pages/tables/datatable/select_delete'
import FilterTable from '../pages/tables/datatable/filter'
import DatatableExport from '../pages/tables/datatable/data_export'
/* calendar */
import Calendar from '../pages/calendar/fullcalendar'
/* vuejs smart table */
import SmartTable from '../pages/tables/vuejs_smart_table/basic'
/* User Profile */
import UserProfile from '../pages/users/profile'
import UserEditProfile from '../pages/users/edit-profile'
import UserCards from '../pages/users/cards'

/* Maps */
import GoogleMaps from '../pages/maps/vue_google_maps'
import VueLeaflet from '../pages/maps/vue_leaflet'

/* Search */
import Search from '../pages/search'

/* Social App */
import Social from '../pages/social_app'
/* Learning */
import Learninglist from '../pages/learning/learninglist';
import Coursedetailed from '../pages/learning/coursedetailed';
// component

/* NETADIG */
//usuarios en netadig
import Profile from '../pages/usuarios/profile.vue';
import EditProfile from '../pages/usuarios/edit_profile.vue';
import UsersCard from '../pages/usuarios/users.vue';
import MyProfile from '../pages/usuarios/my_profile.vue';

//organizaciones en netadig
import MisOrganizaciones from '../pages/organizaciones/mis_organizaciones.vue';
import OrgCards from '../pages/organizaciones/organizaciones.vue';
import OrgProfile from '../pages/organizaciones/profile.vue';
import OrgCreate from '../pages/organizaciones/crear_organizacion.vue';
import OrgMembers from '../pages/organizaciones/miembros.vue';
import EditOrganizacion from '../pages/organizaciones/editar_organizacion.vue';
import ActiveOrganizacion from '../pages/organizaciones/inactive_organizacion.vue';
import GroupOrganizacion from '../pages/organizaciones/grupos_en_organizacion.vue';
import CreateGroupOrganizacion from '../pages/organizaciones/crear_grupo_org.vue';
import SolOrganizacion from '../pages/organizaciones/solicitudes_organizacion.vue';
import SociosOrganizacion from '../pages/organizaciones/socios.vue';
import GrupoProfileOrganizacion from '../pages/organizaciones/grupo_perfil.vue';
import GrupoMiembrosOrganizacion from '../pages/organizaciones/grupo_miembros.vue';
import GrupoSolicitudOrganizacion from '../pages/organizaciones/grupo_solicitudes_org.vue';
import GrupoEditarOrganizacion from '../pages/organizaciones/grupo_editar_org.vue';
import AnunciosOrganizacion from '../pages/organizaciones/anuncios_org.vue';
import AnunciosGrupoOrganizacion from '../pages/organizaciones/anuncios_grupo_org.vue';

//login y register en netadig
import Registro from '../login/register.vue';
import Ingreso from '../login/login.vue';

//grupos en netadig
import MisGrupos from '../pages/grupos/mis_grupos.vue';
import GroupCards from '../pages/grupos/grupos.vue';
import GroupProfile from '../pages/grupos/profile.vue';
import GroupCreate from '../pages/grupos/crear_grupo.vue';
import GroupMembers from '../pages/grupos/miembros.vue';
import SolGrupo from '../pages/grupos/solicitudes_grupo.vue';
import EditGrupo from '../pages/grupos/editar_grupo.vue';
import AnunciosGrupo from '../pages/grupos/anuncios_grupo.vue';

Vue.use(Router)

const routes = [
{ path: '', redirect: { name: 'default' }},
{
  path:'/inicio',
  component: Auth,
  children:[
    {
      path: 'registro',
      name: 'Registro',
      component: Registro,
       meta: {
        title: 'Registro | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'ingreso',
      name: 'Ingreso',
      component: Ingreso,
        meta: {
          title: 'Iniciar Sesion | NETADIG - Social NetWork',
          reload: true,
      }
    },
  ]
},
{
  path:'/organizaciones',
  component: Body,
  children:[
    {
      path: 'mis_organizaciones',
      name: 'MisOrganizaciones',
      component: MisOrganizaciones,
       meta: {
        title: 'Mis Organizaciones | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'organizaciones',
      name: 'OrgCards',
      component: OrgCards,
        meta: {
          title: 'Organizaciones | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'perfil/:id',
      name: 'OrgProfile',
      component: OrgProfile,
       meta: {
        title: 'Organizacion Perfil | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'crear_organizacion',
      name: 'OrgCreate',
      component: OrgCreate,
       meta: {
        title: 'Nueva Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'miembros/:id',
      name: 'OrgMembers',
      component: OrgMembers,
       meta: {
        title: 'Miembros de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'editar_organizacion/:id',
      name: 'EditOrganizacion',
      component: EditOrganizacion,
       meta: {
        title: 'Editar Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'activar_organizacion',
      name: 'ActiveOrganizacion',
      component: ActiveOrganizacion,
       meta: {
        title: 'Editar Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'grupos_organizacion/:id',
      name: 'GroupOrganizacion',
      component: GroupOrganizacion,
       meta: {
        title: 'Grupos de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'crear_grupo/:id',
      name: 'CreateGroupOrganizacion',
      component: CreateGroupOrganizacion,
       meta: {
        title: 'Crear Grupo de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'solicitudes/:id',
      name: 'SolOrganizacion',
      component: SolOrganizacion,
       meta: {
        title: 'Solicitudes de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'socios/:id',
      name: 'SociosOrganizacion',
      component: SociosOrganizacion,
       meta: {
        title: 'Socios de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'perfil_grupo/:id',
      name: 'GrupoProfileOrganizacion',
      component: GrupoProfileOrganizacion,
       meta: {
        title: 'Grupo de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'miembros_grupo_org/:id',
      name: 'GrupoMiembrosOrganizacion',
      component: GrupoMiembrosOrganizacion,
       meta: {
        title: 'Miembros Grupo de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'solicitud_grupo_org/:id',
      name: 'GrupoSolicitudOrganizacion',
      component: GrupoSolicitudOrganizacion,
       meta: {
        title: 'Solicitudes Grupo de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'editar_grupo_org/:id',
      name: 'GrupoEditarOrganizacion',
      component: GrupoEditarOrganizacion,
       meta: {
        title: 'Editar Grupo de la Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'anuncios/:id',
      name: 'AnunciosOrganizacion',
      component: AnunciosOrganizacion,
       meta: {
        title: 'Anuncios Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'anuncios_grupo_org/:id',
      name: 'AnunciosGrupoOrganizacion',
      component: AnunciosGrupoOrganizacion,
       meta: {
        title: 'Anuncios Grupo Organizacion | NETADIG - Social NetWork',
        reload: true,
      }
    },
  ]
},
{
  path:'/grupos',
  component: Body,
  children:[
    {
      path: 'grupos',
      name: 'GroupCards',
      component: GroupCards,
        meta: {
          title: 'Grupos | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'crear_grupo',
      name: 'GroupCreate',
      component: GroupCreate,
        meta: {
          title: 'Crear Grupo | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'mis_grupos',
      name: 'MisGrupos',
      component: MisGrupos,
        meta: {
          title: 'Crear Grupo | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'perfil/:id',
      name: 'GroupProfile',
      component: GroupProfile,
       meta: {
        title: 'Nuevo Grupo | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'miembros/:id',
      name: 'GroupMembers',
      component: GroupMembers,
       meta: {
        title: 'Miembros del Grupo | NETADIG - Social NetWork',
        reload: true,
      }
    },
    {
      path: 'solicitudes/:id',
      name: 'SolGrupo',
      component: SolGrupo,
        meta: {
          title: 'Solicitud de Grupos | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'editar_grupo/:id',
      name: 'EditGrupo',
      component: EditGrupo,
        meta: {
          title: 'Editar Grupo | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'anuncios_grupo/:id',
      name: 'AnunciosGrupo',
      component: AnunciosGrupo,
        meta: {
          title: 'Anuncios Grupo | NETADIG - Social NetWork',
          reload: true,
      }
    },     
  ]
},
{
  path:'/usuarios/',
  component: Body,
  children:[
    {
      path: 'perfil/:id',
      name: 'Profile',
      component: Profile,
        meta: {
          title: 'Perfil | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'mi_perfil/',
      name: 'MyProfile',
      component: MyProfile,
        meta: {
          title: 'Mi Perfil | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'editar_perfil',
      name: 'EditProfile',
      component: EditProfile,
        meta: {
          title: 'Editar Perfil | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'usuarios',
      name: 'UsersCard',
      component: UsersCard,
        meta: {
          title: 'Usuarios | NETADIG - Social NetWork',
          reload: true,
      }
    },
    {
      path: 'userards',
      name: 'UserCards',
      component:UserCards,
        meta: {
          title: 'Usuarios | NETADIG - Social NetWork',
          reload: true,
      }
    }
  ]
},
{
  path: '/dashboard',
  component: Body,
  meta: {
    requiresAuth: true
  },
  children: [
  {
    path: 'default',
    name: 'default',
    component: Default,
    meta: {
      title: 'Inicio | NETADIG - Social NetWork',
    }
  },
  {
    path: 'ecommerce',
    name: 'ecommerce',
    component: Ecommerce,
    meta: {
      title: 'Ecommerce Dashboard | Endless - Premium Admin Template',
    }
  },
  {
    path: 'university',
    name: 'University',
    component: University,
    meta: {
      title: 'University Dashboard | Endless - Premium Admin Template',
    }
  },
  {
    path: 'bitcoin',
    name: 'Bitcoin',
    component: Bitcoin,
    meta: {
      title: 'Bitcoin Dashboard | Endless - Premium Admin Template',
    }
  },
  {
    path: 'project',
    name: 'Project',
    component: Project,
    meta: {
      title: 'Project Dashboard | Endless - Premium Admin Template',
    }
  },
  {
    path: 'server',
    name: 'Server',
    component: Server,
  },
  ]
},
{
  path: '/widgets',
  component: Body,
  children: [
  {
    path: 'general',
    name: 'general',
    component: GeneralWidgets,
    meta: {
      title: 'General Widgets | Endless - Premium Admin Template',
    }
  },
  {
    path: 'chart',
    name: 'chart',
    component: ChartWidgets,
    meta: {
      title: 'Chart Widgets | Endless - Premium Admin Template',
    }
  },
  ]
},
{
  path: '/chart',
  component: Body,
  children: [
  {
    path: 'google',
    name: 'Google Chart',
    component: GoogleChart,
    meta: {
      title: 'GoogleChart | Endless - Premium Admin Template',
    }
  },
  {
    path: 'chartjs',
    name: 'Chart Js',
    component: Chartjs,
    meta: {
      title: 'Home Page - Example App',
      metaTags: [
      {
        name: 'description',
        content: 'The home page of our example app.'
      },
      {
        property: 'og:description',
        content: 'The home page of our example app.'
      }
      ]
    }
  },
  {
    path: 'chartist',
    name: 'Chartist',
    component: Chartist,
    meta: {
      title: 'Chartist | Endless - Premium Admin Template',
    }
  },
  ]
},
{
  path:'/users',
  component: Body,
  children:[
    {
      path: 'profile',
      name: 'UserProfile',
      component:UserProfile,
       meta: {
        title: 'serProfile | Endless - Premium Admin Template',
      }
    },
    {
      path: 'edit',
      name: 'UserEditProfile',
      component:UserEditProfile,
       meta: {
        title: 'serEditProfile | Endless - Premium Admin Template',
      }
    },
    {
      path: 'cards',
      name: 'UserCards',
      component:UserCards,
       meta: {
        title: 'serCards | Endless - Premium Admin Template',
      }
    }
  ]
},
{
  path:'/maps',
  component: Body,
  children:[
    {
      path: 'vue-google-maps',
      name: 'GoogleMaps',
      component:GoogleMaps,
       meta: {
        title: 'oogleMaps | Endless - Premium Admin Template',
      }
    },
    {
      path: 'vue-leaflet-maps',
      name: 'VueLeaflet',
      component:VueLeaflet,
       meta: {
        title: 'ueLeaflet | Endless - Premium Admin Template',
      }
    }
  ]
},
{
  path: '/table',
  component: Body,
  children: [
  {
    path: 'basic',
    name: 'BootstrapBasic',
    component: BootstrapBasic,
     meta: {
        title: 'BootstrapBasic | Endless - Premium Admin Template',
      }
  },
  {
    path: 'sizing',
    name: 'BootstrapSizing',
    component: BootstrapSizing,
     meta: {
        title: 'BootstrapSizing | Endless - Premium Admin Template',
      }
  },
  {
    path: 'border',
    name: 'BootstrapBorder',
    component: BootstrapBorder,
     meta: {
        title: 'BootstrapBorder | Endless - Premium Admin Template',
      }
  },
  {
    path: 'styling',
    name: 'BootstrapStyling',
    component: BootstrapStyling,
     meta: {
        title: 'BootstrapStyling | Endless - Premium Admin Template',
      }
  },
  {
    path: '/datatable-basic',
    name: 'DatatableBasic',
    component: DatatableBasic,
     meta: {
        title: 'DatatableBasic | Endless - Premium Admin Template',
      }
  },
  {
    path: '/datatable-select-delete',
    name: 'DatatableSelectDelete',
    component: DatatableSelectDelete,
     meta: {
        title: 'DatatableSelectDelete | Endless - Premium Admin Template',
      }
  },
  {
    path: '/filter-table',
    name: 'FilterTable',
    component: FilterTable,
     meta: {
        title: 'FilterTable | Endless - Premium Admin Template',
      }
  },
  {
    path: '/datatable-export',
    name: 'DatatableExport',
    component: DatatableExport,
     meta: {
        title: 'DatatableExport | Endless - Premium Admin Template',
      }
  },
  {
    path: 'smarttable',
    name: 'SmartTable',
    component: SmartTable,
     meta: {
        title: 'SmartTable | Endless - Premium Admin Template',
      }
  },
  ]
},
{
  path: '/app',
  component: Body,
  children: [
  {
    path: 'todo',
    name: 'todo',
    component: Todo,
     meta: {
        title: 'Todo | Endless - Premium Admin Template',
      }
  },
  {
    path: 'firebase-todo',
    name: 'FirebaseTodo',
    component: FirebaseTodo,
     meta: {
        title: 'FirebaseTodo | Endless - Premium Admin Template',
      }
  },
  {
    path: 'chat',
    name: 'chat',
    component: Chat,
     meta: {
        title: 'Chat | Endless - Premium Admin Template',
      }
  },
  {
    path: 'email',
    name: 'Email',
    component: Email,
     meta: {
        title: 'Email, | Endless - Premium Admin Template',
      }
  },
  {
    path:'calendar',
    name:'Calendar',
    component:Calendar,
    meta: {
      title: 'Calendar | Endless - Premium Admin Template',
    }
  }
  ]
},
{
  path: '/auth',
  component: Auth,
  children: [
  {
    path: 'login',
    name: 'Login 1',
    component: login,
    meta: {
      title: ' login | Endless - Premium Admin Template',
    }
  },
  {
    path: 'register',
    name: 'register 1',
    component: Register,
    meta: {
      title: ' Register | Endless - Premium Admin Template',
    }
  }
  ]
},
{
  path: '/pages',
  component: Body,
  children:[
    {
      path:'/pages/sample-page',
      name:'SamplePage',
      component:SamplePage,
      meta: {
      title: 'SamplePage | Endless - Premium Admin Template',
    }
    },
    {
      path:'/pages/pricing',
      name:'Pricing',
      component:Pricing,
      meta: {
      title: 'Pricing | Endless - Premium Admin Template',
    }
    }
  ]
},
{
  path: '/callback',
  name: 'callback',
  component: callback,
  meta: {
      title: 'Auth0',
  }
},
{
  path: '/pages',
  component: Body,
  children:[
    {
      path:'/pages/faq',
      name:'Faq',
      component:Faq,
      meta: {
      title: 'Faq | Endless - Premium Admin Template',
    }
    },
    {
      path:'/pages/support',
      name:'Support',
      component:Support,
      meta: {
      title: 'Support | Endless - Premium Admin Template',
    }
    },
    {
      path:'/pages/social-app',
      name:'Social',
      component:Social,
      meta: {
      title: 'Social | Endless - Premium Admin Template',
    }
    }
  ]
},
{
  path:'/search',
  component:Body,
  children:[
    {
      path:'/pages/search',
      name:'Search',
      component:Search,
      meta: {
      title: 'Search | Endless - Premium Admin Template',
    }
    }
  ]
},
{
  path:'/learning',
  component:Body,
  children:[
    {
      path:'/learning/list',
      name:'Learninglist',
      component:Learninglist,
      meta: {
      title: 'Learninglist | Endless - Premium Admin Template',
    }
    },
    {
      path:'/learning/details/:id',
      name:'Coursedetailed',
      component:Coursedetailed,
      meta: {
      title: 'Coursedetailed, | Endless - Premium Admin Template',
      },
      props:true
    }
  ]
},

{
  path:'/error-400',
  name:'Error400',
  component:Error400,
  meta: {
      title: 'Error400 | Endless - Premium Admin Template',
    }
},
{
  path:'/error-401',
  name:'Error401',
  component:Error401,
  meta: {
      title: 'Error401 | Endless - Premium Admin Template',
    }
},
{
  path:'/error-403',
  name:'Error403',
  component:Error403,
  meta: {
      title: 'Error403 | Endless - Premium Admin Template',
    }
},
{
  path:'/error-404',
  name:'Error404',
  component:Error404,
  meta: {
      title: 'Error404 | Endless - Premium Admin Template',
    }
},
{
  path:'/error-500',
  name:'Error500',
  component:Error500,
  meta: {
      title: 'Error500 | Endless - Premium Admin Template',
    }
},
{
  path:'/error-503',
  name:'Error503',
  component:Error503,
  meta: {
      title: 'Error503 | Endless - Premium Admin Template',
    }
},
{
  path:'/maintenance',
  name:'Maintenance',
  component:Maintenance,
  meta: {
      title: 'Maintenance | Endless - Premium Admin Template',
    }
},
];

const router = new Router({
  routes,
  base: '/',
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
      const publicPages = ['/inicio/ingreso','/inicio/registro'];
      const authRequired = !publicPages.includes(to.path);
      const LoggedIn = localStorage.getItem('user-token'); 
      if(to.meta.title)
        document.title = to.meta.title;
       if (authRequired && !LoggedIn){
        return next('/inicio/ingreso' || 'inicio/registro');
      } 
        return next();
  });
  
  export default router
