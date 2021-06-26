Vue.component("pocetnaStranaMenadzer", { 
	data: function () {
	    return {
            
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
					<li class="nav-item dropdown">
						<div class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
							<i class="zmdi zmdi-account zmdi-hc-2x"></i>
						</div>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<a class="dropdown-item" href="http://localhost:8080/DostavaREST/#/licniPodaci">Moji podaci</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item" href="#">Odjava</a>
						</div>
					</li>

					
				</ul>
			</div>
	  	</nav>
    	`
    	, 
		
	methods : {

		
    }
});