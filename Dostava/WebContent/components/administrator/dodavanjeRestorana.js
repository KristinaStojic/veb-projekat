Vue.component("dodavanjeRestorana", {
	data: function() {
		return {
			restoran: {
				naziv: "",
				tipRestorana: 7,
				logo: "",
				geografskaDuzina: "",
				geografskaSirina: "",
				ulica: "",
				broj: "",
				mesto: "",
				postanskiBroj: "",
				idMenadzera: ""

			}, izabranFajl : null, kj : "slike/logo_final2.png",
			menadzeri: null, selektovano: false, promena: false
			, naziv: false, sirina: false, duzina: false, ulica: false, broj: false, mesto: false, posta: false,
			msg: "",
			greska: ""
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
								<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeRestorana">Dodaj restoran</a>
							</li>

							<li class="nav-item nav-link active">
								<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeMenadzera">Dodaj menadzera</a>
							</li>

							<li class="nav-item dropdown">
								<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
									<i class="zmdi zmdi-account zmdi-hc-2x"></i>
								</div>
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
									<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
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
 	<div class="form-group">
      <input type="number" placeholder="Geografska duzina" v-model="restoran.geografskaDuzina" v-on:click="duzinaPromena" 
      v-bind:class="[{ invalid1: duzina && !restoran.geografskaDuzina}, { 'form-control1': !duzina || restoran.geografskaDuzina}]" >
      <input type="number" placeholder="Geografska sirina" v-model="restoran.geografskaSirina" v-on:click="sirinaPromena" 
      v-bind:class="[{ invalid1: sirina && !restoran.geografskaSirina}, { 'form-control1': !sirina || restoran.geografskaSirina}]">
    </div>
	<div class="form-group">
      <input type="text" placeholder="Ulica" v-model="restoran.ulica" v-on:click="ulicaPromena" 
      v-bind:class="[{ invalid1: ulica && !restoran.ulica}, { 'form-control1': !ulica || restoran.ulica}]" >
      <input type="number" placeholder="Broj kuće/stana" v-model="restoran.broj" v-on:click="brojPromena" 
      v-bind:class="[{ invalid1: broj && !restoran.broj}, { 'form-control1': !broj || restoran.broj}]" min="0">
    </div>
	<div class="form-group">
      <input type="text" placeholder="Mesto" v-model="restoran.mesto" v-on:click="mestoPromena" 
      v-bind:class="[{ invalid1: mesto && !restoran.mesto}, { 'form-control1': !mesto || restoran.mesto}]" >
      <input type="number" placeholder="Poštanski broj" v-model="restoran.postanskiBroj" v-on:click="postaPromena" 
      v-bind:class="[{ invalid1: posta && !restoran.posta}, { 'form-control1': !posta || restoran.posta}]">
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
		promeniStatus: function(event){
			event.preventDefault();
			this.selektovano = !this.selektovano;
			
		}
		,
		selektovanFajl : function(event){
			event.preventDefault();
			this.izabranFajl = event.target.files[0];
			
			if(this.izabranFajl != null){
			const fd = new FormData();
			fd.append('slika',this.izabranFajl, this.izabranFajl.name)
			
			console.log(this.izabranFajl);
			axios
				.post('rest/restorani/dodajSliku')
				.then(response => {
					console.log(response);
				})
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
			} else if (!this.restoran.geografskaDuzina) {
				this.msg = "Obavezno uneti geografsku dužinu!";
			} else if (!this.restoran.geografskaSirina) {
				this.msg = "Obavezno izabrati geografsku širinu!";
			} else if (!this.restoran.ulica) {
				this.msg = "Obavezno uneti ulicu!";
			} else if (!this.restoran.broj) {
				this.msg = "Obavezno uneti broj!";
			}else if (!this.restoran.mesto) {
				this.msg = "Obavezno uneti mesto!";
			}else if (!this.restoran.postanskiBroj) {
				this.msg = "Obavezno uneti poštanski broj!";
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
								window.localStorage.removeItem("restoran");
								this.$router.push("/")
							}else if (this.selektovano === true){
								window.localStorage.setItem("restoran", response.data.id);
								console.log("tu sam" + response.data.id);
								this.$router.push("/dodavanjeMenadzera")
							}
						}
					})
					.catch(err => {
						this.greska = "Neuspešno dodovanjae!";
						var x = document.getElementById("greska");
						x.className = "snackbar show";
						setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
						console.log(err);
					})
				return true;
			}
		}
	}
});