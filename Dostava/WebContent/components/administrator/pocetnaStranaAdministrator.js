Vue.component("pocetnaStranaAdministrator", { 
	data: function () {
	    return {
            greska: "",
			restorani: null
	    }
	},
	    template: ` 

	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light navigacija">
			<a class="navbar-brand" href="#">K&J</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
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

			<div id="greska" class="snackbar">{{greska}}</div>
	  	</nav>


		  <div class="container-fluid content-row">
			<div class="row">
				<div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px" v-for="(r, i) in restorani">
					<div class="card" >
					<img :src="r.logo" class="card-img-top" alt="Card image cap">
					<ul class="list-group list-group-flush">
						<li class="list-group-item"><b>{{r.naziv}}</b></li>
						<li class="list-group-item">{{r.tipRestorana}}</li>
						<li v-if="r.status === 'Otvoreno'" style="color:green;" class="list-group-item">{{r.status}}</li>
						<li v-if="r.status === 'Zatvoreno'" style="color:red;" class="list-group-item">{{r.status}}</li>
						<li class="list-group-item">{{r.lokacija}}</li>
					</ul>
					</div>
				</div>
    	 	</div>
  		</div>
	</div>

    	`
    	, 
		mounted() {
			axios
				.get('rest/restorani/')
				.then(response => (this.restorani = response.data))
		},

	methods : {

		odjava : function() {
    		axios 
    			.post('/DostavaREST/rest/korisnici/odjava')
    			.then(response => {
					window.localStorage.removeItem("korisnik");
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