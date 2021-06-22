<template>
    <div>
        <Breadcrumbs main="Organizaciones" title="Crear Organizacion"/>
        <!-- Container-fluid starts-->
        <div class="card">
            <div class="card-header">
                <h5>Tu Nueva Organizacion</h5>
            </div>
            <form id="formorganizacion" class="form theme-form">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <div class="form-group row">
                                <label for="nombre" class="col-sm-3 col-form-label">Nombre de la Organizacion</label>
                                <div class="col-sm-9">
                                    <b-form-input type="text" name="nombre" id="nombre" v-model="nombre" placeholder="Nombre"></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="direccion" class="col-sm-3 col-form-label">Direccion</label>
                                <div class="col-sm-9">
                                    <b-form-input type="text" name="direccion" id="direccion" v-model="direccion" placeholder="Calle #123"></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="ciudad" class="col-sm-3 col-form-label">Ciudad</label>
                                <div class="col-sm-9">
                                    <b-form-input type="text" name="ciudad" id="ciudad" v-model="ciudad" placeholder="Santiago"></b-form-input>
                                </div>
                            </div>
                             <div class="form-group row">
                                <label for="region" class="col-sm-3 col-form-label">Region/Estado</label>
                                <div class="col-sm-9">
                                    <b-form-input type="text" name="region" id="region" v-model="region" placeholder="Metropolitana"></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="pais" class="col-sm-3 col-form-label">País</label>
                                <div class="col-sm-9">
                                    <b-form-select v-model="pais" :options="PAISES"></b-form-select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="email" class="col-sm-3 col-form-label">Correo</label>
                                <div class="col-sm-9">
                                    <b-form-input type="email" name="email" id="email" v-model="email" placeholder="correo@correo.com"></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="fono" class="col-sm-3 col-form-label">Telephone</label>
                                <div class="col-sm-9">
                                    <b-form-input type="text" name="fono" id="fono" v-model="fono" placeholder="(+56) 12 3456789"></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="url" class="col-sm-3 col-form-label">Pagina WEB</label>
                                <div class="col-sm-9">
                                    <b-form-input type="url" name="url" id="url" v-model="url" placeholder="https://organizacion.com"></b-form-input>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="url" class="col-sm-3 col-form-label">TIPO</label>
                                <div class="col-sm-9">
                                    <b-form-select v-model="tipo" :options="TIPOS"></b-form-select>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <label for="bio" class="col-sm-3 col-form-label">Descripcion</label>
                                <div class="col-sm-9">
                                    <b-form-textarea rows="6" type="text" name="bio" id="bio" v-model="bio" placeholder="Pequeña BIO"></b-form-textarea>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label for="fb" class="form-label">Facebook</label>
                                        <input class="form-control" type="url" name="fb" id="fb" v-model="fb" placeholder="fb.com/perfil">
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label for="ig" class="form-label">Instagram</label>
                                        <input class="form-control" type="url" name="ig" id="ig" v-model="ig" placeholder="ig.com/perfil">
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label for="tw" class="form-label">Twitter</label>
                                        <input class="form-control" type="url" name="tw" id="tw" v-model="tw" placeholder="tw.com/perfil">
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div class="form-group">
                                        <label for="gm" class="form-label">Gmail</label>
                                        <input class="form-control" type="url" name="gm" id="gm" v-model="gm" placeholder="gm.com/perfil">
                                    </div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
                <div class="card-footer text-right mb-3">
                    <div class="col-sm-9 offset-sm-3">
                        <b-button @click="checkForm" variant="primary" class="mr-1">Crear</b-button>
                        <b-button @click="cancelar" type="reset" variant="light">Cancel</b-button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default {
        name: 'OrgCreate',
        data(){
            return{
                user: [],
                token: localStorage.getItem('user-token') || null,
                user_id: localStorage.getItem('user-id') || null,
                nombre: null,
                bio: null,
                pais: null,
                region: null,
                ciudad: null,
                direccion: null,
                avatar: null,
                fb: '',
                ig: '',
                tw: '',
                gm: '',
                fono: null,
                url: null,
                email: null,
                activa: true,
                created_by: null,
                miembros: null,
                image: null,
                tipo: null,
                member: [],
                TIPOS:[
                    {value: 'HIJO',text: 'HIJO'},
                    {value: 'PADRE',text: 'PADRE'},
                ],
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
            this.$router.push('/organizaciones/organizaciones')
        },
        onChange(event){
            this.avatar  = event.target.files[0]
            let data = new FormData();
            data.append('name','image')
            data.append('image', this.avatar)
            console.log(event.target.files[0])
            axios.post('http://127.0.0.1:8000/api/imagenes/',{
                imagen: data,
                },{headers: {
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }})
            
        },
        onChange2(event2){
            const subirbanner  = event2.target.files[0]
            let data = new FormData();
            data.append('name','image')
            data.append('image',subirbanner)
            console.log(event2.target.files[0])
            axios.post('http://127.0.0.1:8000/api/imagenes/',{
                imagen: subirbanner,
                },{headers: {
                    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            }})
        },
        checkForm(){
            this.member.push(this.user_id)
            axios.post('http://127.0.0.1:8000/api/organizaciones/',{
                nombre: this.nombre,
                bio: this.bio,
                created_by: this.user_id,
                miembros: this.member,
                pais: this.pais,
                region: this.region,
                ciudad: this.ciudad,
                direccion: this.direccion,
                fb: this.fb,
                ig: this.ig,
                tw: this.tw,
                gm: this.gm,
                fono: this.fono,
                url: this.url,
                email: this.email,
                activa: 1,
                tipo: this.tipo,
            })
            .then(resp => {
                axios.post('http://127.0.0.1:8000/api/socios_org/',{
                user_in_socio: this.member,
                })
                .then(res => console.log(res))
                .catch(res => console.log(res))
                console.log(resp)
                axios.post('http://127.0.0.1:8000/api/solicitud_organizacion/',{
                    user_to_join: [],
                    probando: 'se crearon las solicitudes',
                })
                this.$swal({
				    title:"Organización Creada Correctamente!",
				    type:'success'
			    });
                this.$router.push('/organizaciones/mis_organizaciones') 
                })
            .catch(resp => {
                this.$swal({
				  title:"No se pudo Crear la Organización!",
				  type:'error'
			    });
                console.log(resp)
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
        },
    created(){
        this.getUser();
        },
    }
</script>
