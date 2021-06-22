<template>
    <div>
        <Breadcrumbs main="Inicio" title="Inicio"/>
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-6 col-lg-12 col-md-6">
                    <h2 align="center">ANUNCIOS DE MIS ORGANIZACIONES</h2>
                    <div class="col-sm-12" v-if="totalao.length == 0" >
                        <b-card >
                            <h1 align="center">Todo tranquilo por el momento</h1>
                        </b-card>
                    </div>
                    <div class="col-sm-12" v-else v-for="a in totalao">
                        <b-card header-tag="div" header-class="b-t-info">
                            <h5 slot="header">{{a.anuncio}}</h5>
                            <b-card-text><p align="right">{{a.nombre_org}}</p><p align="right"> {{a.nombre}} | {{a.created_at}}</p></b-card-text>
                        </b-card>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-12 col-md-6">
                    <h2 align="center">ANUNCIOS DE MIS GRUPOS</h2>                    
                    <div class="col-sm-12" v-if="totalag.length == 0" >
                        <b-card >
                            <h1 align="center">Todo tranquilo por el momento</h1>
                        </b-card>
                    </div>
                    <div class="col-sm-12" v-else v-for="a in totalag">
                        <b-card header-tag="div" header-class="b-t-info">
                            <h5 slot="header">{{a.anuncio}}</h5>
                            <b-card-text class="mb-0"><p align="right">{{a.nombre_grupo}}</p><p align="right">{{a.nombre}} | {{a.created_at}}</p></b-card-text>
                        </b-card>
                    </div>

                </div>
            </div>
        </div>
</div>
</template>
<script>
import axios from 'axios';
export default {        
    data() {
        return {
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
            organizacion: [],
            grupos: [],
            orgids: [],
            grupoids: [],
            ao: null,
            ag: null,
            totalao: [],
            totalag: [],
        }
    },
    methods:{
        getOrganizacion(){
            axios.get('http://127.0.0.1:8000/api/organizaciones/?activa=1&created_by=&nombre=&pais=&miembros=' + this.user_id)
            .then((resp) => {
                this.organizacion = resp.data;
                this.getOrgId();
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getGrupos(){
            axios.get('http://127.0.0.1:8000/api/grupos/?created_by=&nombre=&miembros=' + this.user_id)
            .then((resp) => {
			    this.grupos = resp.data;
                this.getGrupoId();
            })
            .catch((error) => {
                console.log(error)
            })
		},        
        getOrgId(){
            for (const i in this.organizacion){
                this.orgids.push(this.organizacion[i].id)
            }
            console.log(this.orgids)
            this.anunciosOrganizacion();
        },
        getGrupoId(){
            for (const x in this.grupos){
                this.grupoids.push(this.grupos[x].id)
            }
            this.anunciosGrupo();
        },
        anunciosOrganizacion(){
            this.orgids.forEach(element => {
                console.log(element)
                axios.get('http://127.0.0.1:8000/api/anuncios_org/?id=&org=' + element + '&creador=')
                .then((resp) => {
                    if (resp.data.length != 0){
                        this.ao = resp.data;
                        this.ao.forEach(element2 =>{
                            this.totalao.push(element2)
                        })
                    }
                    console.log(this.totalao.length)
                })
                .catch((resp) =>{
                    console.log(resp)
                })
            })
        },
        anunciosGrupo(){
            this.grupoids.forEach(element =>{
                axios.get('http://127.0.0.1:8000/api/anuncios_grupo/?id=&grupo='+ element +'&creador=')
                .then((resp) => {
                    if (resp.data.length != 0){
                        this.ag = resp.data;
                        this.ag.forEach(element2 =>{
                            this.totalag.push(element2)
                        })
                    }
                })
                .catch((resp) =>{
                    console.log(resp)
                })
            })
        }
    },
    computed:{

    },
    created(){
        this.getGrupos();
        this.getOrganizacion();
    },
}
</script>

