Vue.component("navigacija", {
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
				<a class="navbar-brand" href="#" v-on:click="pocetna">
					<img :src="kj" alt="" width="100" height="80">
				</a>
							
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				 <div v-if="uloga === null" class="collapse navbar-collapse" id="navbarSupportedContent" >
						<ul class="navbar-nav ml-auto">
							<li class="nav-item nav-link active">
										<a class="nav-link" href="#" v-on:click="prijava">Prijava</a>
							</li>
							<li class="nav-item nav-link active">
										<a class="nav-link" href="#" v-on:click="registracija">Registracija</a>
							</li>
						</ul>
				</div>
				
				 <div v-else  class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li v-if="uloga === 'ADMINISTRATOR'" class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="dodavanjeRestorana">Dodavanje restorana</a>
							</li>

							<li v-if="uloga === 'ADMINISTRATOR'" class="nav-item nav-link active"> 
								<a class="nav-link" href="#" v-on:click="dodavanjeMenadzera">Dodaj menadžera</a>
							</li>

							<li v-if="uloga === 'ADMINISTRATOR'" class="nav-item nav-link active"> 
								<a class="nav-link" href="#" v-on:click="dodavanjeDostavljaca">Dodaj dostavljača</a>
							</li>

							<li v-if="uloga === 'ADMINISTRATOR'" class="nav-item nav-link active">  
								<a class="nav-link" href="#" v-on:click="sviKorisnici">Prikaži sve korisnike</a>
							</li>

							<li v-if="uloga === 'ADMINISTRATOR'" class="nav-item nav-link active">  
								<a class="nav-link" href="#" v-on:click="sumnjiviKorisnici">Prikaži sve sumnjive korisnike</a>
							</li>

							<li v-if="uloga === 'DOSTAVLJAC'" class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="pregledPorudzbina()">Porudžbine</a> 
							</li>
							
							<li v-if="uloga === 'KUPAC'" class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="pregledPorudzbina()">Moje porudžbine</a>
							</li>
							
							<li v-if="uloga === 'MENADZER'" class="nav-item nav-link active">
							<a class="nav-link" href="" v-on:click="menadzerRestoran">Moj restoran</a>
							</li>
							
							<li v-if="uloga === 'MENADZER'" class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="pregledPorudzbina()">Porudžbine</a>
							</li>
							
							<li v-if="uloga === 'MENADZER'" class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="pregledKupaca()">Svi kupci</a>
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
  
		 <div id="greska11" class="snackbar">{{greska1}}</div>
		</nav>
    `,

	data: function(){
		return {
			uloga: '', 
			kj : "slike/logo_final2.png" ,
			greska1: ""
		}
	},
	methods: { 
		pocetna : function(event){
			event.preventDefault();
			this.$router.push("/");
		},
		 izmenaPodataka(){
			this.$router.push("/izmenaPodataka/"+ window.localStorage.getItem("korisnik"));
		  },
		mojiPodaci(){
			this.$router.push("/licniPodaci/"+ window.localStorage.getItem("korisnik"));
			console.log("moji podaci")
		},
		prijava : function(event){
			event.preventDefault();
			this.$router.push("/prijava");
		},
		registracija : function(event){
			event.preventDefault();
			this.$router.push("/registracija");
		},
		dodavanjeRestorana : function(event){
			event.preventDefault();
			this.$router.push("/dodavanjeRestorana");
		},
		dodavanjeMenadzera : function(event){
			event.preventDefault();
			this.$router.push("/dodavanjeMenadzera");
		},
		dodavanjeDostavljaca : function(event){
			event.preventDefault();
			this.$router.push("/dodavanjeDostavljaca");
		},
		sviKorisnici : function(event){
			event.preventDefault();
			this.$router.push("/sviKorisnici");
		},
		sumnjiviKorisnici : function(event){
			event.preventDefault();
			this.$router.push("/sumnjiviKorisnici");
		},
		menadzerRestoran: function(event) {
			event.preventDefault();
			axios
				.get('rest/korisnici/restoranMenadzera/' + window.localStorage.getItem("korisnik"))
				.then(response => {
					if (response.data.length == 0) {
						this.greska1 = "Trenutno Vam nije dodeljen nijedan restoran!";
						var x = document.getElementById("greska1");
						x.className = "snackbar show";
						setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
					} else {
						this.$router.push("/pregledRestorana")
					}
				})
		},
		odjava: function() {
			axios
				.post('/DostavaREST/rest/korisnici/odjava')
				.then(response => {
					window.localStorage.removeItem("trenutniRestoran");
					window.localStorage.removeItem("imeRestorana");
					window.localStorage.removeItem("korisnik");
					window.localStorage.removeItem("uloga");
					this.greska1 = "Uspesna odjava!";
					var x = document.getElementById("greska1");
					x.className = "snackbar show";
					setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
					this.uloga=null;
					this.$router.push("/")
				})
				.catch(err => {
					this.greska1 = "Neuspjesna odjava!";
					var x = document.getElementById("greska1");
					x.className = "snackbar show";
					setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
					console.log(err);
				})

		},
		pregledPorudzbina(){
    		

			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiPorudzbine/' + window.localStorage.getItem("korisnik") + "/" + window.localStorage.getItem("uloga"))
    			.then(response => {
					console.log(response.data.length)
                    if(response.data.length == 0){
                        this.greska1 = "Nemate nijednu porudžbinu!";
					    var x = document.getElementById("greska1");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800); 
                    }
                    else{
                        this.$router.push("/pregledPorudzbina/"+ window.localStorage.getItem("korisnik"))
                    }
                   
					
    			})
				.catch(err => {
					this.greska1 = "Neuspesno!";
					var x = document.getElementById("greska1");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })


    	},
		pregledKupaca(){
    		

			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiKupce/' + window.localStorage.getItem("korisnik"))
    			.then(response => {
					console.log(response.data.length)
                    if(response.data.length == 0){
                        this.greska1 = "Ne postoji nijedan kupac u Vašem restoranu!";
					    var x = document.getElementById("greska1");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800);
                        //this.$router.push("/")
                    }
                    else{
                        this.$router.push("/pregledKupaca/"+ window.localStorage.getItem("korisnik"))
                    }
                   
					
    			})
				.catch(err => {
					this.greska1 = "Neuspesno!";
					var x = document.getElementById("greska1");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })


    	}
	},
    mounted: function(){
		this.uloga = window.localStorage.getItem("uloga");
	}
});

