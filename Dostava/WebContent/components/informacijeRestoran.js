Vue.component("informacijeRestoran", {
    data: function () {
      return {
		restoran: {
				id : "",
				naziv: "",
				tipRestorana: 7,
				logo: "",
				status: "",
				geografskaDuzina: "",
				geografskaSirina: "",
				ulica: "",
				broj: "",
				mesto: "",
				artikli: null,
				postanskiBroj: "",
				ocena: ""

		},
		artikli : null,
        greska: "",
        kj : "slike/logo_final2.png",
		 artikalTab : true,
		 komentarTab : false,
		 lokacijaTab : false,
		uloga: ""
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
								<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
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
									<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
                                    <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
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
									<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
                                    <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
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
								<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
								<div class="dropdown-divider"></div>
								<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/izmenaPodataka">Izmena podataka</a>
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

	
	<div class="bottomRestorani">
		<div >
  		<div class="info-restoran">
			<div class="desno">
				
				<div class="inner1">
					<form>
						<h3>{{restoran.naziv}}  <span v-if="restoran.status == false" class="dot" style="background-color: red;"></span>  
												<span v-if="restoran.status === true" class="dot" style="background-color: green;"></span>
						</h3>
                		<div>
		                    <label for="tip" >Tip</label>
		                    <label id="tip" class="form-control">{{restoran.tipRestorana}}</label>
                		</div>
                		<div>
		                    <label for="lokacija" > Adresa</label>
		                    <label id="lokacija" class="form-control">{{restoran.ulica}} {{restoran.broj}}, {{restoran.mesto}}</label>
                		</div>
                		
					</form>
					
					<form>
						<h3>   </br>    </h3>
						<div>
		                    <label for="status" >&nbsp;Status</label>
		                    <label v-if="restoran.status === true" id="status" style="color: green; width: 230px;" class="form-control">Otvoren&nbsp;</label>
		                    <label v-if="restoran.status === false" id="status" style="color: red; width: 230px;" class="form-control">Zatvoren&nbsp;</label>
                		</div>
                		<div>
		                    <label for="ocena" >&nbsp;Ocena</label>
		                    <label v-if="restoran.ocena === '0.0'" id="ocena" style="width: 230px;" class="form-control">Nema ocena za restoran&nbsp;    </label>
		                    <label v-if="restoran.ocena !== '0.0'" id="ocena" style="width: 230px;" class="form-control">{{restoran.ocena}}&nbsp;      </label>
                		</div>
					</form>
					
				</div>
			
			</div
			<div class="levo">
			<img :src="restoran.logo" class="slikaRestoran">
			<div/>
			
		</div>
		<div >
			<nav>
					<ul class="nav nav-tabs">
						<li><a href="#"  class="tab dugmeTab nav-link"  @click="promeniTabArtikal" :class="{'active': artikalTab === true}" >
						<span class="tab-copy">Artikli</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
						<li><a href="#"  class="tab dugmeTab nav-link"  @click="promeniTabKomentar" :class="{'active': komentarTab === true}" >
						<span class="tab-copy">Komentari</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
						<li><a href="#"  class="tab dugmeTab nav-link"  @click="promeniTabLokacija" :class="{'active': lokacijaTab === true}" >
						<span class="tab-copy">Lokacija</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
					</ul>
			</nav>
						<div class="scroll" v-if="this.artikalTab === true">
						<div class="row">
						<div style="margin: 20px;" v-for="(a, i) in this.artikli">
							<div class="kartica" >
								<img :src="a.slika" class="slikaKartice" alt="Nedostaje fotografija">
								<ul class="list-group list-group-flush">
								<li v-if="a.tipArtikla === 'Jelo' && a.kolicina != '0.0'" class="list-group-item"><b>{{a.naziv}} ({{a.kolicina}}g)</b></li>
								<li v-if="a.tipArtikla !== 'Jelo' && a.kolicina != '0.0'" class="list-group-item"><b>{{a.naziv}} ({{a.kolicina}}ml)</b></li>
								<li v-else class="list-group-item"><b>{{a.naziv}}</b></li>
								<li class="list-group-item">Cena: {{a.cena}} dinara</li>
								<li v-if="a.opis !== ''" class="list-group-item">{{a.opis}}</li>
								<li v-if="a.opis === ''" class="list-group-item">Nema opisa za artikal</li>
								</ul>
							</div>
						</div>
						</div>

						<div class="content" v-if="this.komentarTab === true">
						 <p>komentar</p>
						</div>
						<div class="content" v-if="this.lokacijaTab === true">
						 <p>lokacija</p>
						</div>
						<div id="greska" class="snackbar">{{greska}}</div>
		</div>
	</div>	
</div>
</div>
</div>
  `
    ,
    mounted () {
		this.uloga = window.localStorage.getItem("uloga");
		this.restoran.id = this.$route.path.slice(21,this.$route.path.length);
        axios 
        .get('rest/restorani/' + this.restoran.id)
        .then(response => {
            if(response.data != null)
            {     
                this.restoran = response.data;
                this.artikli = response.data.artikli;
            }
        })
        .catch(err => {
					this.greska = "Restoran je obrisan!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					console.log(err);
				  })
        
    },
    methods: {
		promeniTabKomentar() {
			this.komentarTab = true;
			this.artikalTab = false; 
			this.lokacijaTab = false;
		  },
		  promeniTabArtikal() {
			this.komentarTab = false;
			this.artikalTab = true; 
			this.lokacijaTab = false;
		  },
		  promeniTabLokacija() {
			this.komentarTab = false;
			this.artikalTab = false; 
			this.lokacijaTab = true;
		  },
        odjava : function() {
    		axios 
    			.post('/DostavaREST/rest/korisnici/odjava')
    			.then(response => {
    				window.localStorage.removeItem("trenutniRestoran");
					window.localStorage.removeItem("imeRestorana");
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