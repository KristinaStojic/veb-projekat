Vue.component("dodavanjeRestorana", {
	data: function () {
		return {
			restoran: {
				naziv: "",
				tipRestorana: 7,
				logo: ""
			},
			lokacija: {
				geografskaDuzina: "",
				geografskaSirina: "",
				ulica: "",
				broj: "",
				mesto: "",
				postanskiBroj: ""

			},
			menadzer: {
				korisnickoIme: "",
				lozinka: "",
				ime: "",
				prezime: "",
				pol: 0,
				datumRodjenja: "",
				uloga: 3
			}, idMenadzera: "",
			menadzeri: null
			, naziv: false, geografskaDuzina: false, geografskaSirina:false, ulica:false, broj:false,mesto:false,posta:false,
			msg: "",
			greska: ""
		}
	},
	template: ` 
		<div>	
				<nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
					<a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/pocetnaStranaAdministrator">K&J</a>
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
  <form>
    <h3>Kreiranje restorana</h3>
    <div class="form-wrapper">
      <input type="text" placeholder="Naziv" v-model="restoran.naziv" v-on:click="nazivPromena" 
      v-bind:class="[{ invalid: naziv && !this.restoran.naziv}, { 'form-control': !naziv || this.restoran.naziv}]" >
      <i class="zmdi zmdi-store"></i>
    </div>
    <div class="form-wrapper">
      <select class="form-control" style="font-size: 12px" v-model="restoran.tipRestorana">
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
		<button class="dugme1">Dodaj logo restorana
			<i class="zmdi zmdi-img-alt"></i>
  		</button>
    </div>
	<div class="form-group">
      <input type="text" placeholder="Geografska duzina" v-model="lokacija.geografskaDuzina" v-on:click="duzinaPromena" 
      v-bind:class="[{ invalid: geografskaDuzina && !lokacija.geografskaDuzina}, { 'form-control': !geografskaDuzina || lokacija.geografskaDuzina}]" >
      <input type="text" placeholder="Geografska sirina" v-model="lokacija.geografskaSirina" v-on:click="sirinaPromena" 
      v-bind:class="[{ invalid: geografskaSirina && !lokacija.geografskaSirina}, { 'form-control': !geografskaSirina || lokacija.geografskaSirina}]">
    </div>
	<div class="form-group">
      <input type="text" placeholder="Ulica" v-model="lokacija.ulica" v-on:click="ulicaPromena" 
      v-bind:class="[{ invalid: ulica && !lokacija.ulica}, { 'form-control': !ulica || lokacija.ulica}]" >
      <input type="number" placeholder="Broj kuće/stana" v-model="lokacija.broj" v-on:click="brojPromena" 
      v-bind:class="[{ invalid: broj && !lokacija.broj}, { 'form-control': !broj || lokacija.broj}]" min="0">
    </div>
	<div class="form-group">
      <input type="text" placeholder="Mesto" v-model="lokacija.mesto" v-on:click="mestoPromena" 
      v-bind:class="[{ invalid: mesto && !lokacija.mesto}, { 'form-control': !mesto || lokacija.mesto}]" >
      <input type="text" placeholder="Poštanski broj" v-model="lokacija.postanskiBroj" v-on:click="postaPromena" 
      v-bind:class="[{ invalid: posta && !lokacija.posta}, { 'form-control': !posta || lokacija.posta}]">
    </div>
	<div class="form-wrapper">
      <select class="form-control" style="font-size: 12px" v-model="idMenadzera">
        <option value="" disabled selected>Menadzeri</option>
		<option
		 v-for="(m, i) in menadzeri" value="m.id">{{m.ime}} {{m.prezime}}, {{m.korisnickoIme}}</option>
      </select>
      <i class="zmdi zmdi-caret-down" style="font-size: 17px"></i>
     </div>
    <div class="form-wrapper">
      <label style="color:red;">{{msg}}</label>
    </div>
    <button>Potvrdi
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
		nazivPromena: function(event) {
			event.preventDefault();
			this.naziv = true;
		},
		sirinaPromena: function(event) {
			event.preventDefault();
			this.geografskaSirina = true;
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
		odjava: function () {
			axios
				.post('/DostavaREST/rest/korisnici/odjava')
				.then(response => {
					window.localStorage.removeItem("korisnik");
					this.greska = "Uspesna odjava!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function () { x.className = x.className.replace("show", ""); }, 1800);
					this.$router.push("/")
				})
				.catch(err => {
					this.greska = "Neuspjesna odjava!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function () { x.className = x.className.replace("show", ""); }, 1800);
					console.log(err);
				})

		}
	}
});