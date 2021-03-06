Vue.component("dodavanjeRestorana", {
	data: function() {
		return {
			restoran: {
				naziv: "",
				tipRestorana: 7,
				logo: "",
				geografskaDuzina: 19.833549,
				geografskaSirina: 45.267136,
				ulica: "",
				broj: "",
				mesto: "",
				postanskiBroj: "",
				idMenadzera: ""

			}, izabranFajl : null, kj : "slike/logo_final2.png",
			menadzeri: null, selektovano: false, promena: false
			, naziv: false, adresaP : false,
			msg: "",
			greska: "",
			adresa : ""
		}
	},
	template: ` 
		<div>	
				<nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
					<a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/">
						<img :src="kj" alt="" width="100" height="80">
					</a>
					
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
				
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item nav-link active">
								<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeMenadzera">Dodaj menadžera</a>
							</li>

							<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeDostavljaca">Dodaj dostavljača</a>
							</li>

							<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/sviKorisnici">Prikaži sve korisnike</a>
							</li>

							<li class="nav-item nav-link active">
							<a class="nav-link" href="http://localhost:8080/DostavaREST/#/sumnjiviKorisnici">Prikaži sve sumnjive korisnike</a>
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
					<div id="greska" class="snackbar">{{greska}}</div>
				</nav>
				<div class="bottom">
<div class="slika-registracija" bottom>
  <div class="inner">
	<div class="image-holder">
		<div class="restoran"></div>
	</div>
  <form >
    <h3>Kreiranje restorana</h3>
    <div class="form-wrapper">
      <input type="text" placeholder="Naziv" v-model="restoran.naziv" v-on:click="nazivPromena" 
      v-bind:class="[{ invalid1: naziv && !this.restoran.naziv}, { 'form-control1': !naziv || this.restoran.naziv}]" >
      <i class="zmdi zmdi-cutlery"></i>
    </div>
    <div class="form-wrapper">
      <select class="form-control1" style="font-size: 12px" v-model="restoran.tipRestorana">
        <option value="" disabled selected>Tip resotrana</option>
		<option value="6">Brza hrana</option>
		<option value="7">Raznolika kuhinja</option>
        <option value="0">Italijanska hrana</option>
        <option value="1">Kineska hrana</option>
		<option value="2">Jela sa roštilja</option>
		<option value="3">Srpska hrana</option>
		<option value="4">Grčka hrana</option>
		<option value="5">Vegetarijanska hrana</option>
      </select>
      <i class="zmdi zmdi-caret-down" style="font-size: 17px"></i>
    </div>
    <div class="form-wrapper">
		<input style="display:none" ref="unos" id="fajl" type="file" v-on:change="selektovanFajl" accept="image/*">
		<button class="dugme1" v-on:click="$refs.unos.click()"> Izaberi logo </button>
		</div>
	<div class="form-wrapper">
		
	</div>
 	<div class="form-wrapper">
      <input type="text" placeholder="Adresa" v-model="adresa" v-on:click="duzinaPromena" 
      v-bind:class="[{ invalid1: adresaP && !adresa}, { 'form-control1': !adresaP || adresa}]" >
    </div>
	<div align="center" vertical-align="center" style="border-style:solid; width:100%; height:200px;">
                <map-container
                :coordinates="[this.restoran.geografskaDuzina,this.restoran.geografskaSirina]"
                ></map-container>
     </div>
	<div class="form-wrapper">
      <select class="form-control" style="font-size: 12px" v-model="restoran.idMenadzera">
        <option value="" disabled select3ed>Menadzeri</option>
		<option
		 v-for="m in menadzeri" :value="m.id" >{{m.ime}} {{m.prezime}}, {{m.korisnickoIme}}</option>
      </select>
      <i class="zmdi zmdi-caret-down" style="font-size: 17px"></i>
     </div>
     <div class="form-check form-switch">
  		<input class="form-check-input" type="checkbox" id="dodajNovog" v-on:change="promeniStatus">
  		<label class="form-check-label" for="dodajNovog">Kreiranje novog menadžera</label>
	</div>
      <label style="color:red;">{{msg}}</label>
      <button class="button1" @click="proveriPodatke" method='post'>Potvrdi
      <i class="zmdi zmdi-arrow-right"></i>
    </button>
   <div id="greska" class="snackbar">{{greska}}</div>
  </form>
   
	</div>
	</div>
	</div>
 </div>
    	`
	,
	mounted() {
		axios
			.get('rest/korisnici/menadzeri')
			.then(response => (this.menadzeri = response.data))
	},

	methods: {
		izmenaPodataka(){
			console.log("moji podaci");
			this.$router.push("/izmenaPodataka/"+ window.localStorage.getItem("korisnik"));
		  },
		mojiPodaci(){
			this.$router.push("/licniPodaci/"+ window.localStorage.getItem("korisnik"));
			console.log("moji podaci")
		  },
		promeniStatus: function(event){
			event.preventDefault();
			this.selektovano = !this.selektovano;
			
		}
		,
		selektovanFajl : function(event){
			event.preventDefault();
			this.izabranFajl = event.target.files[0];
			
			if(this.izabranFajl != null){
				this.greska = "Uspešno dodata fotografija!";
                var x = document.getElementById("greska");
                x.className = "snackbar show";
                setTimeout(function(){x.className = x.className.replace("show","");},1800);
				const fd = new FormData();
				fd.append('slika',this.izabranFajl, this.izabranFajl.name)
				console.log(fd.get('slika'));
			axios
				.post('rest/restorani/dodajSliku' )
				.then(response => {
					console.log(response);
				})
			}else{
				this.greska = "Neuspešno dodata fotografija! Pokušajte ponovo!";
                var x = document.getElementById("greska");
                x.className = "snackbar show";
                setTimeout(function(){x.className = x.className.replace("show","");},1800);
			}
		}
		,
		nazivPromena: function(event) {
			event.preventDefault();
			this.naziv = true;
		},
		sirinaPromena: function(event) {
			event.preventDefault();
			this.sirina = true;
		},
		duzinaPromena: function(event) {
			event.preventDefault();
			this.duzina = true;
		},
		ulicaPromena: function(event) {
			event.preventDefault();
			this.ulica = true;
		},
		brojPromena: function(event) {
			event.preventDefault();
			this.broj = true;
		},
		mestoPromena: function(event) {
			event.preventDefault();
			this.mesto = true;
		},
		postaPromena: function(event) {
			event.preventDefault();
			this.posta = true;
		},
		odjava: function() {
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
					setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
					console.log(err);
				})

		},
		proveriPodatke: function(event) {
			event.preventDefault();
			this.msg = "";
			if(this.izabranFajl!=null){
			this.restoran.logo = this.izabranFajl.name;}
			if (!this.restoran.naziv) {
				this.msg = "Obavezno uneti naziv restorana!";
			} else if (!this.restoran.logo) {
				this.msg = "Obavezno izabrati logo restorana!";
			} else if (!this.adresa) {
				this.msg = "Obavezno izabrati lokaciju!";
			}
			else if (this.selektovano === false && !this.restoran.idMenadzera) {
				this.msg = "Odabrati menadžera ili selektovati kreiranje novog!";
			} else{
				if(this.selektovano === true){
					this.restoran.idMenadzera = "";
				}
				this.restoran.logo = "slike/restorani-logo/" + this.izabranFajl.name;
				axios
					.post('/DostavaREST/rest/restorani/dodajRestoran', this.restoran)
					.then(response => {
						if (response.data.length == 0) {
							this.greska = "Neuspešno dodavanje";
							var x = document.getElementById("greska");
							x.className = "snackbar show";
							setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
							console.log("neuspesno");
						} else {
							this.greska = "Uspešno dodavanje!";
							var x = document.getElementById("greska");
							x.className = "snackbar show";
							setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
							if(this.selektovano === false){
								
								this.dodeliRestoranMenadzeru(response.data.id);
								
							}else if (this.selektovano === true){
								window.localStorage.setItem("restoran", response.data.id);
								console.log("tu sam" + response.data.id);
								this.$router.push("/dodavanjeMenadzera")
							}
						}
					})
					.catch(err => {
						this.greska = "Neuspešno dodavanje!";
						var x = document.getElementById("greska");
						x.className = "snackbar show";
						setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
						console.log(err);
					})
				return true;
			}
		},
		dodeliRestoranMenadzeru : function(id){
			axios
			.post('/DostavaREST/rest/korisnici/dodajRestoranMenadzeru/' + this.restoran.idMenadzera, id)
			.then(response => { window.localStorage.removeItem("restoran");
								this.$router.push("/")})
			.catch(err => {
						this.greska = "Neuspešno dodavanje!";
						var x = document.getElementById("greska");
						x.className = "snackbar show";
						setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
						console.log(err);
					})
					
		},
		azuriranjeAdrese : function() {
			
            axios.get("https://nominatim.openstreetmap.org/reverse", {
					params: {
						lat: this.restoran.geografskaSirina,
						lon: this.restoran.geografskaDuzina,
						format: "json",
					},
				})
				.then((response) => {
					const { address } = response.data;
                    var flag = false;
                    if (address) {
						
                        if (address.road) {
                            this.restoran.ulica = address.road;
							
                            flag = true;
                        } else if (address.street) {
                            this.restoran.ulica = address.street;
                            flag = true;
                        }
                        if (flag && address["house-number"]) {
                            this.restoran.broj = address["house-number"];
                        }
                        else if (flag && address["house_number"]) {
                            this.restoran.broj = address["house_number"];
                        }
                        if (flag && address.town) {
                            this.restoran.mesto = address.town;
                        }
                        else if (flag && address.city) {
                            this.restoran.mesto = address.city;
                        }
						if (flag && address.postCode) {
                            this.restoran.postanskiBroj = address.postCode;
                        }
                        else if (flag && address.postcode) {
                            this.restoran.postanskiBroj = address.postcode;
                        }
                        if (flag) {
                            this.adresa = this.restoran.ulica + " " + this.restoran.broj + ", " + this.restoran.mesto + " " + this.restoran.postanskiBroj
                        }
                    }
				})
				.catch(function(error) {
					alert('Nije moguće pronaći adresu sa zadatim koordinatama.');
				});
        }
	}
});