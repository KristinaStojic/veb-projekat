Vue.component("licniPodaci", {
    data: function () {
      return {
        noviKorisnik: {
          korisnickoIme1: "",
          lozinka1: "",
          ime1: "",
          prezime1: "",
          pol1: 0,
          datumRodjenja1: ""
        },
        lozinka2: "",
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
        pol: 0,
        datumRodjenja: ""
      }
    },
    template: ` 
  
  <div class="slika-registracija" >
    <div class="inner">
        <div class="image-holder">
            <div class="pica"></div>
            </div>

            <form @submit="proveriPodatke" method='post'>
                <h3>Lični podaci</h3>

                <div class="form-group">
                    <input v-model="ime" type="text" class="form-control">
                    <input type="text" v-bind:value="prezime" class="form-control">
                </div>

                <div class="form-wrapper">
                    <input type="text" v-bind:value="korisnickoIme" class="form-control">
                    <i class="zmdi zmdi-account"></i>
                </div>

                <div class="form-wrapper">
                    <vuejs-datepicker v-bind:value="datumRodjenja" class="form-control" style="padding-center:35px;"></vuejs-datepicker>
                    <i class="zmdi zmdi-calendar"></i>
                </div>

                <div class="form-wrapper">
                    <select name="" id="" class="form-control" style="font-size: 12px" v-model="noviKorisnik.pol">
                    <option value="" disabled selected>Pol</option>
                    <option value="0">Ženski</option>
                    <option value="1">Muški</option>
                    </select>
                    <i class="zmdi zmdi-caret-down" style="font-size: 17px"></i>
                </div>

                <div class="form-wrapper">
                    <input type="password" placeholder="Nova lozinka" class="form-control" v-model="noviKorisnik.lozinka">
                    <i class="zmdi zmdi-lock"></i>
                </div>

                <div class="form-wrapper">
                    <input type="password" placeholder="Potvrdite lozinku" class="form-control" v-model="lozinka2">
                    <i class="zmdi zmdi-lock"></i>
                </div>

                <div class="form-group">
                    <button>Izmeni podatke
                        <i class="zmdi zmdi-arrow-right"></i>
                    </button>
                    <!--
                            &nbsp;&nbsp;
                            <button>Nazad
                                <i class="zmdi zmdi-arrow-right"></i>
                            </button>
                    -->
                </div>
                
            </form>
        </div>
  </div>
  `
    ,
    components: {
      vuejsDatepicker
    }
    ,



    mounted () {
        axios 
        .get('rest/korisnici/nadjiPrijavljenogKorisnika')
        .then(response => {
            if(response.data != null)
            {     
                this.korisnickoIme = response.data.korisnickoIme;
                this.lozinka = response.data.lozinka;
                this.ime = response.data.ime;
                this.prezime = response.data.prezime;
                this.pol = response.data.pol;
                this.datumRodjenja = response.data.datumRodjenja;
            }
            
    
        })
    },
    methods: {
      proveriPodatke: function (event) {
        event.preventDefault();
  
        /*if (!this.noviKorisnik.korisnickoIme) {
          alert('Obavezno uneti korisničko ime!');
        } else if (!this.noviKorisnik.lozinka) {
          alert('Obavezno uneti lozinku!');
        } else if (!this.noviKorisnik.ime) {
          alert('Obavezno uneti ime!');
        } else if (!this.noviKorisnik.prezime) {
          alert('Obavezno uneti prezime!');
        } else if (this.noviKorisnik.lozinka.localeCompare(this.lozinka2) != 0) {
          alert('Lozinke se ne poklapaju!');
        } else {

            var s = {jmbg:student.jmbg, ime:student.ime, prezime:student.prezime, datumRodjenja:student.datumRodjenja.getTime(), brojIndeksa:student.brojIndeksa};
    		axios
    		.post("rest/studenti/updatejson", s)
    		.then(response => toast('Student ' + student.ime + " " + student.prezime + " uspešno snimljen."));
    		this.mode = 'BROWSE';
        }*/
  

        console.log(this.ime)
      }
    }
  });