Vue.component("pocetna", {
	data: function() {
		return {
			restorani: [],
			image : "",
			logo : "slike/logo_final2.png",
			uloga : "",
			search: ""
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

		<div v-if="uloga == 'ADMINISTRATOR'" class="collapse navbar-collapse" id="navbarSupportedContent">
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

		<div v-if="uloga == 'DOSTAVLJAC'" class="collapse navbar-collapse" id="navbarSupportedContent">
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

		<div v-if="uloga == 'KUPAC'" class="collapse navbar-collapse" id="navbarSupportedContent">
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

		<div v-if="uloga == 'MENADZER'" class="collapse navbar-collapse" id="navbarSupportedContent">
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
			
		<div v-else class="collapse navbar-collapse" id="navbarSupportedContent" >
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
		uloga = window.localStorage.getItem("korisnik");
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
    }
	}
});