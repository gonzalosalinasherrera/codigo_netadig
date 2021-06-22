<template>
    <div>
    <Breadcrumbs main="Usuario" title="Editar Perfil"/>
    <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="edit-profile">
          <div class="row">
            <div class="col-xl-4">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title mb-0">Mi Perfil</h4>
                  <div class="card-options"><a class="card-options-collapse" href="#" data-toggle="card-collapse"><em class="fe fe-chevron-up"></em></a><a class="card-options-remove" href="#" data-toggle="card-remove"><i class="fe fe-x"></i></a></div>
                </div>
                <div class="card-body">
                  <form>
                    <div class="row mb-2">
                      <div class="avatar"><img class="align-self-center rounded-circle" alt="" v-bind:src="profile.avatar" style="width: 65px; height: 65px;"></div>
                      <div class="col">
                        <h3 class="mb-1 text-center">{{user.first_name}} {{user.last_name}}</h3>
                        <div class="desc mt-2 text-center">{{user.email}}</div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="email" class="form-label">Correo</label>
                      <input v-model="email" name="email" id="email" class="form-control" type="email" placeholder="your-email@email.com">
                    </div>
                    <div class="form-group">
                      <label for="first_name" class="form-label">Nombre</label>
                      <input name="first_name" id="first_name" v-model="first_name" class="form-control" type="text" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="last_name" class="form-label">Apellido</label>
                        <input name="last_name" id="last_name" v-model="last_name" class="form-control" type="text" placeholder="Apellido">
                    </div>
                    <div class="card-footer">
                      <b-button @click="checkForm2" class="btn btn-primary btn-block">Guardar</b-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-xl-8">
              <form class="card">
                <div class="card-header">
                  <h4 class="card-title mb-0">Editar Perfil</h4>
                  <div class="card-options"></div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <label for=""> Fecha de Nacimiento</label>
                      <div class="row">
                        <label for="dia" class="col-sm-2 col-form-label">Día</label>
                        <div class="col-md-2">
                          <b-form-select v-model="dia" :options="DIAS"></b-form-select>
                        </div>
                        <label for="mes" class="col-sm-2 col-form-label">Mes</label>
                        <div class="col-md-2">
                          <b-form-select v-model="mes" :options="MESES"></b-form-select>
                        </div>
                        <label for="año" class="col-sm-2 col-form-label">Año</label>
                        <div class="col-md-2">
                          <b-form-select v-model="año" :options="AÑOS"></b-form-select>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <label for="telefono" class="form-label">Telefono</label>
                        <input nombre="telefono" id="telefono" v-model="fono" class="form-control" type="text" placeholder="+569 9 12345678">
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <label for="telefono" class="form-label">Ocupacion</label>
                        <input nombre="ocupacion" id="ocupacion" v-model="ocupacion" class="form-control" type="text" placeholder="Designer">
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                      <div class="form-group">
                        <label for="direccion" class="form-label">Direccion</label>
                        <input name="direccion" id="direccion" v-model="direccion" class="form-control" type="text" placeholder="calle wallaby">
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                      <div class="form-group">
                        <label for="ciudad" class="form-label">Ciudad</label>
                        <input name="ciudad" id="ciudad" v-model="ciudad" class="form-control" type="text" placeholder="Ciudad">
                      </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                      <div class="form-group">
                        <label for="pais" class="form-label">País</label>
                        <div class="form-group">
                          <b-form-select v-model="pais" class="form-control" type="text" :options="PAISES"></b-form-select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group mb-0">
                        <label for="bio" class="form-label">Sobre mi</label>
                        <textarea name="bio" id="bio" v-model="bio" class="form-control" rows="5" placeholder="Una breve descripcion"></textarea>
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <label for="fb" class="form-label">Facebook</label>
                        <input name="fb" id="fb" v-model="fb" class="form-control" type="url" placeholder="fb.com/perfil">
                      </div>
                    </div>
                    <div class="col-sm-5">
                        <div class="form-group">
                          <label for="ig" class="form-label">Instagram</label>
                          <input name="ig" id="ig" v-model="ig" class="form-control" type="url" placeholder="ig.com/perfil">
                        </div>
                      </div>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <label for="tw" class="form-label">Twitter</label>
                        <input name="tw" id="tw" v-model="tw" class="form-control" type="url" placeholder="tw.com/perfil">
                      </div>
                    </div>
                    <div class="col-sm-5">
                      <div class="form-group">
                        <label for="gm" class="form-label">Gmail</label>
                        <input nombre="gm" id="gm" v-model="gm" class="form-control" type="url" placeholder="gm.com/perfil">
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="url" class="col-sm-3 col-form-label">Genero</label>
                      <div class="col-sm-9">
                        <b-form-select v-model="gender" :options="GENDERS"></b-form-select>
                      </div>
                    </div>                    
                  </div>
                </div>
                <div class="card-footer text-right btn-showcase">
                  <b-button @click="checkForm" class="btn btn-primary">Actualizar Perfil</b-button>
                  <b-button @click="cancelar" type="reset" variant="light">Cancelar</b-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    <!-- Container-fluid Ends-->
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      token: localStorage.getItem('user-token') || null,
      user_id: localStorage.getItem('user-id') || null,
      user: [],
      profile: [],
      usuario: null,
      avatar: null,
      pais: null,
      region: null,
      ciudad: null,
      direccion: null,
      telefono: null,
      ocupacion: null,
      imgprofile: null,
      bod: null,
      created_at: null,
      updated_at: null,
      fb: null,
      tw: null,
      gm: null,
      ig: null,
      bio: null,
      first_name: null,
      last_name: null,
      password: null,
      email: null,
      username: null,
      fono: null,
      gender: '',
      dia: null,
      mes: null,
      año: null,
      AÑOS: [
        {value: '1933', text: '1933'},{value: '1934', text: '1934'},
        {value: '1935', text: '1935'},{value: '1936', text: '1936'},
        {value: '1937', text: '1937'},{value: '1938', text: '1938'},
        {value: '1939', text: '1939'},{value: '1940', text: '1940'},
        {value: '1941', text: '1941'},{value: '1942', text: '1942'},
        {value: '1943', text: '1943'},{value: '1944', text: '1944'},
        {value: '1945', text: '1945'},{value: '1946', text: '1946'},
        {value: '1947', text: '1947'},{value: '1948', text: '1948'},
        {value: '1949', text: '1949'},{value: '1950', text: '1950'},
        {value: '1951', text: '1951'},{value: '1952', text: '1952'},
        {value: '1953', text: '1953'},{value: '1954', text: '1954'},
        {value: '1955', text: '1955'},{value: '1956', text: '1956'},
        {value: '1957', text: '1957'},{value: '1958', text: '1958'},
        {value: '1959', text: '1959'},{value: '1960', text: '1960'},
        {value: '1961', text: '1961'},{value: '1962', text: '1962'},
        {value: '1963', text: '1963'},{value: '1964', text: '1964'},
        {value: '1965', text: '1965'},{value: '1966', text: '1966'},
        {value: '1967', text: '1967'},{value: '1968', text: '1968'},
        {value: '1969', text: '1969'},{value: '1970', text: '1970'},
        {value: '1971', text: '1971'},{value: '1972', text: '1972'},
        {value: '1973', text: '1973'},{value: '1974', text: '1974'},
        {value: '1975', text: '1975'},{value: '1976', text: '1976'},
        {value: '1977', text: '1977'},{value: '1978', text: '1978'},
        {value: '1979', text: '1979'},{value: '1980', text: '1980'},
        {value: '1981', text: '1981'},{value: '1982', text: '1982'},
        {value: '1983', text: '1983'},{value: '1984', text: '1984'},
        {value: '1985', text: '1985'},{value: '1986', text: '1986'},
        {value: '1987', text: '1987'},{value: '1988', text: '1988'},
        {value: '1989', text: '1989'},{value: '1990', text: '1990'},
        {value: '1991', text: '1991'},{value: '1992', text: '1992'},
        {value: '1993', text: '1993'},{value: '1994', text: '1994'},
        {value: '1995', text: '1995'},{value: '1996', text: '1996'},
        {value: '1997', text: '1997'},{value: '1998', text: '1998'},
        {value: '1999', text: '1999'},{value: '2000', text: '2000'},
        {value: '2001', text: '2001'},{value: '2002', text: '2002'},
        {value: '2003', text: '2003'},{value: '2004', text: '2004'},
        {value: '2005', text: '2005'},{value: '2006', text: '2006'},
        {value: '2007', text: '2007'},{value: '2008', text: '2008'},
        {value: '2009', text: '2009'},{value: '2010', text: '2010'},
        {value: '2011', text: '2011'},{value: '2012', text: '2012'},
        {value: '2013', text: '2013'},{value: '2014', text: '2014'},
        {value: '2015', text: '2015'},{value: '2016', text: '2016'},
        {value: '2017', text: '2017'},{value: '2018', text: '2018'},
        {value: '2019', text: '2019'},{value: '2020', text: '2020'},
      ],
      DIAS: [
        {value: '1', text: '1'},{value: '2', text: '2'},
        {value: '3', text: '3'},{value: '4', text: '4'},
        {value: '5', text: '5'},{value: '6', text: '6'},
        {value: '7', text: '7'},{value: '8', text: '8'},
        {value: '9', text: '9'},{value: '10', text: '10'},
        {value: '11', text: '11'},{value: '12', text: '12'},
        {value: '13', text: '13'},{value: '14', text: '14'},
        {value: '15', text: '15'},{value: '16', text: '16'},
        {value: '17', text: '17'},{value: '18', text: '18'},
        {value: '19', text: '19'},{value: '20', text: '20'},
        {value: '21', text: '21'},{value: '22', text: '22'},
        {value: '23', text: '23'},{value: '24', text: '24'},
        {value: '25', text: '25'},{value: '26', text: '26'},
        {value: '27', text: '27'},{value: '28', text: '28'},
        {value: '29', text: '29'}, {value: '30', text: '20'},
        {value: '31', text: '31'},
      ],
      MESES: [
        {value: 'ENERO', text: 'ENERO'},{value: 'FEBRERO', text: 'FEBRERO'},
        {value: 'MARZO', text: 'MARZO'},{value: 'ABRIL', text: 'ARBIL'},
        {value: 'MAYO', text: 'MAYO'},{value: 'JUNIO', text: 'JUNIO'},
        {value: 'JULIO', text: 'JULIO'},{value: 'AGOSTO', text: 'AGOSTO'},
        {value: 'SEPTIEMBRE', text: 'SEPTIEMBRE'},{value: 'OCTUBRE', text: 'OCTUBRE'},
        {value: 'NOVIEMBRE', text: 'NOVIEMBRE'},{value: 'DICIEMBRE', text: 'DICIEMBRE'},
      ],
      GENDERS: [
        {value: 'MASCULINO',text: 'MASCULINO'},
        {value: 'FEMENINO',text: 'FEMENINO'},
        {value: 'NO ESPECIFICAR',text: 'NO ESPECIFICAR'},
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
      ]
    }
  },
  methods:{
    cancelar(){
      this.$router.push('/usuarios/mi_perfil')
    },
    checkForm2(){
      if (this.email == null){
        this.email = this.user.email;
      }
      if (this.first_name == null){
        this.first_name = this.user.first_name;
      }
      if (this.last_name == null){
        this.last_name = this.user.last_name;
      }
      axios.patch('http://127.0.0.1:8000/api/users/' + this.user_id + '/',{
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
      })
      .then(resp => {
        this.$swal({
				  title:"Datos Actualizados Correctamente",
				  type:'success'
			  })
        .then(function(){
          location.reload();
      })
        console.log(resp)
      })
      .catch(resp => {
        this.$swal({
				  title:"No se pudieron actualizar los Datos",
				  type:'error'
			  })
        .then(function(){
          location.reload();
        })      
        console.log(resp)
        })
    },
    checkForm(){
      if (this.ocupacion == null){
        this.ocupacion = this.profile.ocupacion;
      }
      if (this.fono == null){
        this.fono = this.profile.fono;
      }
      if (this.ciudad == null){
        this.ciudad = this.profile.ciudad;
      }
      if (this.pais == null){
        this.pais = this.profile.pais;
      }
      if (this.direccion == null){
        this.direccion = this.profile.direccion;
      }
      if (this.ig == null){
        this.ig = this.profile.ig;
      }
      if (this.tw == null){
        this.tw = this.profile.tw;
      }
      if (this.gm == null){
        this.gm = this.profile.gm;
      }
      if (this.fb == null){
        this.fb = this.profile.fb;
      }
      if (this.gender == null){
        this.gender = this.profile.gender;
      }
      if (this.bio == null){
        this.bio = this.profile.bio;
      }
      if (this.dia == null || this.mes == null || this.año == null){
        this.bod = this.profile.bod;
      }else{
        this.bod = this.dia + ' / ' + this.mes + ' / ' + this.año;
      }
      axios.patch('http://127.0.0.1:8000/api/profile/' + this.user_id + '/',{
        gender: this.gender,
        ocupacion: this.ocupacion,
        fono: this.fono,
        ciudad: this.ciudad,
        pais: this.pais,
        direccion: this.direccion,
        ig: this.ig,
        tw: this.tw,
        gm: this.gm,
        fb: this.fb,
        bio: this.bio,
        bod: this.bod,
      })
      .then(resp => {
        this.$swal({
				  title:"Datos Actualizados Correctamente",
				  type:'success'
			  })
        .then(function(){
          location.reload();
        })
      })
      .catch(error => {
        this.$swal({
				  title:"No se pudieron actualizar los Datos",
				  type:'error'
			  })
        .then(function(){
          location.reload();
      })
        console.log(error)
      })
    },
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
  },
  created(){
    this.getUser();
    this.getProfile();
  },
}
</script>