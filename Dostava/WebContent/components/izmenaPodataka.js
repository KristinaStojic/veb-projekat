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
        logo : "slike/logo_final2.png", uloga : ""
      }
    },
    template: ` 
  <div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
			<a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/">
				<img :src="logo" alt="" width="100" height="80">
			</a>
						
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

				<div v-if="uloga === 'ADMINISTRATOR'"  class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item nav-link active">
								<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeRestorana">Dodaj restoran</a>
							</li>

							<li class="nav-item nav-link active">
								<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeMenadzera">Dodaj menadžera</a>
							</li>

							<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeDostavljaca">Dodaj dostavljača</a>
							</li>

							<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/sviKorisnici">Prikaži sve korisnike</a>
							</li>

							<li class="nav-item dropdown">
							<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
								<i class="zmdi zmdi-account zmdi-hc-2x"></i>
							</div>
							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <label class="dropdown-item" v-on:click="mojiPodaci()">Moji podaci</label>
                            <div class="dropdown-divider"></div>
                            <label class="dropdown-item" v-on:click="izmenaPodataka()">Izmena podataka</label>
                            <div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
							</div>
						</li>


						</ul>
				</div>

				<div v-if="uloga === 'DOSTAVLJAC'" class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item dropdown">
								<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
									<i class="zmdi zmdi-account zmdi-hc-2x"></i>
								</div>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <label class="dropdown-item" v-on:click="mojiPodaci()">Moji podaci</label>
                                <div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="izmenaPodataka()">Izmena podataka</label>
									<div class="dropdown-divider"></div>
									<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
								</div>
							</li>

							
						</ul>
				</div>
		
				<div v-if="uloga === 'KUPAC'" class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav ml-auto">
							<li class="nav-item dropdown">
								<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
									<i class="zmdi zmdi-account zmdi-hc-2x"></i>
								</div>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <label class="dropdown-item" v-on:click="mojiPodaci()">Moji podaci</label>
                                <div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="izmenaPodataka()">Izmena podataka</label>
									<div class="dropdown-divider"></div>
									<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
								</div>
							</li>

							</ul>
				</div>

				<div v-if="uloga === 'MENADZER'" class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">

                        <li class="nav-item nav-link active">
                        <a class="nav-link" href="" v-on:click="menadzerRestoran">Moj restoran</a>
                        </li>
			
							<li class="nav-item dropdown">
							<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
								<i class="zmdi zmdi-account zmdi-hc-2x"></i>
							</div>
							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <label class="dropdown-item" v-on:click="mojiPodaci()">Moji podaci</label>
                            <div class="dropdown-divider"></div>
                            <label class="dropdown-item" v-on:click="izmenaPodataka()">Izmena podataka</label>
                            <div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
							</div>
						</li>
					</ul>
				</div>
				
				<div v-if="uloga === null" class="collapse navbar-collapse" id="navbarSupportedContent" >
					<ul class="navbar-nav ml-auto">
						<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/prijava">Prijava</a>
						</li>
						<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/registracija">Registracija</a>
						</li>
					</ul>
				</div>

	</nav>


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
                    <vuejs-datepicker v-model="datumRodjenja" class="form-control" style="padding-center:35px;"></vuejs-datepicker
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
        izmenaPodataka(){
			this.$router.push("/izmenaPodataka/"+ window.localStorage.getItem("korisnik"));
		  },
        mojiPodaci(){
            this.$router.push("/licniPodaci/"+ window.localStorage.getItem("korisnik"));
            console.log("moji podaci")
          },
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
        odjava : function() {
    		axios 
    			.post('/DostavaREST/rest/korisnici/odjava')
    			.then(response => {
					window.localStorage.removeItem("korisnik");
					window.localStorage.removeItem("uloga");
					this.greska = "Uspesna odjava!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
    				this.$router.push("/")
    			})
				.catch(err => {
					this.greska = "Neuspjesna odjava!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					console.log(err);
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