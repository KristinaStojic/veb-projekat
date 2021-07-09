Vue.component("pregledRestorana", {
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
		trenutniKomentar: {
			id: "",
			kupac: "",
			tekst: "",
			ocena: "",
			obradjen: false,
		},
		uloga: "",
        greska: "",
		komentari : {
			id: "",
			kupac: "",
			tekst: "",
			ocena: "",
			obradjen: false,
		},
		sviKomentari : {
			id: "",
			kupac: "",
			tekst: "",
			ocena: "",
			odobren: "",
			restoran: ""
		},
        kj : "slike/logo_final2.png",
		 artikalTab : true,
		 komentarTab : false,
		 lokacijaTab : false,
		 zahteviKomTab : false
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
								<a class="nav-link" href="#" v-on:click="pregledPorudzbina()">Moje porudžbine</a>
							</li>
							
							<li class="nav-item nav-link active">
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
						<li><a href="#"  class="tab dugmeTab nav-link"  v-on:click="promeniTabArtikal" :class="{'active': artikalTab === true}" >
						<span class="tab-copy">Artikli</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
						<li><a href="#"  class="tab dugmeTab nav-link"  v-on:click="promeniTabKomentar" :class="{'active': komentarTab === true}" >
						<span class="tab-copy">Komentari</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
						<li><a href="#"  class="tab dugmeTab nav-link" v-on:click="promeniTabLokacija" :class="{'active': lokacijaTab === true}" >
						<span class="tab-copy">Lokacija</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
						<li><a href="#"  class="tab dugmeTab nav-link" v-on:click="promeniZahtevKom" :class="{'active': zahteviKomTab === true}" >
						<span class="tab-copy">Zahtevi za komentare</span>
						<span class="tab-background">
						<span class="tab-rounding left"></span>
						<span class="tab-rounding right"></span>
						</span> </a></li>
					</ul>
			</nav>
						<div class="scroll" v-if="this.artikalTab === true">
						<button class="dugme2" @click="$router.push('/dodavanjeArtikla')">Dodaj novi artikal</button></br></br></br></br>
						<div class="row">
						<div style="margin: 20px;" v-for="(a, i) in this.artikli">
							<div class="kartica" >
								<img :src="a.slika" class="slikaKartice" alt="Nedostaje fotografija">
								<ul class="list-group list-group-flush">
								<li v-if="a.tipArtikla === 'Jelo' && a.kolicina != '0.0'" class="list-group-item"><b>{{a.naziv}} ({{a.kolicina}}g)</b>
								<button v-if="uloga==='MENADZER'" class="btn btn-info btn-sm" style="float: right;" @click="obrisiArtikal(a.naziv)">Obriši</button>

								</li>
								<li v-if="a.tipArtikla !== 'Jelo' && a.kolicina != '0.0'" class="list-group-item"><b>{{a.naziv}} ({{a.kolicina}}ml)</b>
								<button v-if="uloga==='MENADZER'" class="btn btn-info btn-sm" style="float: right;" @click="obrisiArtikal(a.naziv)">Obriši</button>

								</li>
								<li v-if="a.kolicina === '0.0'" class="list-group-item"><b>{{a.naziv}}</b>
								<button v-if="uloga==='MENADZER'" class="btn btn-info btn-sm" style="float: right;" @click="obrisiArtikal(a.naziv)">Obriši</button>
								</li>
								<li class="list-group-item">Cena: {{a.cena}} dinara</li>
								<li v-if="a.opis !== ''" class="list-group-item">{{a.opis}}</li>
								<li v-if="a.opis === ''" class="list-group-item">Nema opisa za artikal</li>
								<li class="list-group-item">
										<button class="dugme3"  @click="izmena(a.naziv)">Izmeni artikal</button>
									</li>
								</ul>
							</div>
						</div>
						</div>
						</div>


						<div class="scroll" v-if="this.zahteviKomTab === true">
								<div class="row" v-for="k in this.komentari">
								<div style="margin: 20px;">
									<div class="card">
										<ul class="list-group list-group-flush">
										<li class="list-group-item">
										<b>Kupac: {{k.kupac}} </b>    			
										</li>
										
										<li class="ime list-group-item">Ocena: {{k.ocena}}</li>
										<li class="list-group-item">Komentar: {{k.tekst}}</li>
										<li>
										&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
										<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#modelOdobri" @click="postaviKom(k)">Odobri</button>
										&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
										<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#modelOdbij" @click="postaviKom(k)" >Odbij</button>
										</li>
										</ul>
									</div>
								</div>
								</div>
						</div>


						<div class="scroll" v-if="this.komentarTab === true">
						 	
							<div class="row" v-for="k in this.sviKomentari">
							<div v-if="k.restoran === restoran.id" style="margin: 20px;">
								<div class="card">
									<ul class="list-group list-group-flush">
									<li class="list-group-item">
									<b>Kupac: {{k.kupac}} </b>    			
									</li>
									
									<li class="ime list-group-item">Ocena: {{k.ocena}}</li>
									<li class="list-group-item">Komentar: {{k.tekst}}</li>
									<li class="list-group-item">Status: {{k.odobren}}</li>
									
									</ul>
								</div>
							</div>
							</div>

						</div>	


						
               
            </div>
						<div  v-if="this.lokacijaTab === true">
					<div style="width:500px;height:200px; align:center;vertical-align:center;margin-top:200px;float:left; margin-left:270px;margin-right:0px;font-size:20px">
						<label><b>{{this.restoran.ulica}} {{this.restoran.broj}}</b></label> </br>       
						<label>{{this.restoran.mesto}} {{this.restoran.postanskiBroj}}</label> </br>
						<label style="color:gray">{{this.restoran.geografskaDuzina}} , {{this.restoran.geografskaSirina}}</label></br>
				     </div>
					<div style="border-style:solid;width:400px;height:400px; align:center;vertical-align:center;margin:50px;float:right; margin-right:300px;margin-left:0px">
				        <map-view-container
				                :coordinates="[this.restoran.geografskaDuzina, this.restoran.geografskaSirina]">
						</map-view-container>
				     </div>
				</div>
						<div id="greska" class="snackbar">{{greska}}</div>
		</div>

		
		</div>
		
						<div class="modal" id="modelOdobri">
                    		<div class="modal-dialog modal-dialog-centered" style="max-width: 50%;">
                        		<div class="modal-content">
									<!-- Modal body -->
									<div class="modal-body" style="text-align: center">
										<h5 class="modal-title">Da li ste sigurni da želite da odobrite izabrani komentar</h5>
									</div>

									<!-- Modal footer -->
									<div class="modal-footer">
										<button type="button" class="btn btn-primary" data-dismiss="modal">Odustani</button>
										<button type="button" class="btn btn-primary" data-dismiss="modal" @click="odobriKomentar(trenutniKomentar.id)">Potvrdi</button>
									</div>

                        		</div>
                    		</div>
                		</div>


						<div class="modal" id="modelOdbij">
							<div class="modal-dialog modal-dialog-centered" style="max-width: 50%;">
								<div class="modal-content">
									<!-- Modal body -->
									<div class="modal-body" style="text-align: center">
										<h5 class="modal-title">Da li ste sigurni da želite da odbijete izabrani komentar</h5>
									</div>

									<!-- Modal footer -->
									<div class="modal-footer">
										<button type="button" class="btn btn-primary" data-dismiss="modal">Odustani</button>
										<button type="button" class="btn btn-primary" data-dismiss="modal" @click="odbijKomentar(trenutniKomentar.id)" >Potvrdi</button>
									</div>

								</div>
							</div>
						</div>
						

	</div>


	
</div>
  `
    ,
	
    mounted () {
		this.uloga = window.localStorage.getItem("uloga")
        axios 
        .get('rest/korisnici/restoranMenadzera/' + window.localStorage.getItem("korisnik"))
        .then(response => {
            if(response.data != null)
            {     
                this.restoran = response.data;
                this.artikli = response.data.artikli;
				console.log(this.restoran.id)
                window.localStorage.setItem("trenutniRestoran", this.restoran.id);
				window.localStorage.setItem("imeRestorana", this.restoran.naziv);
            }
        })
        
		axios 
        .get('rest/komentari/nadjiKomentare/' + window.localStorage.getItem("korisnik"))
        .then(response => {
            if(response.data != null)
            {     
                this.komentari = response.data;              
            }
        })


		axios 
		.get('rest/komentari/nadjiSveKomentare')
		.then(response => {
			if(response.data != null)
			{     
				this.sviKomentari = response.data; 
				console.log(this.idRest)  
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
    	izmena(value){
    		this.$router.push("/izmenaArtikla/"+ this.restoran.id + "/" + value)
    	},pregledKupaca(){
    		

			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiKupce/' + window.localStorage.getItem("korisnik"))
    			.then(response => {
					console.log(response.data.length)
                    if(response.data.length == 0){
                        this.greska = "Ne postoji nijedan kupac u Vašem restoranu!";
					    var x = document.getElementById("greska");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800);
                        //this.$router.push("/")
                    }
                    else{
                        this.$router.push("/pregledKupaca/"+ window.localStorage.getItem("korisnik"))
                    }
                   
					
    			})
				.catch(err => {
					this.greska = "Neuspesno!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })


    	},
		pregledPorudzbina(){
    		

			axios 
    			.get('/DostavaREST/rest/korisnici/nadjiPorudzbine/' + window.localStorage.getItem("korisnik") + "/" + window.localStorage.getItem("uloga"))
    			.then(response => {
					console.log(response.data.length)
                    if(response.data.length == 0){
                        this.greska = "Nemate nijednu porudžbinu!";
					    var x = document.getElementById("greska");
					    x.className = "snackbar show";
					    setTimeout(function(){x.className = x.className.replace("show","");},1800);
                        //this.$router.push("/")
                    }
                    else{
                        this.$router.push("/pregledPorudzbina/"+ window.localStorage.getItem("korisnik"))
                    }
                   
					
    			})
				.catch(err => {
					this.greska = "Neuspesno!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					this.$router.push("/")
				  })


    	},
		promeniTabKomentar : function(event) {
			event.preventDefault();
			this.komentarTab = true;
			this.artikalTab = false; 
			this.lokacijaTab = false;
			this.zahteviKomTab = false;

		  },
		  promeniTabArtikal : function(event) {
			event.preventDefault();
			this.komentarTab = false;
			this.artikalTab = true; 
			this.lokacijaTab = false;
			this.zahteviKomTab = false;

		  },
		  promeniTabLokacija : function(event) {
			event.preventDefault();
			this.komentarTab = false;
			this.artikalTab = false; 
			this.lokacijaTab = true;
			this.zahteviKomTab = false;

		  },
		  promeniZahtevKom : function(event){
			event.preventDefault();
			this.komentarTab = false;
			this.artikalTab = false; 
			this.lokacijaTab = false;
			this.zahteviKomTab = true;
		  },
		dodajArtikal : function(event){
			event.preventDefault();
			window.localStorage.setItem("trenutniRestoran", this.restoran.id);
			window.localStorage.setItem("imeRestorana", this.restoran.naziv);
			this.$router.push("/dodavanjeArtikla")
		
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
    		
    	},
		odobriKomentar(idKom){
			console.log(idKom + " " + window.localStorage.getItem("trenutniRestoran"));
			axios 
    			.post('/DostavaREST/rest/komentari/odobriKomentar/' + idKom + "/" + this.restoran.id)
    			.then(response => {  
					this.$router.go();
					this.greska = "Uspesno odobren komentar!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
    				
    			})
				.catch(err => {
					this.greska = "Neuspjesno odobravanje komentara!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					console.log(err);
				  })
		},
		odbijKomentar(idKom){
			console.log(idKom);
			axios 
    			.post('/DostavaREST/rest/komentari/odbijKomentar/' + idKom)
    			.then(response => {  
					this.$router.go();
					this.greska = "Uspesno odbijen komentar!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
    				
    			})
				.catch(err => {
					this.greska = "Neuspjesno odbijanje komentara!";
					var x = document.getElementById("greska");
					x.className = "snackbar show";
					setTimeout(function(){x.className = x.className.replace("show","");},1800);
					console.log(err);
				  })
		},

		postaviKom(kom){
			this.trenutniKomentar = kom;
			console.log(this.trenutniKomentar.id)
		},
		obrisiArtikal : function(nazivArtikla){
				  axios 
				 .delete('rest/restorani/obrisiArtikal/' + nazivArtikla + "/" + this.restoran.id)
				 .then(response => {
					this.$router.go();
	  
						 this.greska = "Uspesno ste obrisali artikal!";
						 var x = document.getElementById("greska");
						 x.className = "snackbar show";
						 setTimeout(function(){x.className = x.className.replace("show","");},1800);
				 
				 })
			  }

			
        
    
    }
  });