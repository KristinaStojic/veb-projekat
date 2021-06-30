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
			otvoreni : "Otvoreno"
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
                  <dugme class="btn btn-secondary dropdown-toggle dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                      Kriterijum
                  </dugme>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('naziv', 'asc')">Naziv-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('naziv', 'desc')">Naziv-silazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('lokacija', 'asc')">Lokacija-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('lokacija', 'desc')">Prezime-silazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('ocena', 'asc')">Prosečna ocena-uzlazno</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="sortTable('ocena', 'desc')">Prosečna ocena-silazno</dugme>
                  </div>
                  </div>

				  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                  
                  

                  
				  <label style="font-size:15px">Filtriranje: </label>
                  <div class="btn-group">
                  <dugme class="btn btn-secondary dropdown-toggle dropdown"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Tip restorana
                  </dugme>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('')">Svi</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Brza hrana')">Brza hrana</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Raznolika kuhinja')">Raznolika kuhinja</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Italijanska hrana')">Italijanska hrana</dugme>
					<dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Kineska hrana')">Kineska hrana</dugme>
					<dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Jela sa roštilja')">Jela sa roštilja</dugme>
                    <dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Srpska hrana')">Srpska hrana</dugme>
					<dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Grčka hrana')">Grčka hrana</dugme>
					<dugme class="btn-info btn-sm dropdown-item" @click="postaviFilterTip('Vegetarijanska hrana')">Vegetarijanska hrana</dugme>

                  </div>
                  </div>

				  &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp

				  <label style="font-size:15px">Otvoreni: </label>
                  <input type="checkbox" id="checkbox" value="Otvoreno" v-model="checked" >


            </div>
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
				
			<div id="greska" class="snackbar">{{greska}}</div>
			</div>
		</div>
	</div>
</div>		
    	`
	,
	mounted() {
		
		this.uloga = window.localStorage.getItem("uloga")
		console.log(this.uloga)

		axios
			.get('rest/restorani/')
			.then(response => (this.restorani = response.data))
	}
    ,

	computed: {
        pronadjeni : function() {
			
		  if(this.search.length > 0)
			return this.restorani.filter((r) => {	
				return (r.naziv.toLowerCase().includes(this.search.toLowerCase()));
          })
          else if(this.searchTip.length > 0){
			console.log(this.checked)
            return this.restorani.filter((r) => {
              
              return (r.tipRestorana.toLowerCase().includes(this.searchTip.toLowerCase()));
              
            })
          }
		  else if(this.searchLok.length > 0){
            return this.restorani.filter((r) => {
              
              return (r.lokacija.toLowerCase().includes(this.searchLok.toLowerCase()));
              
            })
          } else if(this.filterTip.length > 0){
            return this.restorani.filter((r) => {
			 
              return (r.tipRestorana.toLowerCase().includes(this.filterTip.toLowerCase()));
              
            })
          }else if(this.checked){
            return this.restorani.filter((r) => {
			 
              return (r.status.toLowerCase().includes(this.otvoreni.toLowerCase()));
              
            })
          }
          else{
            return this.restorani.filter((r) => {
              return (r.ocena.toLowerCase().includes(this.searchOcena.toLowerCase()));
            })
          }


		
          

          
        }},

	methods: {
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