Vue.component("izmenaPodataka", {
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
        greska: "",

        postojiIme : false,
        postojiPrezime : false,
        postojiLozinka : false,
        postojiLozinka2 : false,
        postojiKorIme : false,
        postojiDatum : false,
        logo : "slike/logo_final2.png", uloga : "",
		zabranjeniDatumi: {
               from: new Date(Date.now())
            }
      }
    },
    template: ` 
  <div>
  <navigacija></navigacija>


<div class="bottom">
  <div id="greska" class="snackbar">{{greska}}</div>
  <div class="slika-registracija" >
    <div class="inner">
        <div class="image-holder">
            <div class="pica"></div>
            </div>

            <form @submit="proveriPodatke" method='post'>
                <h3>Izmena podataka</h3>

                <div class="form-group">
                    <input v-model="ime" type="text" class="form-control" v-on:click="imePromena" 
                    v-bind:class="[{ invalid: postojiIme && !this.ime}, { 'form-control': !postojiIme || this.ime}]"
                    >
                    <input type="text" v-model="prezime" class="form-control"
                    v-bind:class="[{ invalid: postojiPrezime && !this.prezime}, { 'form-control': !postojiPrezime || this.prezime}]"
                    >
                </div>

                <div class="form-wrapper">
                    <input type="text" v-model="korisnickoIme" class="form-control"
                    v-bind:class="[{ invalid: postojiKorIme && !this.korisnickoIme}, { 'form-control': !postojiKorIme || this.korisnickoIme}]"
                    >
                    <i class="zmdi zmdi-account"></i>
                </div>

                <div class="form-wrapper">
                    <vuejs-datepicker :disabledDates="zabranjeniDatumi"  v-model="datumRodjenja" class="form-control" style="padding-center:35px;"></vuejs-datepicker
                    v-bind:class="[{ invalid: postojiDatum && !this.datumRodjenja}, { 'form-control': !postojiDatum || this.datumRodjenja}]"
                    >
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
                    <input type="password" placeholder="Nova lozinka" class="form-control" v-model="lozinka"
                    v-bind:class="[{ invalid: postojiLozinka && !this.lozinka}, { 'form-control': !postojiLozinka || this.lozinka}]"
                    >
                    <i class="zmdi zmdi-lock"></i>
                </div>

                <div class="form-wrapper">
                    <input type="password" placeholder="Potvrdite lozinku" class="form-control" v-model="lozinka2"
                    v-bind:class="[{ invalid: postojiLozinka2 && !this.lozinka2}, { 'form-control': !postojiLozinka2 || this.lozinka2}]"
                    >
                    <i class="zmdi zmdi-lock"></i>
                </div>

                <div class="form-wrapper">
                    <label style="color:red;">{{msg}}</label>
                </div>
                <div class="form-group">
                    <button class="button1">Potvrdi
                        <i class="zmdi zmdi-arrow-right"></i>
                    </button>
                </div>
                
                <div id="greska" class="snackbar">{{greska}}</div>
            </form>
        </div>
  </div>

  </div>
  </div>
  `
    ,
    components: {
      vuejsDatepicker
    }
    ,

    mounted () {
    	this.uloga = window.localStorage.getItem("uloga")
		console.log(this.uloga)
			
        axios 
        .get('rest/korisnici/' + window.localStorage.getItem("korisnik"))
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
       
        menadzerRestoran : function(event){
            event.preventDefault();
            axios 
           .get('rest/korisnici/restoranMenadzera/' + window.localStorage.getItem("korisnik"))
           .then(response => {
               if(response.data.length == 0)
               {     
                   this.greska = "Trenutno Vam nije dodeljen nijedan restoran!";
                   var x = document.getElementById("greska");
                   x.className = "snackbar show";
                   setTimeout(function(){x.className = x.className.replace("show","");},1800);
               }else{
                   this.$router.push("/pregledRestorana")
               }
           })
        },
       
        imePromena: function(event) {
			event.preventDefault();
			this.postojiIme = true;
		},
		prezimePromena: function(event) {
			event.preventDefault();
			this.postojiPrezime = true;
		},
		lozinkaPromena: function(event) {
			event.preventDefault();
			this.postojiLozinka = true;
		},
		lozinka2Promena: function(event) {
			event.preventDefault();
			this.postojiLozinka2 = true;
		},
		korImePromena: function(event) {
			event.preventDefault();
			this.postojiKorIme = true;
		},
		datumPromena: function(event) {
			event.preventDefault();
			this.postojiDatum = true;
		},
      proveriPodatke: function (event) {
        event.preventDefault();
        this.msg = "";
        if (!this.ime) {
            this.msg = "Obavezno uneti ime!";
        }else if (!this.prezime) {
            this.msg = "Obavezno uneti prezime!";
        } else if (!this.korisnickoIme) {
            this.msg = "Obavezno uneti korisničko ime!";
        } else if (!this.datumRodjenja) {
            this.msg = "Obavezno izabrati datum!";
        } else if (!this.lozinka) {
            this.msg = "Obavezno uneti lozinku!";
        } else if (this.lozinka.localeCompare(this.lozinka2) != 0) {
            this.msg = "Lozinke se ne poklapaju!";
        }else{
        var k = {
            "korisnickoIme": this.korisnickoIme,
            "lozinka": this.lozinka,
            "ime": this.ime,
            "prezime": this.prezime,
            "pol": this.selektovaniPol,
            "datumRodjenja": this.datumRodjenja       
            }
        axios
					.put('/DostavaREST/rest/korisnici/izmeniLicnePodatke/' + window.localStorage.getItem("korisnik") , k)
					.then(response => {
						if (response.data.length == 0) {
							this.greska = "Korisnik sa ovim korisničkim imenom već postoji!";
							var x = document.getElementById("greska");
							x.className = "snackbar show";
							setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
						
						}else{
                           this.$router.push("/")
                        }
					})
					.catch(err => {
						alert("Nesto je pogresno");
						console.log(err);
					})
				return true;
        
      }
    }
    }
  });