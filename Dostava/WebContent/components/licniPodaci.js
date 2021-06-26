Vue.component("licniPodaci", {
    data: function () {
      return {
        lozinka2: "",
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
        pol: 0,
        datumRodjenja: "",
        selektovaniPol : 0,
        novaLozinka: "",
        msg: "",
        greska: ""
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
                    <input type="text" v-model="prezime" class="form-control">
                </div>

                <div class="form-wrapper">
                    <input type="text" v-model="korisnickoIme" class="form-control">
                    <i class="zmdi zmdi-account"></i>
                </div>

                <div class="form-wrapper">
                    <vuejs-datepicker v-model="datumRodjenja" class="form-control" style="padding-center:35px;"></vuejs-datepicker>
                    <i class="zmdi zmdi-calendar"></i>
                </div>

                <div class="form-wrapper">
                    <select name="" id="" class="form-control" style="font-size: 12px" v-model="selektovaniPol">
                    <option value="0">Ženski</option>
                    <option value="1">Muški</option>
                    </select>
                    <i class="zmdi zmdi-caret-down" style="font-size: 17px"></i>
                </div>

                <div class="form-wrapper">
                    <input type="password" placeholder="Nova lozinka" class="form-control" v-model="lozinka">
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

                if(this.pol.localeCompare("ZENSKI") == 0){
                    this.selektovaniPol = '0';

                    
                }
                else if(this.pol.localeCompare("MUSKI") == 0){
                    this.selektovaniPol = '1';
                }
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
  
        var k = {
            "korisnickoIme": this.korisnickoIme,
            "lozinka": this.lozinka,
            "ime": this.ime,
            "prezime": this.prezime,
            "pol": this.selektovaniPol,
            "datumRodjenja": this.datumRodjenja       
            }
        axios
					.post('/DostavaREST/rest/korisnici/izmeniLicnePodatke', k)
					.then(response => {
						if (response.data.length == 0) {
							alert("Ne vraca korisnika");
						
						}else{
                            if(response.data.uloga.localeCompare("KUPAC") == 0){
                                this.$router.push("/pocetnaStranaKupac")
                            }
                            else if(response.data.uloga.localeCompare("MENADZER") == 0){
                                this.$router.push("/pocetnaStranaMenadzer")
                            }else if(response.data.uloga.localeCompare("DOSTAVLJAC") == 0){
                                this.$router.push("/pocetnaStranaDostavljac")
                            }
                            else if(response.data.uloga.localeCompare("ADMINISTRATOR") == 0){
                                this.$router.push("/pocetnaStranaAdministrator")
                            }
                            
                          }
					})
					.catch(err => {
						alert("Nesto je pogresno");
						console.log(err);
					})
				return true;
        

        console.log(this.ime)
        console.log(this.prezime)
        console.log(this.korisnickoIme)
        console.log(this.datumRodjenja)
        console.log(this.ime)
        console.log(this.novaLozinka)
        console.log(this.selektovaniPol)
      }
    }
  });