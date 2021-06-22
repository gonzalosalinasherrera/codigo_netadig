<template>
    <div>
        <Breadcrumbs main="Grupos" title="Crear Grupo"/>
        <!-- Container-fluid starts-->
        <div class="card" v-if="tiene == false">
            <div class="card-header">
                <h5>Tu Nuevo Grupo</h5>
            </div>
            <form  id="formgrupo" @submit.prevent="checkForm" class="form theme-form">
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group row">
                            <label for="nombre" class="col-sm-3 col-form-label">Nombre del Grupo *</label>
                            <div class="col-sm-9">
                                <b-form-input type="text" id="nombre" v-model="nombre" placeholder="Nombre"></b-form-input>
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <label for="bio" class="col-sm-3 col-form-label">Descripcion *</label>
                            <div class="col-sm-9">
                                <b-form-textarea rows="6" type="text" id="bio" name="bio" v-model="bio" placeholder="Pequeña BIO"></b-form-textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="ciudad" class="col-sm-3 col-form-label">Ciudad *</label>
                    <div class="col-sm-9">
                        <b-form-input type="text" name="ciudad" id="ciudad" v-model="ciudad" placeholder="Santiago"></b-form-input>
                    </div>
                </div>
                    <div class="form-group row">
                    <label for="region" class="col-sm-3 col-form-label">Region/Estado *</label>
                    <div class="col-sm-9">
                        <b-form-input type="text" name="region" id="region" v-model="region" placeholder="Metropolitana"></b-form-input>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="pais" class="col-sm-3 col-form-label">País *</label>
                    <div class="col-sm-9">
                        <b-form-select v-model="pais" :options="PAISES"></b-form-select>
                    </div>
                </div>
