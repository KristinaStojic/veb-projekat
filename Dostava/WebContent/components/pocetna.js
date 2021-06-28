Vue.component("pocetna", {
	data: function() {
		return {
			restorani: [],
			image : "",
			logo : "slike/logo_final2.png",
			uloga : "",
			admin : false,
			menadzer : false,
			dostavljac : false,
			kupac : false,
			prazno : true,
			search: "",
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

				<div v-if="admin"  class="collapse navbar-collapse" id="navbarSupportedContent">
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
								<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
								<div class="dropdown-divider"></div>
								<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
							</div>
						</li>


						</ul>
				</div>

				<div v-if="dostavljac" class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
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
		
				<div v-if="kupac" class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav ml-auto">
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

				<div v-if="menadzer" class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
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
				
				<div v-if="prazno" class="collapse navbar-collapse" id="navbarSupportedContent" >
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
		<div class="container-fluid content-row">
			<div>
				<input type="text" v-model="search" placeholder="Pretraži restorane"/>
			</div>

			<div class="row">
				<div style="margin: 20px;" v-for="(r, i) in pronadjeni"> {{postaviSliku(r.logo)}}
					<div class="card" >
						<img :src="image" class="card-img-top" alt="Nedostaje fotografija">
						<ul class="list-group list-group-flush">
						<li class="list-group-item"><b>{{r.naziv}}</b></li>
						<li class="list-group-item">{{r.tipRestorana}}</li>
						<li v-if="r.status === 'Otvoreno'" style="color:green;" class="list-group-item">{{r.status}}</li>
						<li v-if="r.status === 'Zatvoreno'" style="color:red;" class="list-group-item">{{r.status}}</li>
						<li class="list-group-item">{{r.lokacija}}</li>
						<li v-if="r.ocena !== '0.0'" class="list-group-item">Prosečna ocena: {{r.ocena}}</li>
						<li v-else class="list-group-item">Restoran nema nijednu ocenu</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>		
    	`
	,
	mounted() {

		uloga = window.localStorage.getItem("uloga");
		console.log(uloga)
		if(uloga === "ADMINISTRATOR"){
			this.admin = true;
			this.kupac = false;
			this.dostavljac = false;
			this.menadzer = false;
			this.prazno = false;
		}else if(uloga === "KUPAC"){
			this.kupac = true;
			this.menadzer = false;
			this.dostavljac = false;
			this.admin = false;
			this.prazno = false;

		}else if(uloga === "MENADZER"){
			this.menadzer = true;
			this.admin = false;
			this.kupac = false;
			this.dostavljac = false;
			this.prazno = false;

		}else if(uloga === "DOSTAVLJAC"){
			this.dostavljac = true;
			this.menadzer = false;
			this.admin = false;
			this.kupac = false;
			this.prazno = false;

		}
		
		console.log(this.admin);
		console.log(this.kupac);
		console.log(this.dostavljac);
		console.log(this.menadzer);
		console.log(this.prazno);

		axios
			.get('rest/restorani/')
			.then(response => (this.restorani = response.data))
	}
    ,

	computed: {
        pronadjeni : function() {
          return this.restorani.filter((r) => {
            return (r.naziv.toLowerCase().includes(this.search.toLowerCase()) || r.tipRestorana.toLowerCase().includes(this.search.toLowerCase()) || r.lokacija.toLowerCase().includes(this.search.toLowerCase()));
          })
        }},

	methods: {
	 postaviSliku: function(value) {
      this.image = "slike/restorani-logo/" + value;
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
		
	}
	}
});