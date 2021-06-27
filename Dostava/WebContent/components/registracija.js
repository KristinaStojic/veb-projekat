Vue.component("registracija", {
	data: function() {
		return {
			noviKorisnik: {
				korisnickoIme: "",
				lozinka: "",
				ime: "",
				prezime: "",
				pol: 0,
				datumRodjenja: "",
				uloga: 3
			},
			lozinka2: "",
			ime: false,
			prezime: false,
			lozinka: false,
			lozinka2a: false,
			korIme: false,
			datum: false,
			msg: "",
			greska: ""
		}
	},
	template: ` 
<div>
<nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
					<a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/">K&J</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
				
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item nav-link active">
								<a class="nav-link" href="http://localhost:8080/DostavaREST/#/prijava">Prijava</a>
							</li>
						</ul>
					</div>
				</nav>
<div class="bottom">
<div class="slika-registracija" >
<div class="inner">
  <div class="image-holder">
    <div class="pica"></div>
  </div>
  <form @submit="proveriPodatke" method='post'>
    <h3>Registracija</h3>
    <div class="form-group">
      <input type="text" placeholder="Ime" v-model="noviKorisnik.ime" v-on:click="imePromena" 
      v-bind:class="[{ invalid: ime && !this.noviKorisnik.ime}, { 'form-control': !ime || this.noviKorisnik.ime}]" >
      <input type="text" placeholder="Prezime" v-model="noviKorisnik.prezime" v-on:click="prezimePromena" 
      v-bind:class="[{ invalid: prezime && !this.noviKorisnik.prezime}, { 'form-control': !prezime || this.noviKorisnik.prezime}]">
    </div>
    <div class="form-wrapper">
      <input type="text" placeholder="Korisničko ime" v-model="noviKorisnik.korisnickoIme"  v-on:click="korImePromena" 
      v-bind:class="[{ invalid: korIme && !this.noviKorisnik.korisnickoIme}, { 'form-control': !korIme || this.noviKorisnik.korisnickoIme}]">
      <i class="zmdi zmdi-account"></i>
    </div>
    <div class="form-wrapper">
      <vuejs-datepicker style="padding-center:35px;" placeholder="Datum" v-model="noviKorisnik.datumRodjenja" 
      v-on:click="datumPromena" v-bind:class="[{ invalid: datum && !this.noviKorisnik.datumRodjenja}, { 'form-control': !datum || this.noviKorisnik.datumRodjenja}]">
      </vuejs-datepicker>
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
      <input type="password" placeholder="Lozinka" v-model="noviKorisnik.lozinka"
      v-on:click="lozinkaPromena" 
      v-bind:class="[{ invalid: lozinka && !this.noviKorisnik.lozinka }, { 'form-control': !lozinka || this.noviKorisnik.lozinka}]">
      <i class="zmdi zmdi-lock"></i>
    </div>
    <div class="form-wrapper">
      <input type="password" placeholder="Potvrdite lozinku" v-model="lozinka2" 
		v-on:click="lozinka2Promena" v-bind:class="[{ invalid: lozinka2a && !this.lozinka2}, { 'form-control': !lozinka2a || this.lozinka2}]">
      <i class="zmdi zmdi-lock"></i>
    </div>
    <div class="form-wrapper">
      <label style="color:red;">{{msg}}</label>
    </div>
    <button>Registracija
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
	components: {
		vuejsDatepicker
	}
	,
	methods: {

		imePromena: function(event) {
			event.preventDefault();
			this.ime = true;
		},
		prezimePromena: function(event) {
			event.preventDefault();
			this.prezime = true;
		},
		lozinkaPromena: function(event) {
			event.preventDefault();
			this.lozinka = true;
		},
		lozinka2Promena: function(event) {
			event.preventDefault();
			this.lozinka2a = true;
		},
		korImePromena: function(event) {
			event.preventDefault();
			this.korIme = true;
		},
		datumPromena: function(event) {
			event.preventDefault();
			this.datum = true;
		},
		proveriPodatke: function(event) {
			event.preventDefault();
			this.msg = "";
			if (!this.noviKorisnik.ime) {
				this.msg = "Obavezno uneti ime!";
			} else if (!this.noviKorisnik.prezime) {
				this.msg = "Obavezno uneti prezime!";
			} else if (!this.noviKorisnik.korisnickoIme) {
				this.msg = "Obavezno uneti korisničko ime!";
			} else if (!this.noviKorisnik.datumRodjenja) {
				this.msg = "Obavezno izabrati datum!";
			} else if (!this.noviKorisnik.lozinka) {
				this.msg = "Obavezno uneti lozinku!";
			} else if (this.noviKorisnik.lozinka.localeCompare(this.lozinka2) != 0) {
				this.msg = "Lozinke se ne poklapaju!";
			} else {
				axios
					.post('/DostavaREST/rest/korisnici/registracija', this.noviKorisnik)
					.then(response => {
						if (response.data.length == 0) {
							this.greska = "Korisnik sa ovim korisničkim imenom već postoji!";
							var x = document.getElementById("greska");
							x.className = "snackbar show";
							setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
						} else {
							this.greska = "Uspešna registracija!";
							var x = document.getElementById("greska");
							x.className = "snackbar show";
							setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
							this.$router.push("/prijava")
						}
					})
					.catch(err => {
						this.greska = "Neuspešna registracija!";
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