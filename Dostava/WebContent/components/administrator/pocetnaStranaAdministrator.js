Vue.component("pocetnaStranaAdministrator", { 
	data: function () {
	    return {
            greska: ""
	    }
	},
	    template: ` 

		<nav class="navbar navbar-expand-lg navbar-light bg-light navigacija">
			<a class="navbar-brand" href="#">K&J</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item nav-link active">
						<a class="nav-link" href="#">Dodaj restoran</a>
			  		</li>

					<li class="nav-item nav-link active">
						<a class="nav-link" href="http://localhost:8080/DostavaREST/#/dodavanjeMenadzera">Dodaj menadzera</a>
			  		</li>

					<li class="nav-item dropdown">
						<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
							<i class="zmdi zmdi-account zmdi-hc-2x"></i>
						</div>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
							<div class="dropdown-divider"></div>
							<label class="dropdown-item" v-on:click="odjava">Odjavi se</label>
						</div>
					</li>

					
				</ul>
			</div>

			<div id="greska" class="snackbar">{{greska}}</div>
	  	</nav>
    	`
    	, 
		
	methods : {

		odjava : function() {
    		axios 
    			.post('/DostavaREST/rest/korisnici/odjava')
    			.then(response => {
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