<!--                 <div class="form-group row">
                    <div class="form-group row mb-0">
                        <div class="col-sm-5">
                            <label for="">Avatar</label>
                            <div class="form-group">
                                <input type="file" accept="image/*" @change="onChange"/>
                            </div>
                        </div>
                        <div class="col-sm-5">
                            <label for="">Banner</label>
                            <div class="form-group"> 
                                <input type="file" accept="image/*" @change="onChange2"/>
                            </div>
                        </div>
                    </div>
                </div>   -->  
            </div>             
            <div class="card-footer" >
                <div class="col-sm-9 offset-sm-3">
                    <b-button type="submit" variant="primary" class="mr-1">Crear</b-button>
                    <b-button @click="cancelar" type="reset" variant="light">Cancel</b-button>
                </div>
                <div>
                    <p>Registro nos permitirá conocerte y no tener que solicitarte los datos nuevamente cuando quieras comprar en PCFactory.cl. Los campos marcados (*) deben ser llenados obligatoriamente.</p>
                </div>
            </div>
            </form>
        </div>
        <div>
            <div class="card" v-if="creador == true">
                <div class="card-header">
                    <h2 align="center">YA CREASTE UN GRUPO, NO PUEDES SER DUEÑO DE OTRO.</h2>
                </div>
                <div class="card-body">
                    <h4 align="center"> Para crear otro Grupo, debes eliminar el que ya tienes</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            token: localStorage.getItem('user-token') || null,
            user_id: localStorage.getItem('user-id') || null,
            nombre: null,
            ig: null,
            fb: null,
            gm: null,
            tw: null,
            bio: null,
            created_by: null,
            avatar: null,
            banner: null,
            user: [],
            region: null,
            pais: null,
            ciudad:null,
            member: [],
            crear: [],
            tiene: true,
            PAISES:[
                    {value: 'AFGANISTÁN',text: 'AFGANISTÁN'},{value: 'ALBANIA',text: 'ALBANIA'},
                    {value: 'ALEMANIA',text: 'ALEMANIA'},{value: 'ANDORRA',text: 'ANDORRA'},
                    {value: 'ARABIA SAUDITA',text: 'ARABIA SAUDITA'},{value: 'ARGENTINA',text: 'ARGENTINA'},
                    {value: 'AUSTRALIA',text: 'AUSTRALIA'},{value: 'BÉLGICA',text: 'BÉLGICA'},
                    {value: 'BOLIVIA',text: 'BOLIVIA'},{value: 'BRASIL',text: 'BRASIL'},
                    {value: 'CAMERÚN',text: 'CAMERÚN'},{value: 'CANADÁ',text: 'CANADÁ'},
                    {value: 'CATAR',text: 'CATAR'},{value: 'CHILE',text: 'CHILE'},
                    {value: 'CHINA',text: 'CHINA'},{value: 'COLOMBIA',text: 'COLOMBIA'},
                    {value: 'COREA DEL SUR',text: 'COREA DEL SUR'},{value: 'COSTA DE MARFIL',text: 'COSTA DE MARFIL'},
                    {value: 'COSTA RICA',text: 'COSTA RICA'},{value: 'CROACIA',text: 'CROACIA'},
                    {value: 'CUBA',text: 'CUBA'},{value: 'DINAMARCA',text: 'DINAMARCA'},
                    {value: 'ECUADOR',text: 'ECUADOR'},{value: 'EGIPTO',text: 'EGIPTO'},
                    {value: 'ESLOVAQUIA',text: 'ESLOVAQUIA'},{value: 'ESLOVENIA',text: 'ESLOVENIA'},
                    {value: 'ESPAÑA',text: 'ESPAÑA'},{value: 'ESTADOS UNIDOS',text: 'ESTADOS UNIDOS'},
                    {value: 'FINLANDIA',text: 'FINLANDIA'},{value: 'FRANCIA',text: 'FRANCIA'},
                    {value: 'GHANA',text: 'GHANA'},{value: 'GRECIA',text: 'GRECIA'},
                    {value: 'GUATEMALA',text: 'GUATEMALA'},{value: 'GUYANA',text: 'GUYANA'},
                    {value: 'HAITÍ',text: 'HAITÍ'},{value: 'HUNGRIA',text: 'HUNGRIA'},
                    {value: 'INDIA',text: 'INDIA'},{value: 'INDONESIA',text: 'INDONESIA'},
                    {value: 'IRAK',text: 'IRAK'},{value: 'IRAN',text: 'IRAN'},
                    {value: 'IRLANDA',text: 'IRLANDA'},{value: 'ISLANDIA',text: 'ISLANDIA'},
                    {value: 'ISRAEL',text: 'ISRAEL'},{value: 'ITALIA',text: 'ITALIA'},
                    {value: 'JAMAICA',text: 'JAMAICA'},
                    {value: 'JAPÓN',text: 'JAPÓN'},{value: 'KAZAJISTÁN',text: 'KAZAJISTÁN'},
                    {value: 'KENIA',text: 'KENIA'},{value: 'LETONIA',text: 'LETONIA'},
                    {value: 'LÍBANO',text: 'LÍBANO'},{value: 'LIBERIA',text: 'LIBERIA'},
                    {value: 'LITUANIA',text: 'LITUANIA'},{value: 'MADAGASCAR',text: 'MADAGASCAR'},
                    {value: 'MALASIA',text: 'MALASIA'},{value: 'MALDIVAS',text: 'MALDIVAS'},
                    {value: 'MALTA',text: 'MALTA'},{value: 'MARRUECOS',text: 'MARRUECOS'},
                    {value: 'MEXICO',text: 'MEXICO'},{value: 'MÓNACO',text: 'MÓNACO'},
                    {value: 'MONGOLIA',text: 'MONGOLIA'},{value: 'MOZAMBIQUE',text: 'MOZAMBIQUE'},
                    {value: 'NEPAL',text: 'NEPAL'},{value: 'NICARAGUA',text: 'NICARAGUA'},
                    {value: 'NIGERIA',text: 'NIGERIA'},{value: 'NORUEGA',text: 'NORUEGA'},
                    {value: 'NUEVA ZELANDA',text: 'NUEVA ZELANDA'},{value: 'PAÍSES BAJOS',text: 'PAÍSES BAJOS'},
                    {value: 'PAKISTÁN',text: 'PAKISTÁN'},{value: 'PALESTINA',text: 'PALESTINA'},
                    {value: 'PANAMÁ',text: 'PANAMÁ'},{value: 'PARAGUAY',text: 'PARAGUAY'},{value: 'POLONIA',text: 'POLONIA'},
                    {value: 'PORTUGAL',text: 'PORTUGAL'},{value: 'REINO UNIDO',text: 'REINO UNIDO'},
                    {value: 'RUMANIA',text: 'RUMANIA'},{value: 'RUSIA',text: 'RUSIA'},
                    {value: 'SENEGAL',text: 'SENEGAL'},{value: 'SERBIA',text: 'SERBIA'},
                    {value: 'SINGAPUR',text: 'SINGAPUR'},{value: 'SIRIA',text: 'SIRIA'},
                    {value: 'SUDÁFRICA',text: 'SUDÁFRICA'},{value: 'SUECIA',text: 'SUECIA'},
                    {value: 'SUIZA',text: 'SUIZA'},{value: 'TAILANDIA',text: 'TAILANDIA'},
                    {value: 'TURQUÍA',text: 'TURQUÍA'},{value: 'UCRANIA',text: 'UCRANIA'},
                    {value: 'URUGUAY',text: 'URUGUAY'},{value: 'VENEZUELA',text: 'VENEZUELA'},
                    {value: 'ZIMBABUE',text: 'ZIMBABUE'},
                ],
        }
    },
    methods:{
        cancelar(){
            this.$router.push('/grupos/grupos')
        },
        onChange(event){
            this.avatar  = event.target.files[0]
        },
        onChange2(event2){
            this.banner  = event2.target.files[0]
        },
        checkForm(){
            this.member.push(this.user_id)
            axios.post('http://127.0.0.1:8000/api/grupos/',{
                nombre: this.nombre,
                bio: this.bio,
                fb: this.ciudad,
                ig: this.region,
                tw: this.pais,
                miembros: this.member,
                created_by: this.user_id,
            })
            .then(resp => {
                axios.post('http://127.0.0.1:8000/api/solicitud_grupo/',{
                    user_in_grupo: [],
                    x: 'se crearon las solicitudes',
                })
                this.$swal({
				    title:"Tu Grupo ha sido Creado!",
				    type:'success'
			    });
                console.log(resp)
                this.$router.push('/grupos/mis_grupos')
            })
            .catch(error => {
                this.$swal({
				    title:"No se pudo crear el Grupo!",
				    type:'error'
			    });
                console.log(error)
                })
        },
        getUser(){
            axios.get('http://127.0.0.1:8000/api/profile/'+ this.user_id)
            .then((resp) => {
                this.user = resp.data;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        haveGrupo(){
            axios.get('http://127.0.0.1:8000/api/grupos/?id=&created_by=' + this.user_id + '&nombre=')
            .then((resp) => {
                this.crear = resp.data;
                if (this.crear[0]){
                    this.tiene = true
                    console.log(this.crear,this.tiene)
                }else{
                    this.tiene = false
                }
            })
            .catch((error) => {
                console.log(error)
            }) 
        }
    },
    computed:{
        creador(){
            return this.tiene
        },
    },
    created(){
        this.getUser();
        this.haveGrupo();
        },
    }
</script>
