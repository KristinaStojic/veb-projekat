Vue.component("dodavanjeArtikla", {
	data: function() {
		return {
			artikal: {
				naziv: "",
				cena: "",
				tip: "",
				restoran: "",
				kolicina: "",
				opis: "",
				slika: ""
			},
			naziv: false,
			cena: false,
			slika: false,
			msg: "",
			greska: "",
			nazivRestorana: "",
			izabranFajl: "",
			logo: "slike/logo_final2.png"
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

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">

							<li class="nav-item nav-link active">
							<a class="nav-link" href="" v-on:click="menadzerRestoran">Moj restoran</a>
							</li>
							
							<li class="nav-item nav-link active">
								<a class="nav-link" href="#" v-on:click="pregledPorudzbina()">Porudžbine</a>
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
	<div class="bottom">
		<div class="slika-registracija" >
			<div class="inner">
			<div class="image-holder">
				<div class="artikli"></div>
			</div>
			<form>
				<h3>Dodavanje artikla u '{{nazivRestorana}}'</h3>
				<div class="form-wrapper">
					<input type="text" placeholder="Naziv artikla*" v-model="artikal.naziv" v-on:click="nazivPromena" 
					v-bind:class="[{ invalid: naziv && !this.artikal.ime}, { 'form-control': !naziv || this.artikal.naziv}]" >
					<i class="zmdi zmdi-cutlery"></i>
				</div>
				<div class="form-wrapper">
					<input style="display:none" ref="unos" id="fajl" type="file" v-on:change="selektovanFajl" accept="image/*">
					<button class="dugme1" v-on:click="$refs.unos.click()"> Izaberi fotografiju </button>
				</div>
				<div class="form-wrapper">
					<select name="" id="" class="form-control" style="font-size: 12px" v-model="artikal.tip">
						<option value="" disabled selected>Tip artikla</option>
						<option value="0">Jelo</option>
						<option value="1">Piće</option>
					</select>
					<i class="zmdi zmdi-caret-down" style="font-size: 17px"></i>
				</div>
				<div class="form-wrapper">
					<input type="number" placeholder="Cena*" v-model="artikal.cena"  v-on:click="cenaPromena" 
					v-bind:class="[{ invalid: cena && !this.artikal.cena}, { 'form-control': !cena || this.artikal.cena}]"></input>
					<i class="zmdi zmdi-money"></i>
				</div>
				<div class="form-wrapper">
					<input type="number" class="form-control" placeholder="Količina (u gramima ili mililitrima)" v-model="artikal.kolicina"></input>
				</div>
				<div class="form-wrapper">
					<input type="text" class="form-control" placeholder="Opis" v-model="artikal.opis"></input>
				</div>
				<div class="form-wrapper">
					<label style="color:red;">{{msg}}</label>
				</div>
				<button v-on:click="potvrdi" class="button1">Potvrdi
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
		this.nazivRestorana = window.localStorage.getItem("imeRestorana");
		console.log(this.nazivRestorana);
		this.artikal.restoran = window.localStorage.getItem("trenutniRestoran");
		console.log(this.artikal.restoran);
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
		selektovanFajl : function(event){
			event.preventDefault();
			this.izabranFajl = event.target.files[0];
			this.nazivRestorana = window.localStorage.getItem("imeRestorana");
			this.artikal.restoran = window.localStorage.getItem("trenutniRestoran");
			if(this.izabranFajl != null){
				this.greska = "Uspešno dodata fotografija!";
                var x = document.getElementById("greska");
                x.className = "snackbar show";
                setTimeout(function(){x.className = x.className.replace("show","");},1800);
			const fd = new FormData();
			fd.append('slika',this.izabranFajl, this.izabranFajl.name)
			
			console.log(this.izabranFajl);
			axios
				.post('rest/restorani/dodajSliku')
				.then(response => {
					console.log(response);
				})
			}else{
				this.greska = "Neuspešno! Pokušajte ponovo!";
                var x = document.getElementById("greska");
                x.className = "snackbar show";
                setTimeout(function(){x.className = x.className.replace("show","");},1800);
			}
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


    	}
		,odjava : function() {
		axios 
			.post('/DostavaREST/rest/korisnici/odjava')
			.then(response => {
				window.localStorage.removeItem("korisnik");
				window.localStorage.removeItem("uloga");
				this.greska = "Uspesna odjava!";
				var x = document.getElementById("greska");
				x.className = "snackbar show";
				setTimeout(function(){x.className = x.className.replace("show","");},1800);
				this.$router.go()
			})
			.catch(err => {
				this.greska = "Neuspjesna odjava!";
				var x = document.getElementById("greska");
				x.className = "snackbar show";
				setTimeout(function(){x.className = x.className.replace("show","");},1800);
				console.log(err);
			  })
		
		},
		pregledKupaca(){
    		

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
		nazivPromena: function(event) {
			event.preventDefault();
			this.naziv = true;
		},
		cenaPromena: function(event) {
			event.preventDefault();
			this.cena = true;
		},
		potvrdi: function(event) {
			event.preventDefault();
			this.msg = "";
			this.artikal.slika = "slike/artikli/" + this.izabranFajl.name;
			console.log(this.artikal.restoran);
			if (!this.artikal.naziv) {
				this.msg = "Obavezno uneti naziv!";
			} else if (!this.artikal.tip) {
				this.msg = "Obavezno izabrati tip artikla!";
			}else if (!this.artikal.cena) {
				this.msg = "Obavezno uneti cenu!";
			}else if (!this.artikal.slika) {
				this.msg = "Obavezno izabrati fotografiju artikla!";
			} else {
				axios
					.post('/DostavaREST/rest/restorani/dodajArtikal', this.artikal)
					.then(response => {
							this.greska = "Uspešno dodavanje!"
							var x = document.getElementById("greska");
							x.className = "snackbar show";
							setTimeout(function() { x.className = x.className.replace("show", ""); }, 1800);
							window.localStorage.removeItem("imeRestorana");
							window.localStorage.removeItem("trenutniRestoran");
							this.$router.push("/pregledRestorana")
					})
					.catch(err => {
						this.msg = "Već postoji artikal sa ovim imenom!";
					})
				return true;
			}

		}
	}
});