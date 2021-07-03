Vue.component("pocetna", {
	data: function() {
		return {
			restorani: [],
			image : "",
			logo : "slike/logo_final2.png",
			uloga : "",
			prazno : true,
			search: [],
			searchTip: "",
			searchLok: "",
			searchOcena: "",
			greska: "",
			sort: '',
			filterTip : "",
			checked: "",
			otvoreni : "",
			trazi : "",
			putanja : "",
			kupac : null
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
									<a class="dropdown-item" v-on:click="pregledPorudzbina()">Moje porudžbine</a>
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
									<a class="dropdown-item" v-on:click="pregledPorudzbina()">Moje porudžbine</a>
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
								<a class="dropdown-item" v-on:click="pregledPorudzbina()">Moje porudžbine</a>
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

	<div class="bottom">
		<div class="container-fluid content-row">
			<div>
				<label style="font-size:15px">Pretraga: </label>
				<input type="text" v-model="search" style="height:36px; width:180px" placeholder="Naziv restorana"/>
			

			
				<input type="text" v-model="searchTip" style="height:36px; width:180px" placeholder="Tip restorana"/>
			

			
				<input type="text" v-model="searchLok" style="height:36px; width:180px" placeholder="Lokacija restorana"/>
			


			
				<input type="text" v-model="searchOcena" style="height:36px; width:180px" placeholder="Ocena restorana"/>
			
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

			<label style="font-size:15px;">Sortiranje: </label>
                   <div class="btn-group">
                  <button class="btn btn-secondary dropdown-toggle dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                      Kriterijum
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('naziv', 'asc')">Naziv-uzlazno</button>
                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('naziv', 'desc')">Naziv-silazno</button>
                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('lokacija', 'asc')">Lokacija-uzlazno</button>
                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('lokacija', 'desc')">Prezime-silazno</button>
                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('ocena', 'asc')">Prosečna ocena-uzlazno</button>
                    <button class="btn-info btn-sm dropdown-item" @click="sortTable('ocena', 'desc')">Prosečna ocena-silazno</button>
                  </div>
                  </div>

				  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                  
                  

                  
				  <label style="font-size:15px">Filtriranje: </label>
                  <div class="btn-group">
                  <button class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Tip restorana
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('')">Svi</button>
                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Brza hrana')">Brza hrana</button>
                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Raznolika kuhinja')">Raznolika kuhinja</button>
                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Italijanska hrana')">Italijanska hrana</button>
					<button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Kineska hrana')">Kineska hrana</button>
					<button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Jela sa roštilja')">Jela sa roštilja</button>
                    <button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Srpska hrana')">Srpska hrana</button>
					<button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Grčka hrana')">Grčka hrana</button>
					<button class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Vegetarijanska hrana')">Vegetarijanska hrana</button>

                  </div>
                  </div>

				  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

				  <label style="font-size:15px">Otvoreni: </label>
                  <input type="checkbox" id="checkbox" value="Otvoreno" v-model="checked" >


            </div>
			</div>
			<div class="row" style="margin-left: 10px;">
				<div style="margin: 20px; " v-for="(r, i) in pronadjeni">
					<div class="card" >
						<img :src="r.logo" class="card-img-top" sty alt="Nedostaje fotografija">
						<ul class="list-group list-group-flush">

						<li class = "list-group-item">
						<b>{{r.naziv}}</b>
						<button v-if="uloga==='ADMINISTRATOR'" class="btn btn-info btn-sm" style="float: right;" @click="obrisiRestoran(r.id)">Obriši restoran</button>
						</li>

						<li class="list-group-item">{{r.tipRestorana}}</li>
						<li v-if="r.status === 'Otvoreno'" style="color:green;" class="list-group-item">{{r.status}}</li>
						<li v-if="r.status === 'Zatvoreno'" style="color:red;" class="list-group-item">{{r.status}}</li>
						<li class="list-group-item">{{r.lokacija}}</li>
						<li v-if="r.ocena !== '0.0'" class="list-group-item">Prosečna ocena: {{r.ocena}}</li>
						<li v-else class="list-group-item">Restoran nema nijednu ocenu</li>


						&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
						
						<li v-if="uloga === 'KUPAC' && r.status === 'Otvoreno'" class="list-group-item">
						<button class="dugme3" style="margin-left: 45px;" @click="informacije(r.id)">Informacije i naručivanje</button>
						</li>
						<li v-else class="list-group-item">
						<button class="dugme3" style="margin-left: 45px;" @click="informacije(r.id)">Više informacija</button>
						</li>

						
						</ul>
					</div>
				</div>
				
			<div id="greska" class="snackbar">{{greska}}</div>
			</div>
		</div>
	</div>
</div>		
    	`
	,
	mounted() {
		
		this.uloga = window.localStorage.getItem("uloga")
		this.kupac = window.localStorage.getItem("korisnik");
		axios
			.get('rest/restorani/')
			.then(response => (this.restorani = response.data))
	}
    ,
computed: {
		pronadjeni() {
            let filter1 = new RegExp(this.search, 'i');
			let filter2 = new RegExp(this.searchLok, 'i');
			let filter3 = new RegExp(this.searchTip, 'i');
			let filter4 = new RegExp(this.filterTip, 'i');
			let filter5 = new RegExp(this.searchOcena, 'i');
			if(this.checked){
				this.otvoreni = "Otvoreno";
			}else{
				this.otvoreni = "";
			}
			let filter6 = new RegExp(this.otvoreni, 'i');

            return ( this.restorani.filter(el => el.naziv.match(filter1) 
			&& el.lokacija.match(filter2)
			&& el.tipRestorana.match(filter3)
			&& el.tipRestorana.match(filter4)
			&& el.ocena.match(filter5)
			&& el.status.match(filter6)
			));
          }
        },


	methods: {
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
                        this.$router.push("/pregledPorudzbina/"+ this.kupac)
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
		

		informacije(value){
			this.$router.push("/informacijeRestoran/" + value)
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

		obrisiRestoran : function(value){
            axios 
           .delete('rest/restorani/obrisiRestoran/' + value)
           .then(response => {
                  console.log("cao")
                   this.greska = "Uspesno ste obrisali restoran!";
                   var x = document.getElementById("greska");
                   x.className = "snackbar show";
                   setTimeout(function(){x.className = x.className.replace("show","");},1800);
				   this.$router.go();

           })
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

	sortTable(key, direction){
        this.sort = `${key} > ${direction}`
        if (direction === 'asc') {
          this.restorani.sort((a, b) => a[key] > b[key] ? 1: -1)
        } else {
          this.restorani.sort((a, b) => a[key] < b[key] ? 1: -1)
        }
      },

	  postaviFilterTip(value){
		this.filterTip = value;
	 }

	}
});