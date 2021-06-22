import Vue from "vue";
import Vuex from "vuex";
import 'es6-promise/auto'
import layout from './modules/layout'
import menu from './modules/menu'
import chat from './modules/chat'
import products from './modules/products'
import email from './modules/email'
import todo from './modules/todo'
import firebase_todo from './modules/firebase_todo'
import jobs from './modules/jobs'
import courses from './modules/courses'
import axios from 'axios'
import VueAxios from 'vue-axios';
import jwt_decode from 'jwt-decode';

Vue.use(Vuex);
//const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
  state:{
    user: {},
    jwt: localStorage.getItem('user'),
    endpoints: {
      obtainJWT: 'http://127.0.0.1:8000/api/token/',
      refreshJWT: 'http://127.0.0.1:8000/api/token/refresh'
    }
  },
  mutations:{
    updateToken(state, newToken){
      localStorage.setItem('t',newToken);
      state.jwt = newToken;
    },
    removeToken(state){
      localStorage.removeItem('t');
      state.jwt = null;
    }
  },
  actions: {
    obtainToken(username, password){
      const payload = {
        username: username,
        password: password
      }
      axios.post(this.state.endpoints.obtainJWT, payload)
        .then((response)=>{
          this.commit('updateToken',response.data.token)
        })
        .catch((error)=>{
          console.log(error);
        })
    },
    refreshToken(){
      const payload ={
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT,payload)
        .then((response) =>{
          this.commit('updateToken',response.data.token)
        })
        .catch((error)=>{
          console.log(error)
        })
    },
    inspectToken(){
      const token = this.state.jwt;
      if(token){
        const decoded = jwt_decode(token);
        const exp = decoded.exp
        const orig_iat = decoded.orig_iat

        if(exp - (Date.now()/1000) < 1800 && (Date.now()/1000) - orig_iat < 628200){
          this.dispatch('refreshToken')
        } else if (exp -(Date.now()/1000) < 1800){
          // DO NOTHING, DO NOT REFRESH          
        } else {
          // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
        }
      } 
      }
  },
    modules: {
        layout,
        chat,
        menu,
        products,
        email,
        todo,
        firebase_todo,
        jobs,
        courses
    },
    strict: false,
});

