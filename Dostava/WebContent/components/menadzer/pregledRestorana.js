Vue.component("pregledRestorana", {
    data: function () {
      return {
		restoran: {
				id : "",
				naziv: "",
				tipRestorana: 7,
				logo: "",
				artikli: [],
				status: "",
				geografskaDuzina: "",
				geografskaSirina: "",
				ulica: "",
				broj: "",
				mesto: "",
				postanskiBroj: "",
				ocena: ""

		},
        greska: "",
        logo : "slike/logo_final2.png", uloga : ""
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

	</nav>


	<div class="bottom">
  		<div id="greska" class="snackbar">{{greska}}</div>
  	<div class="slika-registracija" >

  	</div>
  	</div>
	</div>
  `
    ,
    components: {
      vuejsDatepicker
    }
    ,

    mounted () {
		console.log("evo me")
        axios 
        .get('rest/korisnici/restoranMenadzera/' + window.localStorage.getItem("korisnik"))
        .then(response => {
            if(response.data != null)
            {     
                this.restoran = response.data;
            }
        })
    },
    methods: {
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