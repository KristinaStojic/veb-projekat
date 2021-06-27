Vue.component("pocetna", {
	data: function() {
		return {
			restorani: null
		}
	},
	template: ` 

	<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light navigacija top">
					<a class="navbar-brand" href="http://localhost:8080/DostavaREST/#/">K&J</a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
				
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
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
	<div class="row">
		<div style="margin: 20px;" v-for="(r, i) in restorani">
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
</div>		
    	`
	,
	mounted() {
		axios
			.get('rest/restorani/')
			.then(response => (this.restorani = response.data))
	}
	,
	methods: {

	}
});